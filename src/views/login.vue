<template>
    <div class="login">
        <div class="login-con">
            <Card icon="log-in" title="用户登录">
                <div class="form-con">
                    <Form ref="loginForm" :model="user" :rules="rules">
                        <FormItem prop="email">
                            <Input v-model="user.email" placeholder="请输入电子邮箱">
                                <span slot="prepend">
                                  <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="user.password" placeholder="请输入密码">
                                <span slot="prepend">
                                  <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="submit" :loading="loading" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        data() {
            return {
                user: {},
                loading: false,
                rules: {
                    email: [
                        {required: true, message: '电子邮箱为必填项', trigger: 'blur'},
                        {max: 64, message: '电子邮箱最多为64位', trigger: 'blur'},
                        {pattern: /^[a-zA-Z0-9_]+@[a-z0-9]+\.[a-z0-9]+$/, message: '电子邮箱格式错误', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码为必填项', trigger: 'blur'},
                        {min: 8, message: '密码最少为8位', trigger: 'blur'},
                        {max: 20, message: '密码最多为20位', trigger: 'blur'},
                        {pattern: /^[a-zA-Z0-9_]+$/, message: '只能由字母、数字和下划线组成', trigger: 'blur'}
                    ]
                }
            };
        },

        methods: {
            ...mapActions([
                'login'
            ]),
            submit() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.login(this.user).then(data => {
                            this.loading = false;
                            if (data.respCo === '0000') {
                                this.$router.push({
                                    name: 'index'
                                })
                            } else {
                                this.error(data.respMsg);
                            }
                        });
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    .login {
        width: 100%;
        height: 100%;
        background-image: url('../assets/images/login_bg.jpg');
        background-size: cover;
        background-position: center;
        position: relative;

        &-con {
            position: absolute;
            right: 160px;
            top: 50%;
            transform: translateY(-60%);
            width: 300px;

            &-header {
                font-size: 16px;
                font-weight: 300;
                text-align: center;
                padding: 30px 0;
            }

            .form-con {
                padding: 10px 0 0;
            }
        }
    }
</style>
