import React from "react";
import { connect } from "umi";
import List from "./list";
import Search from "./search";
import { setBuryingPoint } from "@/utils/log/request";
import "./index.less";

/**
 * 角色管理
 * @申帅飞
 * @吴昊
 * */
class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      selectedRows: [],
      select: [],
      // 表格高度
      tableHeight: 0,
    };
  }

  componentDidMount() {
    setBuryingPoint('角色管理');
    this.getPage();
    this.getPermission();
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'roleUser/clearState',
    });
  }

  // 通用 effects
  commonHandle(obj) {
    const { dispatch } = this.props;
    dispatch({
      type: 'roleUser/commonHandle',
      payload: obj,
    });
  }

  // 获取数据信息
  getPage = (queryPager) => {
    const { dispatch, roleUser } = this.props;
    dispatch({
      type: 'roleUser/getPage',
      payload: {
        queryPager: queryPager ? queryPager : roleUser.queryPager,
      },
    });
  };

  // 获取权限的树形数据
  getPermission = (queryPager) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'roleUser/getPermission',
      payload: {
        userId: localStorage.getItem('tsvcloud_userId'),
      },
    });
  };

  // 表格多选控制
  onSelectChange = (selectedRowKeys, selectedRows) => {
    const { select } = this.state;
    let ids = [];
    if (Object(selectedRows).length > 0) {
      select.push(selectedRows);
      this.setState({
        select,
      });
    } else if (Object(selectedRows).length === 0) {
      for (let i = 0; i < select.length; i++) {
        for (let j = 0; j < selectedRowKeys.length; j++) {
          if (select[i][0].key.indexOf(selectedRowKeys[j]) > -1) {
            ids.push(select[i]);
          }
        }
      }
      this.setState({
        select: ids,
      });
    }
    this.setState({
      selectedRowKeys,
      selectedRows,
    });
  };
  // 清空表格选择
  clearTableSelect = () => {
    this.setState({
      selectedRowKeys: [],
      selectedRows: [],
      select: [],
    });
  };

  render() {
    const self = this;
    const { dispatch, roleUser } = this.props;
    const {
      pagination,
      list,
      loading,
      queryPager: queryPagers,
      permission,
      rootMenus,
      rootMap,
    } = roleUser;
    const { selectedRowKeys, selectedRows, select } = this.state;

    const listProps = {
      preSelf: self,
      tableBtnRefs: (node) => {
        self.tableBtn = node;
      },
      tableHeaderRefs: (node) => {
        this.tableHeader = node;
      },
      getPageThis: () => {
        return this;
      },
      getPage: this.getPage,
      queryPager: queryPagers,
      selectedRows,
      table: {
        loading,
        dataSource: list,
      },
      pagination,
      rowSelection: {
        selectedRowKeys,
        onChange: this.onSelectChange,
        getCheckboxProps: (record) => ({
          disabled: record.isSys === true,
        }),
      },
      select,
      dispatch,
      clearTableSelect: this.clearTableSelect,
      rootMap,
      modalParam: {
        permission,
        rootMenus,
      },
    };

    // 查询条件的props
    const searchProps = {
      refs: (node) => {
        self.search = node;
      },
      onSearch(params) {
        let conditions = [];
        // 角色名称
        if (params['name']) {
          conditions.push({
            type: 'and',
            fieldName: 'name',
            dataType: 'String',
            conditionType: 'like',
            value: params['name'],
          });
        }
        let queryPager = Object.assign({}, queryPagers);
        queryPager.conditions = conditions;
        queryPager.pageIndex = 1;
        dispatch({
          type: 'roleUser/getPage',
          payload: {
            queryPager,
          },
        });
        self.clearTableSelect();
      },
    };

    return (
      <div id="role" className="content-box-bg">
        <Search {...searchProps} />
        <List {...listProps} />
      </div>
    );
  }
}

function mapStateToProps({ roleUser }) {
  return { roleUser };
}

export default connect(mapStateToProps)(index);
