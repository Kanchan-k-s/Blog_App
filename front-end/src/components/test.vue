
<template>
    <div>
        <nav-bar></nav-bar>

        <div class='parent'>
            <div class='child base-image-input' :style="{ 'background-image': `url(${imageData})` }">
                <h5>Test PREVIEW</h5>
                <div>

                    <!-- <img v-bind:src="blog.img"> -->
                    <h3>Title-{{ blog.title }}</h3>
                    <p>
                        {{ blog.desp }}
                    </p>

                </div>

            </div>
            <div class='child text-start'>

                <h4>UPDATE RESUME</h4>

                <h5 class="card-title text-center">Add Post</h5>
                <div>

                    <input ref="fileInput" type="file" @change="onFileChange" @input="onSelectFile">
                    <input v-model="blog.title" type="text" placeholder="Blog Title" style="" /><br>
                    <input v-model="blog.desp" type="text" placeholder="Blog Body" /><br>
                    <button @click="onUploadFile" class="upload-button" :disabled="!this.selectedFile">Add</button>
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
        onUploadFile() {
            const formData = new FormData();
            this.blog['user_id'] = this.$route.params.id
            formData.append("file", this.selectedFile);
            // appending file
            // sending file to the backend
            this.$http.post("http://localhost:3000/test/", this.blog).then(function (data) {
                console.log(data.body.blog_id)
                this.$http.post("http://localhost:3000/test/upload/" + data.body.blog_id, formData)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }

            )

        },
        chooseImage() {
            this.$refs.fileInput.click()
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
        }
    },
    beforeCreate() {

    }
}
</script>


<style scoped>
.base-image-input {
    display: block;
    width: 200px;
    height: 200px;
    cursor: pointer;
    color: white;
    background-size: cover;
    background-position: center center;
}

.placeholder {
    background: #F0F0F0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    font-size: 18px;
    font-family: Helvetica;
}

.placeholder:hover {
    background: #E0E0E0;
}

.file-input {
    display: none;
}


.file-upload {
    box-shadow: 2px 2px 9px 2px #ccc;
    border-radius: 1rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 1rem;
    width: 60%;
    margin: 0 auto;
}

input {
    font-size: 0.9rem;
}

input,
div,
button {
    margin-top: 2rem;
}

.upload-button {
    width: 7rem;
    padding: 0.5rem;
    background-color: #278be9;
    color: #fff;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    border-radius: 1rem;
}

.upload-button:disabled {
    background-color: #b3bcc4;
    cursor: no-drop;
}

/*                   */
input {
    padding: 10px;
    width: 100%;
    margin-top: 2%;
}

.parent {
    text-align: center;
}

.child {
    display: inline-block;
    border: 2px solid rgb(17, 17, 97);
    padding: 1rem 1rem;
    width: 600px;
    margin-left: 50px;
    vertical-align: middle;
}
</style>
