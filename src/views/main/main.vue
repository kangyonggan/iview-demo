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
        name: 'Main',
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
                console.log(this.$store.getters.menuList);
                return this.$store.getters.menuList;
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
