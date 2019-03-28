<template>
    <div class="login">
        <div class="login-con">
            <Card icon="log-in" title="登录" :bordered="false">
                <div class="form-con">
                    <Form ref="loginForm" :model="user">
                        <FormItem prop="username">
                            <Input v-model="user.username" placeholder="请输入电子邮箱">
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
    export default {
        data() {
            return {
                user: {},
                loading: false
            };
        },
        methods: {
            submit () {
                alert("登录");
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
