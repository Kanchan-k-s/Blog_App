
<template>
    <div>
        <nav-bar></nav-bar>
        <div class='parent'>
            <div class='child base-image-input' id="change" :style="{ 'background-image': `url(${imageData})` }">
                <h5>Blog PREVIEW</h5>
                <div>
                    <h3>Title-{{ blog.title }}</h3>
                    <p>
                        {{ blog.desp }}
                    </p>
                </div>
            </div>
            <div class='child text-start ' style="height:250px; background-color: #6e4dab;">

                <h4 class="card-title text-center">Add Post</h4>

                <input ref="fileInput" type="file" @change="onFileChange" @input="onSelectFile">
                <input v-model="blog.title" type="text" placeholder="Blog Title" /><br>
                <input v-model="blog.desp" type="text" placeholder="Blog Body" /><br>

                <div>
                    <button class="btn btn-warning" @click="onUploadFile" :disabled="!this.selectedFile"
                        style="padding:5px 30px 5px 30px;margin-left:35%;margin-top: 5%;">Add</button>
                </div>
            </div>
        </div>


    </div>
</template>

<script>

import navbar from './navbar.vue'
export default {
    components: {
        'nav-bar': navbar
    },
    data() {
        return {
            blog: {},
            selectedFile: null,
            selectedFile: "",
            imageData: null
        }
    },
    methods: {
        onFileChange(e) {
            const selectedFile = e.target.files[0]; // accessing file
            this.selectedFile = selectedFile;
        },
        onSelectFile() {
            const input = this.$refs.fileInput
            const files = input.files
            if (files && files[0]) {
                const reader = new FileReader
                reader.onload = e => {
                    this.imageData = e.target.result
                }
                reader.readAsDataURL(files[0])

            }
        },
        chooseImage() {
            this.$refs.fileInput.click()
        },
        onUploadFile() {
            const formData = new FormData();
            this.blog['user_id'] = this.$route.params.id
            formData.append("file", this.selectedFile);
            // appending file
            // sending file to the backend
            this.$http.post("http://localhost:3000/blog/", this.blog).then(function (data) {

                this.$http.post("http://localhost:3000/blog/upload/" + data.body.blog_id, formData)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                this.blog = {}
                this.$router.push('/home/' + this.$route.params.id)
            }
            )
        },

    },
    beforeCreate() {
        if (!this.$session.exists() || this.$session.get('userid') !== this.$route.params.id) {
            this.$router.push('/')
        }
    }
}
</script>


<style scoped>
.base-image-input {
    display: block;
    width: 200px;
    height: 200px;
    cursor: pointer;
    background-color: pink;
    color: white;
    background-size: cover;
    background-position: center center;
}

input {
    padding: 10px;
    width: 80%;
    margin-left: 7%;
    margin-top: 2%;
    border-radius: 20px;
    border-width: 0;
}

.parent {
    margin-top: 2%;
    text-align: center;
    color: black;
}

.child {
    /* background-color: #6e4dab; */
    border-radius: 120px 0 120px 0;
    display: inline-block;

    padding: 1rem 1rem;
    width: 550px;
    height: 640px;
    margin-left: 50px;
    vertical-align: middle;
}
</style>
