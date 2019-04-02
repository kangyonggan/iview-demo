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
                :before-upload="handleBeforeUpload"
                type="drag"
                action=""
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
    import Http from '@/libs/http';
    import Config from '@/config/config';
    import {store} from '@/main';

    export default {
        data() {
            return {
                user: {},
                showBigAvatar: false
            };
        },
        methods: {
            checkFile: function (file) {
                if (!file) {
                    this.warning('请选择文件');
                    return false;
                }

                const index = file.name.lastIndexOf(".");
                const extErr = '文件类型错误，请选择jpg、jpeg、png或者gif格式的图片';
                if (index < 0) {
                    this.warning(extErr);
                    return false;
                }
                const ext = file.name.substring(file.name.lastIndexOf(".") + 1).toLocaleLowerCase();
                const allowExts = 'jpg,jpeg,png,gif';
                if (allowExts.indexOf(ext) < 0) {
                    this.warning(extErr);
                    return false;
                }

                if (file.size > 1024 * 1024 * 2) {
                    this.warning('文件太大, 请不要超过2M');
                    return false;
                }

                return true;
            },
            handleBeforeUpload: function (file) {
                if (!this.checkFile(file)) {
                    return false;
                }
                let formData = new FormData();
                formData.append('file', file);
                Http.postUpload(Config.uploadUrl, formData).then(data => {
                    this.success(data.respMsg);
                    Http.put('/user/profile', {avatar: data.data.fileName}).then(data => {
                        if (data.respCo === '0000') {
                            store.dispatch('reload').then(data => {
                                if (data.respCo === '0000') {
                                    this.reload();
                                } else {
                                    this.error(data.respMsg);
                                }
                            });
                        } else {
                            this.error(data.respMsg);
                        }
                    });
                }).catch(respMsg => {
                    this.error(respMsg);
                });
                return false;
            },
            reload() {
                const user = this.$store.state.StoreApp.user;
                this.user = {
                    userId: user.userId,
                    email: user.email,
                    avatar: user.avatar
                };
            }
        },
        mounted() {
            this.reload();
        }
    };
</script>

<style scoped lang="less">
    .avatar {
        width: 230px;
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
