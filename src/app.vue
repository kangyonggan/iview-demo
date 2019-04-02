<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            };
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {

        }
    };
</script>

<style lang="less">
    .size {
        width: 100%;
        height: 100%;
    }
    html, body {
        .size;
        overflow: hidden;
        margin: 0;
        padding: 0;
    }
    #app {
        .size;
    }
    .bg-white {
        background: #fff;
        padding: 8px;
    }
    .inner-content {
        max-width: 600px;
        margin: 20px auto;
    }
    .inner-content-lg {
        max-width: 900px;
        margin: 20px auto;
    }
</style>
