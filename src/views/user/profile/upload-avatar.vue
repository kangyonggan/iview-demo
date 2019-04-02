<template>
    <div>
        <div style="text-align: center;">
            <img ref="avatar" :src="user.avatar" class="avatar" @click="showBigAvatar = !showBigAvatar"/>

            <Modal v-model="showBigAvatar" footerHide>
                <img :src="user.avatar" @click="showBigAvatar = !showBigAvatar" v-if="showBigAvatar" class="bigAvatar">
            </Modal>
        </div>

        <div class="inner-content">
            <Upload
                :format="['jpg','jpeg','png', 'gif']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                type="drag"
                action="/user/profile/uploadAvatar"
                :headers="headers"
                style="margin: 20px;">
                <div style="padding: 50px 0;">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击此处或拖拽上传</p>
                </div>
            </Upload>
        </div>
    </div>
</template>

<script>
    import Util from '@/libs/util';

    export default {
        data() {
            return {
                user: {},
                showBigAvatar: false
            };
        },
        methods: {
            handleFormatError() {
                this.warning('文件类型错误，请选择jpg、jpeg、png或者gif格式的图片');
            },
            handleMaxSize() {
                this.warning('文件太大, 请不要超过2M');
            }
        },
        computed: {
            headers: function () {
                const headers = {};
                headers[Util.tokenKey] = Util.token();

                return headers;
            }
        },
        mounted() {
            const user = this.$store.state.StoreApp.user;
            this.user = {
                userId: user.userId,
                email: user.email,
                avatar: user.avatar || require('../../../assets/images/logo.jpg')
            };
        }
    };
</script>

<style scoped lang="less">
    .avatar {
        cursor: zoom-in;
        padding: 6px;
        border: 1px solid #dfd9ce;
        box-shadow: 0 1px 2px #adaca9;
    }

    .bigAvatar {
        width: 100%;
        cursor: zoom-out
    }
</style>
