<template>
    <div class="header-bar">
        <sider-trigger :collapsed="collapsed" icon="navicon-round" @on-change="handleCollpasedChange"></sider-trigger>
        <div class="custom-content-con">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import siderTrigger from './sider-trigger';

    export default {
        name: 'headerBar',
        components: {siderTrigger},
        props: {
            collapsed: Boolean
        },
        computed: {},
        methods: {
            handleCollpasedChange(state) {
                this.$emit('on-coll-change', state);
            }
        }
    };
</script>

<style scoped lang="less">
    .header-bar {
        width: 100%;
        height: 100%;
        position: relative;

        .custom-content-con {
            float: right;
            height: auto;
            padding-right: 20px;
        }
    }
</style>
