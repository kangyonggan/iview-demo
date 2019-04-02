<template>
    <AppForm ref="modal" action="user/profile/" method="put" :model="userProfile" :rules="rules"
             @success="handleSuccess">
        <AppInput :model="userProfile" prop="userId" label="用户ID" readonly :clearable="false"/>
        <AppInput :model="userProfile" prop="email" label="电子邮箱" readonly :clearable="false"/>

        <AppInput :model="userProfile" prop="name" label="姓名"/>
        <AppSelect :model="userProfile" prop="idType" label='证件类型' dict-type="ID_TYPE"/>
        <AppInput :model="userProfile" prop="idNo" label="证件号码"/>
    </AppForm>
</template>

<script>
    import Http from '@/libs/http';
    import {store} from '@/main';

    export default {
        data() {
            return {
                userProfile: {},
                rules: {
                    name: [
                        {max: 32, message: '姓名最多32位', trigger: 'blur'}
                    ],
                    idNo: [
                        {validator: this.validateIdNo, trigger: 'blur'}
                    ]
                }
            };
        },
        mounted() {
            const user = this.$store.state.StoreApp.user;
            this.userProfile = {
                userId: user.userId,
                email: user.email,
                name: user.name,
                idType: user.idType,
                idNo: user.idNo
            };
        },
        methods: {
            validateIdNo: function (rule, value, callback) {
                if (!value) {
                    callback();
                    return;
                }

                Http.get('validate/idNo?idNo=' + value).then(() => {
                    callback();
                }).catch(respMsg => {
                    callback(new Error(respMsg));
                });
            },
            handleSuccess() {
                store.dispatch('reload').then(data => {
                    if (data.respCo !== '0000') {
                        this.error(data.respMsg);
                    }
                });
            }
        }
    };
</script>
