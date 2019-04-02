<template>
    <div @click='lockScreen' class='lock-screen-btn-con'>
        <Tooltip content="锁屏" placement='bottom'>
            <Icon type='locked' :size='20'></Icon>
        </Tooltip>
    </div>
</template>

<script>
    import Util from '@/libs/util'

    export default {
        name: 'lockscreen',
        props: {
            value: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            lockScreen() {
                // 本地存储锁屏之前打开的页面以便解锁后打开
                Util.setLockPage(this.$route.name);
                this.$router.push({
                    name: 'locking'
                });
            }
        }
    }
</script>
