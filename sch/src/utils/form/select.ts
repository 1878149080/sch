// 虚拟下拉列表，可以搜索
export const select_big_search = {
  showSearch: true,
  optionFilterProp: 'label',
  filterOption: (input: any, option: any) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  },
};

// 普通下拉列表，可以搜索
export const select_search = {
  showSearch: true,
  optionFilterProp: 'children',
  filterOption: (input: any, option: any) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  },
};

// 普通树下拉列表，可以搜索
export const select_tree_search = {
  showSearch: true,
  treeNodeFilterProp: 'title',
};
