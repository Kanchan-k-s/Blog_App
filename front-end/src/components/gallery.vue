
<template>
    <div>
        <nav-bar></nav-bar>
        <h1 class="text-center">My Gallery</h1>
        <div v-if="hide" class="dialogue" style="">
            <h5>Liked By:</h5>
            <ul v-for="l in list">
                <li>{{ l.user_name }}</li>
            </ul>
        </div>
        <div class="container base-image-input" v-for="blog in blogs"
            v-bind:style="{ 'background-image': `url(${blog.img})` }">
            <button class="btn btn-warning" style="float:inline-start;" v-on:mouseover="userlist(blog.blog_id)"
                v-on:mouseleave="userHide">LIKES: {{
                    blog.likes
                }}</button>
            <h1 class="text-center" style="text-decoration:underline"><span v-if="!blog.Active">
                    {{ blog.title }}
                </span><span v-else> Title:<input v-model="blog.title" type="text" placeholder="Blog Title" /></span>
            </h1>

            <div style="text-align:left">
                <div>
                    <p>
                        <b>Description: </b><br>
                        <span v-if="!blog.Active">{{ blog.desp }}</span>
                        <span v-else><textarea class="form-control" v-model="blog.desp" type="text"
                                placeholder="Blog Body"></textarea> </span>
                    </p>
                </div>
                <div v-if="!blog.Active">
                    <button class="btn btn-danger" style="color:#ffffff"
                        v-on:click="blogDelete(blog.blog_id)">Delete</button>
                    <button class="btn btn-primary " style="margin-left:2%;color:#ffffff"
                        v-on:click="blogEdit(blog)">Edit</button>
                </div>
                <div v-else>
                    <button class="btn" style="margin-left:2%;background-color: #31214fe0;color:#ffffff"
                        v-on:click="blogUpdate(blog)">Update</button>
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
            blogs: [],
            list: null,
            hide: false
        }
    },
    methods: {
        blogDelete: function (id) {
            this.$http.delete('http://localhost:3000/blog/' + id).then(function (data) {
                this.blogs = this.blogs.filter(item => item.blog_id != id)
            })
        },
        blogEdit: function (blog) {
            blog.Active = !blog.Active
        },
        blogUpdate: function (blog) {
            blog.Active = !blog.Active
            this.$http.put('http://localhost:3000/blog', blog).then(function (data) {
            })
        },
        userlist: function (id) {
            this.hide = true;
            this.$http.get('http://localhost:3000/blog/userlist/' + id).then(function (data) {
                this.list = data.body
            })
        },
        userHide: function () {
            this.hide = false;
            this.list = null;
        }
    },
    beforeCreate() {
        if (this.$session.exists() && this.$session.get('userid') === this.$route.params.id) {
            this.$http.get('http://localhost:3000/blog/' + this.$route.params.id).then(function (data) {

                let temp = data.body.map((d) => ({
                    ...d, Active: false
                }))
                this.blogs = temp;

            })
        }
        else {
            this.$router.push('/')
        }
    }
}
</script>


<style scoped>
.base-image-input {
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
    color: white;
    background-size: cover;
    background-position: center center;
}

.dialogue {
    float: left;
    width: 150px;
    padding: 10px;
    margin-top: 10%;
    margin-left: 3%;
    position: fixed;
    background-color: #332152ac;
    border-radius: 10px;
    color: white;
}

input {
    margin-left: 2%;
    width: 70%;
    border-radius: 20px;
    border-width: 0;
}

.container {
    max-width: 600px;
    margin-right: auto;
    margin-left: auto;
    height: auto;
    margin-top: 2%;

    background-color: #6e4dabac;
    border-radius: 80px 0 80px 0;
    padding-bottom: 2%;
}
</style>
