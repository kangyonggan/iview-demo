<template>
    <Layout style="height: 100%" class="main">
        <Sider hide-trigger collapsible :width="210" :collapsed-width="70" v-model="collapsed">
            <side-menu accordion :active-name="$route" :collapsed="collapsed" @on-select="turnToPage"
                       :menu-list="menuList">
                <div class="logo-con">
                    <h1 v-show="!collapsed">
                        <a href="/" style="color: #f5f5f5">后台管理系统</a>
                    </h1>
                    <h1 v-show="collapsed">
                        <a href="/" style="color: #f5f5f5">后管</a>
                    </h1>
                </div>
            </side-menu>
        </Sider>
        <Layout>
            <Header class="header-con">
                <header-bar :collapsed="collapsed">
                    <user :avatar="avatar"/>
                </header-bar>
            </Header>
            <Content>
                <Layout>
                    <div class="tag-nav-wrapper">
                        tag-nav
                    </div>
                    <Content>
                        <keep-alive>
                            <div style="margin: 10px;">
                                <router-view/>
                            </div>
                        </keep-alive>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    </Layout>
</template>

<script>
    import sideMenu from './components/side-menu'
    import headerBar from './components/header-bar';
    import user from './components/user';

    export default {
        components: {sideMenu, headerBar, user},
        data() {
            return {
                isFullScreen: false,
                collapsed: false
            };
        },
        computed: {
            avatar() {
                return require('../../assets/images/logo.jpg');
            },
            menuList() {
                return this.$store.getters.menus;
            }
        },
        methods: {
            turnToPage(name) {
                this.$router.push({
                    name: name
                });
            }
        },
        watch: {},
        mounted() {

        }
    };
</script>

<style scoped lang="less">
    .main {
        .logo-con {
            height: 60px;
            padding: 10px;
            color: #fff;
            text-align: center;
        }

        .header-con {
            height: 60px;
            background: #fff;
            box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);
            position: relative;
            z-index: 1;

            .lock-screen-btn-con {
                position: absolute;
                left: 65px;
                top: -3px;
                z-index: 999;
                display: inline-block;
                width: 30px;
                text-align: center;
                cursor: pointer;

                .ivu-tooltip {
                    height: 40px;
                }

                .ivu-tooltip-rel {
                    height: 40px;
                }

                i {
                    vertical-align: middle;
                }
            }

            .header-bar {
                position: absolute;
                left: 10px;
                top: 0;
                right: 340px;
                bottom: 0;
                padding: 10px;
                overflow: hidden;
            }

            .full-screen-btn-con {
                position: absolute;
                left: 100px;
                top: -3px;
                z-index: 999;
                display: inline-block;
                width: 30px;
                height: 40px;
                text-align: center;
                cursor: pointer;

                .ivu-tooltip {
                    height: 40px;
                }

                .ivu-tooltip-rel {
                    height: 40px;
                }

                i {
                    vertical-align: middle;
                }
            }
        }

        .tag-nav-wrapper {
            padding: 0;
            height: 40px;
            background: #F0F0F0;
            overflow: hidden;
        }
    }

    .user-dropdown-menu-con {
        height: 46px;
        line-height: 40px;
        margin-right: 10px;

        .ivu-dropdown {
            height: 46px;

            .ivu-dropdown-rel {
                height: 46px;

                a {
                    display: inline-block;
                }
            }
        }

        .main-user-name {
            width: 90px;
        }
    }
</style>
