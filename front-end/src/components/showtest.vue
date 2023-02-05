
<template>
    <div>
        <nav-bar></nav-bar>
        <h1 class="text-center">HOME</h1>
        <div class="child base-image-input" v-for="blog in blogs"
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

            // this.$http.get('http://localhost:3000/blog/like/' + blog.blog_id + '/' + this.$route.params.id).then(function (data) {
            //     blog.likes = data.body;
            // })
        }
    },
    beforeCreate() {

        this.$http.get('http://localhost:3000/test').then(function (data) {

            this.blogs = data.body;
            console.log(this.blogs)
        })

    }
}
</script>


<style scoped>
.btn {
    border-radius: 40%;
}

input,
div,
button {
    margin-top: 2rem;
}

.base-image-input {
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
    color: white;
    background-size: cover;
    background-position: center center;
}

.container {
    max-width: 600px;
    margin-right: auto;
    margin-left: auto;
    height: auto;
    margin-top: 2%;
    /* background-color: #6e4dabac; */
    border-radius: 80px 0 80px 0;
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
