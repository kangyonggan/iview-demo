<template>
    <FormItem v-if="vIf" :prop="prop" :label="label">
        <Input :type="type" v-model="model[prop]" :placeholder="placeholder ? placeholder : '请输入' + label" :clearable="clearable" :readonly="readonly"/>
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
            vIf: {
                type: Boolean,
                default: true
            },
            type: {
                type: String
            },
            label: {
                type: String
            },
            placeholder: {
                type: String
            },
            clearable: {
                type: Boolean,
                default: true
            },
            readonly: {
                type: Boolean,
                default: false
            }
        }
    };

    export default AppInput;

    Vue.component('AppInput', AppInput);
</script>
