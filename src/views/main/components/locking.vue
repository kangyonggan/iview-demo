<template>
    <div :style="{width: '100%', height: '100%', background: '#667aa6'}">
        <div class="unlock-con">
            <unlock :show-unlock="showUnlock" @on-unlock="handleUnlock"></unlock>
        </div>
    </div>
</template>

<script>
    import unlock from './unlock.vue'
    import Util from '../../../libs/util'

    export default {
        components: {
            unlock
        },
        data() {
            return {
                showUnlock: false
            }
        },
        methods: {
            handleUnlock() {
                this.showUnlock = false;
                this.$router.push({
                    // 解锁之后跳转到锁屏之前的页面
                    name: Util.getLockPage()
                })
            }
        },
        mounted() {
            this.showUnlock = true;
            if (!document.getElementById('lock_screen_back')) {
                let lockdiv = document.createElement('div');
                lockdiv.setAttribute('id', 'lock_screen_back');
                lockdiv.setAttribute('class', 'lock-screen-back');
                document.body.appendChild(lockdiv);
            }
        }
    }
</script>
