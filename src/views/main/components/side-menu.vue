<template>
    <div class="side-menu-wrapper">
        <slot></slot>
        <Menu ref="menu" v-show="!collapsed" :active-name="activeName.name" :open-names="openedNames"
              :accordion="accordion" :theme="theme" width="auto" @on-select="handleSelect">
            <template v-for="item in menuList">
                <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`"
                                :parent-item="item"></side-menu-item>
                <menu-item v-else :name="`${item.name}`" :key="`menu-${item.name}`">
                    <Icon :type="item.icon"/>
                    <span>{{ item.meta.title }}</span></menu-item>
            </template>
        </Menu>
        <div class="menu-collapsed" v-show="collapsed" :list="menuList">
            <collapsed-menu @on-click="handleSelect" hide-title :root-icon-size="rootIconSize" :icon-size="iconSize"
                            :theme="theme" v-for="item in menuList" :parent-item="item"
                            :key="`drop-menu-${item.name}`"></collapsed-menu>
        </div>
    </div>
</template>

<script>
    import sideMenuItem from './side-menu-item.vue';
    import collapsedMenu from './collapsed-menu.vue';
    import Util from '@/libs/util';
    import mixin from './mixin';

    export default {
        name: 'sideMenu',
        mixins: [mixin],
        components: {
            sideMenuItem,
            collapsedMenu
        },
        props: {
            menuList: {
                type: Array,
                default() {
                    return [];
                }
            },
            collapsed: {
                type: Boolean
            },
            theme: {
                type: String,
                default: 'dark'
            },
            rootIconSize: {
                type: Number,
                default: 20
            },
            iconSize: {
                type: Number,
                default: 16
            },
            accordion: Boolean,
            activeName: {
                type: Object
            },
            openNames: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                openedNames: []
            };
        },
        methods: {
            handleSelect(name) {
                this.$emit('on-select', name);
            },
            getOpenedNamesByActiveName(name) {
                return this.$route.matched.map(item => item.name).filter(item => item !== name);
            }
        },
        watch: {
            activeName(route) {
                if (this.accordion) {
                    let newOpenNames = this.getOpenedNamesByActiveName(route.name);
                    if (newOpenNames && newOpenNames.length && newOpenNames[0] === 'dynamic') {
                        newOpenNames[0] = route.meta.active || this.openedNames[0];
                    }
                    this.openedNames = newOpenNames;
                } else {
                    this.openedNames = Util.getIntersection(this.openedNames, this.getOpenedNamesByActiveName(route.name));
                }
            },
            openNames(newNames) {
                this.openedNames = newNames;
            },
            openedNames() {
                this.$nextTick(() => {
                    this.$refs.menu.updateOpened();
                });
            }
        },
        mounted() {
            let newOpenNames = this.getOpenedNamesByActiveName();
            if (newOpenNames && newOpenNames.length && newOpenNames[0] === 'dynamic') {
                newOpenNames[0] = this.$route.meta.active || '';
            }
            this.openedNames = Util.getIntersection(this.openedNames, newOpenNames);
        }
    };
</script>

<style lang="less">
    .side-menu-wrapper {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        .menu-collapsed {
            padding-top: 10px;

            a.drop-menu-a {
                display: inline-block;
                padding: 6px 15px;
                width: 100%;
                text-align: center;
                color: #495060;
            }

            .ivu-dropdown {
                width: 100%;

                .ivu-dropdown-rel button {
                    width: 100%;
                }
            }

            .menu-title {
                margin-left: 6px;
            }

            .ivu-select-dropdown {
                width: 160px;
                margin-left: 4px;
            }
        }
    }

</style>
