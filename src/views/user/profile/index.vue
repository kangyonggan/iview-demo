<template>
    <div class="bg-white">
        <Tabs type="card">
            <TabPane label="基础信息">
                <EditProfile/>
            </TabPane>
            <TabPane label="修改密码">
                <EditPassword/>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import EditProfile from './edit-profile';
    import EditPassword from './edit-password';

    export default {
        components: {EditProfile, EditPassword}
    };
</script>
