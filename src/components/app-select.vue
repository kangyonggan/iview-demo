<template>
    <FormItem :prop="prop" :label="label">
        <Select v-model="model[prop]" :placeholder="placeholder ? placeholder : '请选择' + label" :disabled="disabled">
            <Option v-for="item in items" :value='item.code' :key="item.code">
                {{item.name}}
            </Option>
        </Select>
    </FormItem>
</template>

<script>
    import Vue from 'vue';

    const AppSelect = {
        props: {
            model: {
                required: true,
                type: Object
            },
            prop: {
                required: true,
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
            disabled: {
                type: Boolean,
                default: false
            },
            items: {
                type: Array,
                default: []
            }
        }
    };

    export default AppSelect;

    Vue.component('AppSelect', AppSelect);
</script>
