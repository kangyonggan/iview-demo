<template>
    <div class="user-dropdown-menu-con">
        <Dropdown transfer trigger="click" @on-click="handleClick" placement="bottom-end">
            <a href="javascript:void(0)">
                <span class="main-user-name">
                  <Avatar :src="avatar"/>
                  <Icon type="arrow-down-b" style="color: #999"></Icon>
                </span>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem name="logout">退出</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: 'user',
        props: {
            avatar: {
                required: true,
                type: String
            }
        },
        methods: {
            ...mapActions([
                'logout'
            ]),
            handleClick(name) {
                switch (name) {
                    case 'logout': {
                        this.logout().then(data => {
                            if (data) {
                                this.$router.push({
                                    name: 'login'
                                });
                            }
                        });
                        break;
                    }
                }
            }
        }
    };
</script>

<style scoped>
    .user-avator-dropdown {
        display: inline-block;
        height: 32px;
        vertical-align: middle;
        line-height: 10px;
        margin-right: 20px;
    }

    .ivu-select-dropdown {
        z-index: 99;
    }
</style>
