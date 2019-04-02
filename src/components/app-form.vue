<template>
    <Form ref="form" :model="model" :rules="rules" class="inner-content">
        <slot></slot>

        <FormItem>
            <Button type="success" icon="checkmark" :loading="isLoading" @click="handleSubmit($event, $refs.form)">
                提交
            </Button>
        </FormItem>
    </Form>
</template>

<script>
    import Vue from 'vue';
    import Http from '@/libs/http';

    const AppForm = {
        props: {
            model: {
                required: false,
                type: Object
            },
            action: {
                required: false,
                type: String
            },
            method: {
                required: false,
                type: String,
                default: 'post'
            },
            rules: {
                required: false,
                type: Object
            }
        },
        data() {
            return {
                isLoading: false
            };
        },
        methods: {
            handleSubmit: function (e, form) {
                form.validate((valid) => {
                    if (valid) {
                        this.isLoading = true;
                        Http.request(this.method, this.action, this.model).then(data => {
                            this.success(data.respMsg);
                            this.$emit('success', data);
                            this.isLoading = false;
                        }).catch(respMsg => {
                            this.$emit('failure', respMsg);
                            this.error(respMsg);
                            this.isLoading = false;
                        });
                    }
                });
            }
        }
    };

    export default AppForm;

    Vue.component('AppForm', AppForm);
</script>
