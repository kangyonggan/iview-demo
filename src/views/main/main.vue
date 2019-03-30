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
                <lock-screen></lock-screen>
                <fullscreen v-model="isFullScreen"></fullscreen>
                <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
                    <user :avatar="avatar"/>
                </header-bar>
            </Header>
            <Content>
                <Layout>
                    <div class="tag-nav-wrapper">
                        <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
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
    import tagsNav from './components/tags-nav';
    import lockScreen from './components/lockscreen';
    import fullscreen from './components/fullscreen'
    import user from './components/user';
    import { mapMutations } from 'vuex'
    import Util from '../../libs/util';

    export default {
        components: {sideMenu, headerBar, tagsNav, lockScreen, fullscreen, user},
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
            },
            tagNavList () {
                return this.$store.state.StoreApp.tagNavList;
            }
        },
        methods: {
            ...mapMutations([
                'setBreadCrumb',
                'setTagNavList',
                'addTag'
            ]),
            // 点击菜单
            turnToPage(name) {
                this.$router.push({
                    name: name
                });
            },
            // 展开/收缩菜单
            handleCollapsedChange (state) {
                this.collapsed = state
            },
            // 关闭Tab页
            handleCloseTag (res, route) {
                this.setTagNavList(res);
                if (route) {
                    this.handleClick(route);
                }
            },
            // 激活Tab页
            handleClick (item) {
                this.$router.push({
                    name: item.name,
                    params: item.meta.params,
                    query: item.meta.query
                })
            }
        },
        watch: {
            '$route' (newRoute) {
                newRoute.meta.params = this.$route.params;
                newRoute.meta.query = this.$route.query;
                const disp = Util.getRouteDisp(this.menuList, newRoute);
                this.setBreadCrumb(newRoute.matched);
                this.setTagNavList(Util.getNewTagList(this.tagNavList, newRoute, disp));
            }
        },
        mounted() {
            // 初始化设置面包屑导航和标签导航
            this.setTagNavList();
            this.setBreadCrumb(this.$route.matched);
        }
    };
</script>

<style lang="less">
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
