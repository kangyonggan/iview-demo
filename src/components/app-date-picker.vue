<template>
    <FormItem :prop="prop">
        <DatePicker v-model="model[prop]" :placeholder="placeholder" @on-change="model[prop]=$event"/>
    </FormItem>
</template>

<script>
    import Vue from 'vue';

    const AppDatePicker = {
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
            }
        }
    };

    export default AppDatePicker;

    Vue.component('AppDatePicker', AppDatePicker);
</script>
