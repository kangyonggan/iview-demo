<template>
    <Tree ref="tree" :check-directly="true" :data="data" :showCheckbox="showCheckbox" @on-check-change="onCheckChange"/>
</template>

<script>
    import Vue from 'vue';

    const AppTree = {
        props: {
            showCheckbox: {
                type: Boolean,
                default: false
            },
            checkChange: {
                type: Function
            }
        },
        data() {
            return {
                data: [],
                idName: ''
            };
        },
        methods: {
            init: function (items) {
                this.data = items;
            },
            toMenuItem: function (item, selectedItems, idName, titleName, iconName, childrenName) {
                const checked = this.isChecked(item, selectedItems, idName);
                this.idName = idName;
                const menu = {
                    id: item[idName],
                    title: item[titleName],
                    icon: item[iconName],
                    checked: checked,
                    expand: true,
                    children: []
                };
                const children = [];
                if (item[childrenName] && item[childrenName].length) {
                    for (const i in item[childrenName]) {
                        children.push(this.toMenuItem(item[childrenName][i], selectedItems, idName, titleName, iconName, childrenName));
                    }
                }
                menu.children = children;
                return menu;
            },
            isChecked: function (item, selectedItems, idName) {
                for (const i in selectedItems) {
                    if (selectedItems[i] === item[idName]) {
                        // 子节点不能有没有选中的
                        var hasNoChecked = true;
                        if (item.children && item.children.length) {
                            for (const j in item.children) {
                                if (!this.isChecked(item.children[j], selectedItems, idName)) {
                                    hasNoChecked = false;
                                    break;
                                }
                            }
                        }
                        return hasNoChecked;
                    }
                }
                return false;
            },
            onCheckChange: function () {
                this.$emit('checkChange', this.getSelected());
            },
            getSelected: function () {
                const selected = this.$refs.tree.getCheckedNodes();
                let result = [];

                for (let i in selected) {
                    result.push(selected[i].id);
                    // 向上获取父节点
                    this.pushParent(result, selected[i]);
                }

                return result;
            },
            pushParent: function (result, item) {
                const parent = this.getParent(this.data, item.id);
                if (parent) {
                    if (!this.contains(result, parent.id)) {
                        result.push(parent.id);
                        // 继续向上获取父节点
                        this.pushParent(result, parent);
                    }
                }
            },
            getParent: function (items, id) {
                if (!items || items.length === 0) {
                    return null;
                }
                var parent;
                for (const i in items) {
                    if (this.hasChildren(items[i].children, id)) {
                        return items[i];
                    } else {
                        parent = this.getParent(items.children, id);
                    }
                }
                return parent;
            },
            hasChildren: function (items, id) {
                if (!items || items.length === 0) {
                    return false;
                }
                for (const i in items) {
                    if (items[i].id === id) {
                        return true;
                    }
                }
                return false;
            },
            contains: function (items, id) {
                for (const i in items) {
                    if (items[i] === id) {
                        return true;
                    }
                }
                return false;
            }
        }
    };

    export default AppTree;

    Vue.component('AppTree', AppTree);
</script>
