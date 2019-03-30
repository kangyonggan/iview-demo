<template>
    <FormItem :prop="prop">
        <Input v-model="model[prop]" :placeholder="placeholder" :clearable="clearable" />
    </FormItem>
</template>

<script>
    import Vue from 'vue';

    const AppInput = {
        props: {
            model: {
                required: true,
                type: Object
            },
            prop: {
                required: true,
                type: String
            },
            placeholder: {
                type: String
            },
            clearable: {
                type: Boolean,
                default: true
            }
        }
    };

    export default AppInput;

    Vue.component('AppInput', AppInput);
</script>
