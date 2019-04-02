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
                :before-upload="handleBeforeUpload"
                type="drag"
                action="user/profile/avatar"
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
    import Http from '../../../libs/http';
    import {store} from '../../../main';

    export default {
        data() {
            return {
                user: {},
                showBigAvatar: false
            };
        },
        methods: {
            handleFormatError() {
                console.log("asdasd");
                this.warning('文件类型错误，请选择jpg、jpeg、png或者gif格式的图片');
            },
            handleMaxSize() {
                this.warning('文件太大, 请不要超过2M');
            },
            handleBeforeUpload: function (file) {
                let formData = new FormData();
                formData.append('file', file);
                Http.putUpload('user/profile/avatar', formData).then(data => {
                    this.success(data.respMsg);
                    this.isLoading = false;
                    store.dispatch('reload').then(data => {
                        if (data.respCo !== '0000') {
                            this.error(data.respMsg);
                        }
                    });
                }).catch(respCo => {
                    this.isLoading = false;
                    this.error(respCo);
                });
                return false;
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
