
<template>
    <div>
        <nav-bar></nav-bar>
        <h1 class="text-center">HOME</h1>
        <div class="container base-image-input" v-for="blog in blogs"
            v-bind:style="{ 'background-image': `url(${blog.img})` }">


            <button class="btn btn-warning" style="float:inline-start;">{{ blog.likes }}</button>
            <h1 class="text-center" style="text-decoration:underline">{{ blog.title }}</h1>
            <p>
                <b>Description: </b><br>
                {{ blog.desp }}
            </p>

            <button v-on:click="onLike(blog)" class="btn btn-warning" style="margin-left:95%">❤️</button>

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
            blogs: {}
        }
    },
    methods: {
        onLike: function (blog) {

            this.$http.get('http://localhost:3000/blog/like/' + blog.blog_id + '/' + this.$route.params.id).then(function (data) {
                blog.likes = data.body;
            })
        }
    },
    beforeCreate() {
        if (this.$session.exists() && this.$session.get('userid') === this.$route.params.id) {
            this.$http.get('http://localhost:3000/blog').then(function (data) {

                this.blogs = data.body;
            })
        } else {
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

.btn {
    border-radius: 40%;
}

.container {
    max-width: 600px;
    margin-right: auto;
    margin-left: auto;
    height: auto;
    margin-top: 2%;
    background-color: #6e4dabac;
    border-radius: 80px 0 80px 0;
}
</style>
