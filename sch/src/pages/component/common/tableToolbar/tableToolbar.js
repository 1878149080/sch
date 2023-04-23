import React from 'react';
import { Tooltip } from 'antd';
import { createPortal } from 'react-dom';
import {
  FileExcelOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  SettingOutlined,
} from '@ant-design/icons';
// import SetColumn from './modal/setColumn';
import SetColumn from './modal/simpleColumn';
import { getRootHeight } from '../../../../utils/queryPage/getDocument';
import { filterRoleBtn } from '../../../../utils/queryPage/roleBtn';

/**
 * @desc 表格工具栏
 * @author 吴昊
 * */
class tableToolbar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columnFilterVisible: this.props.columnFilterVisible || false,
      // 当前最大化状态：true：最大化，false：最小化
      expanded: false,
      expandedTableHeight: 100,
      tableHeight: 100,
    };
    this.handleExpander = this.handleExpander.bind(this);
    this.handleColumnFilter = this.handleColumnFilter.bind(this);
    this.handleSaveColumn = this.handleSaveColumn.bind(this);
    this.unTime = new Date().getTime();
  }

  componentDidMount() {
    this.setState({
      tableHeight: getTableHeight({ ...this.props, self: this }),
    });
    this.props.onChildSelf && this.props.onChildSelf(this);
    window.addEventListener('resize', this.handleRootHeight);
  }

  componentWillUnmount() {
    // 清除最大化div，减少重复渲染
    this.node && window.document.body.removeChild(this.node);
    window.removeEventListener('resize', this.handleRootHeight);
    clearTimeout(window[this.unTime]);
  }

  // 表格高度自适应
  handleRootHeight = () => {
    let uniqueName = this.unTime;
    if (window[uniqueName]) {
      clearTimeout(window[uniqueName]);
    }
    window[uniqueName] = setTimeout(() => {
      const { expanded } = this.state;
      const param = {
        ...this.props,
        mode: expanded ? 'max' : 'default',
      };
      this.setState({
        tableHeight: getTableHeight({ ...param, self: this }),
      });
    }, 100);
  };

  // 获取表格高度
  // getTableHeight = () => {
  //   const { rootHeight, headerHeight, tabsHeight } = getRootHeight();
  //   let searchHeight = this.search ? this.search.offsetHeight : 0;
  //   let tableBtnHeight = this.tableBtn ? this.tableBtn.offsetHeight : 0;
  //   return (
  //     rootHeight - headerHeight - tabsHeight - searchHeight - tableBtnHeight
  //   );
  // };

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   const {
  //     className,
  //     title,
  //     columnFilterEnable,
  //     canExpand,
  //     columns = [],
  //   } = this.props;
  //   if (
  //     prevProps.className !== className ||
  //     prevProps.title !== title ||
  //     prevProps.columnFilterEnable !== columnFilterEnable ||
  //     prevProps.canExpand !== canExpand ||
  //     prevProps.columns !== columns
  //   ) {
  //     return true;
  //   }
  //   return null;
  // }

  // 添加div，用于最大化
  addBodyDiv = () => {
    if (!this.node) {
      //  记录参数 利用window.document
      const doc = window.document;
      // 定义this.node 创建一个div节点
      this.node = doc.createElement('div');
      // 当前的body下挂载一个div节点
      doc.body.appendChild(this.node);
    }
  };

  // 最大化事件监听
  handleExpander() {
    const { expandedTableHeight, tableHeight } = this.state;
    const expanded = !this.state.expanded;
    if (expanded) {
      this.addBodyDiv();
      document.getElementById('root').style.height = 0;
      document.getElementById('root').style.minHeight = 0;
    } else {
      document.getElementById('root').style.height = '100%';
      document.getElementById('root').style.minHeight = 600 + 'px';
    }
    const param = {
      ...this.props,
      mode: expanded ? 'max' : 'default',
    };
    this.setState({
      expanded,
      tableHeight: expanded
        ? getTableHeight({ ...param, self: this })
        : expandedTableHeight,
      expandedTableHeight: expanded ? tableHeight : expandedTableHeight,
    });
    // 如果最大化回调事件存在，则执行
    if (this.props.onExpanded) this.props.onExpanded(expanded);
  }

  // 列配置
  handleColumnFilter() {
    this.setState({
      columnFilterVisible: !this.state.columnFilterVisible,
    });
  }

  // 保存列配置，并生效
  handleSaveColumn(columns) {
    this.handleColumnFilter();
    this.props.setColumn(columns);
  }

  render() {
    const { tableHeight } = this.state;

    const setColumnProps = {
      visible: this.state.columnFilterVisible,
      // columns: this.props.columns,
      // columns: JSON.parse(JSON.stringify(this.props.columns)),
      columns: this.props.columns.map((item) => {
        return { ...item };
      }),
      settingText: this.props.settingText,
      handleColumnFilterOk: this.handleSaveColumn,
      handleColumnFilterCancel: this.handleColumnFilter,
      setColumn: this.props.setColumn,
    };
    const tableBarProps = {
      ref: (node) => {
        this.tableBtn = node;
      },
    };
    const htmls = (
      <div
        className={`tableTool ${this.props.className || ''} ${
          this.state.expanded ? 'MaximizeWindows' : ''
        }`}
      >
        <div className="tableBox">
          <div className="headers" {...tableBarProps}>
            <span className="titles">{this.props.title}</span>
            <div className="btnGroup">
              {filterRoleBtn(this.props.btnList || [])?.map((item, index) => {
                const { disabled = false } = item;
                return (
                  <Tooltip
                    key={item.name + index + item.role}
                    title={item.name}
                  >
                    <a
                      className={disabled ? 'disabled' : ''}
                      onClick={disabled ? null : item.handle}
                    >
                      {item.icon}
                      {item.name}
                    </a>
                  </Tooltip>
                );
              })}
              {this.props.columnFilterEnable ? (
                <Tooltip title={this.props.settingText || '列配置'}>
                  <a onClick={this.handleColumnFilter}>
                    <SettingOutlined />
                    {this.props.settingText || '列配置'}
                  </a>
                </Tooltip>
              ) : null}

              {this.props.onExport ? (
                <Tooltip title={this.props.exportTitle || '导出报表'}>
                  <a onClick={this.props.onExport}>
                    <FileExcelOutlined />
                    {this.props.exportTitle || '导出报表'}
                  </a>
                </Tooltip>
              ) : null}

              {this.props.canExpand ? (
                <Tooltip title={this.state.expanded ? '最小化' : '最大化'}>
                  <a onClick={this.handleExpander}>
                    {this.state.expanded ? (
                      <FullscreenExitOutlined />
                    ) : (
                      <FullscreenOutlined />
                    )}
                    {this.state.expanded ? '最小化' : '最大化'}
                  </a>
                </Tooltip>
              ) : null}
            </div>
          </div>
          {/* {this.props.children} */}
          {React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {
              // params: tableHeight,
              tableHeight,
              tableBoxRefs: (node) => {
                this.tableBox = node;
              },
            });
          })}
        </div>
        {this.state.columnFilterVisible ? (
          <SetColumn {...setColumnProps} />
        ) : null}
      </div>
    );
    return (
      <div>{this.state.expanded ? createPortal(htmls, this.node) : htmls}</div>
    );
  }
}

export default tableToolbar;

// 根据不通的模式获取表格高度
function getTableHeight(props) {
  const { mode = 'default' } = props;
  if (mode === 'max') {
    return getMaxHeight(props);
  } else if (mode === 'modal') {
    return getModalHeight(props);
  } else {
    return getHeight(props);
  }
}

// 获取传递过来的this
function getPageThis(props) {
  let pageThis = {};
  if (typeof props.pageThis === 'function') {
    pageThis = props?.pageThis?.() || {};
  } else {
    pageThis = props.pageThis || {};
  }
  return pageThis;
}

// 1. 普通分页
function getHeight(props) {
  // pageMode 1：普通  2：分页头部有标签页
  const { pageMode = 2, self } = props;
  const pageThis = getPageThis(props);
  // root高度、系统头部高度、系统标签页头部
  const { rootHeight, headerHeight, tabsHeight } = getRootHeight();
  // 查询条件高度
  let searchHeight = pageThis.search ? pageThis.search.offsetHeight : 0;
  // 表格头部按钮高度
  let tableBtnHeight = self.tableBtn ? self.tableBtn.offsetHeight : 0;
  // 表格表头高度
  let tableHeadHeight = self.tableBox
    ? self.tableBox.querySelector('.ant-table-thead')?.offsetHeight
    : 0;
  // 获取分页高度
  let paginationHeight = self.tableBox
    ? self.tableBox.querySelector('.pagination')
      ? self.tableBox.querySelector('.pagination').offsetHeight
      : 0
    : 0;
  // let paginationHeight = self.tableBox ? 44 : 0;
  let tableMarginBottom = 18;
  const aa =
    rootHeight -
    // headerHeight -
    72 -
    20 -
    // tabsHeight -
    (pageMode === 1 ? 0 : 39) -
    searchHeight -
    tableBtnHeight -
    tableHeadHeight -
    tableMarginBottom -
    paginationHeight -
    // 100;
    // 30 - 25;
    30;
  // 550
  // console.log(pageMode === 1 ? 0 : 39);
  // console.log(aa);
  return aa;
}

// 2. 最大化分页
function getMaxHeight(props) {
  const { pageThis, self } = props;
  // 窗口高度
  const winHeight = window.innerHeight;
  // 表格头部按钮高度
  let tableBtnHeight = self.tableBtn ? self.tableBtn.offsetHeight : 0;
  // 表格表头高度
  let tableHeadHeight = self.tableHeader
    ? self.tableHeader.querySelector('.ant-table-thead').offsetHeight
    : 0;
  // 获取分页高度
  // let paginationHeight = pageThis.tableHeader
  //   ? pageThis.tableHeader.querySelector('.pagination').offsetHeight
  //   : 0;
  let refListHeight = getPageRef(pageThis.refList || []);
  let paginationHeight = self.tableHeader ? 44 : 0;
  let tableMarginBottom = 18;
  return (
    winHeight -
    tableBtnHeight -
    tableHeadHeight -
    paginationHeight -
    tableMarginBottom -
    refListHeight -
    100
  );
}

// 3. 弹窗分页
function getModalHeight(props) {
  return 0;
}

// 获取传递过来的ref高度
function getPageRef(refList = []) {
  return refList.reduce((sum, item) => {
    sum += item.offsetHeight || 0;
  }, 0);
}
