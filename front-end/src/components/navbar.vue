

<template>
    <nav class="navbar navbar-expand-lg sticky-top  " style="background-color: #6e4dab; height:10vh;color: #ffffff;">
        <div class="container-md">
            <img src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" alt="Logo" width="50" height="50"
                style="border: 3px solid black; border-radius:50%" class="d-inline-block align-text-top">
            <div class="collapse navbar-collapse" id="navbarSupportedContent" style="margin-left:3%">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">


                    <li class="nav-item ">
                        <router-link v-bind:to="'/home/' + this.$route.params.id" class="nav-link"
                            style="color:#ffffff; font-weight: 600;">
                            Home</router-link>
                    </li>
                    <li class="nav-item ">
                        <router-link v-bind:to="'/create/' + this.$route.params.id" class="nav-link"
                            style="color:#ffffff; font-weight: 600;">
                            Create</router-link>
                    </li>
                    <li class="nav-item ">
                        <router-link v-bind:to="'/gallery/' + this.$route.params.id" class="nav-link"
                            style="color:#ffffff; font-weight: 600;">
                            Gallery</router-link>
                    </li>

                </ul>
                <form class="d-flex" role="search">
                    <button class="btn btn-warning" v-on:click="logout" style="padding:20%;">Logout</button>
                </form>
            </div>
        </div>
    </nav>

</template>
<script >
export default {
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
        logout: function () {
            this.$router.push('/login')
        },

    },
    computed: {

    }
}
</script>


<style scoped>
.router-link-active {
    background: #2f1f4f;
    color: rgb(255, 255, 255);
}
</style>