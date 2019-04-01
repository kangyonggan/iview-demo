<template>
    <div class="bg-white">
        <div style="max-width: 600px;min-width: 300px;margin: 0 auto">
            <Tree :data="data" :render="renderContent"></Tree>
        </div>

        <!--新增/编辑菜单的界面-->
        <FormModal ref="formModal" @success="formSuccess"/>
    </div>
</template>

<script>
    import FormModal from './form-modal.vue';
    import Http from '../../../libs/http';

    export default {
        components: {FormModal},
        data() {
            return {
                root: {},
                data: [],
                buttonProps: {
                    type: 'ghost',
                    size: 'small'
                }
            }
        },
        mounted: function () {
            this.formSuccess();
        },
        methods: {
            renderContent(h, {root, node, data}) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: data.icon
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, [
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-plus-empty'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => {
                                    this.form(root, node);
                                }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-minus-empty'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => {
                                    this.remove(root, node, data);
                                }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'edit'
                            }),
                            on: {
                                click: () => {
                                    this.edit(root, data);
                                }
                            }
                        })
                    ])
                ])
            },
            form(root, node) {
                this.root = root[0].node;
                this.$refs.formModal.show({
                    parentCode: node.node.menuCode,
                    parentName: node.node.title
                });
            },
            edit(root, data) {
                this.root = root[0].node;
                this.$refs.formModal.show({
                    menuCode: data.menuCode,
                    menuName: data.title,
                    icon: data.icon,
                    sort: data.sort,
                    menuId: data.id
                });
            },
            formSuccess: function () {
                Http.get('system/menu').then(data => {
                    let menus = [];
                    for (let i in data.data.menus) {
                        menus.push(this.loadMenu(data.data.menus[i]));
                    }
                    this.data = [{
                        title: '根菜单',
                        menuCode: '',
                        expand: true,
                        children: menus,
                        render: (h, {root, node, data}) => {
                            return h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '100%'
                                }
                            }, [
                                h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'grid'
                                        },
                                        style: {
                                            marginRight: '8px'
                                        }
                                    }),
                                    h('span', data.title)
                                ]),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        float: 'right',
                                        marginRight: '32px'
                                    }
                                }, [
                                    h('Button', {
                                        props: Object.assign({}, this.buttonProps, {
                                            icon: 'ios-plus-empty',
                                            type: 'primary'
                                        }),
                                        style: {
                                            width: '86px'
                                        },
                                        on: {
                                            click: () => {
                                                this.form(root, node)
                                            }
                                        }
                                    })
                                ])
                            ])
                        }
                    }]
                }).catch(respMsg => {
                    this.error(respMsg)
                })
            },
            remove(root, node, data) {
                if (node.node.children && node.node.children.length) {
                    this.warning('不能删除有子菜单的父菜单');
                    return;
                }

                let that = this;
                that.$Modal.confirm({
                    title: '删除确认',
                    content: '确认删除菜单？',
                    loading: true,
                    closable: true,
                    onOk: function () {
                        Http.del('system/menu/' + node.node.id).then(data => {
                            that.success(data.respMsg);
                            that.formSuccess();
                        }).catch(respMsg => {
                            that.error(respMsg);
                        });
                        that.$Modal.remove();
                    }
                });
            },
            loadMenu: function (item) {
                let menu = {
                    title: item.menuName,
                    id: item.menuId,
                    parentCode: item.parentCode,
                    sort: item.sort,
                    menuCode: item.menuCode,
                    icon: item.icon,
                    expand: true,
                    children: []
                };
                let children = [];
                if (item.children && item.children.length) {
                    for (let i in item.children) {
                        children.push(this.loadMenu(item.children[i]));
                    }
                }
                menu.children = children;

                return menu;
            }
        }
    };
</script>
