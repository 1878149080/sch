import React from "react";
import { connect } from "umi";
import List from "./list";
import Search from "./search";
import LeftOrganization from "../../../component/Layout/leftOrganization";
import "./index.less";
import { setBuryingPoint } from "@/utils/log/request";

/*
 * 用户管理
 * @申帅飞
 * @吴昊
 * */
class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // visible: false,
      // confirmLoading: false,
      modalsList: null,
      selectedRowKeys: [],
      selectedRows: [],
      orgId: localStorage.getItem('tsvcloud_orgId') || '-1',
      treeData: [],
      select: [],
    };
  }

  componentDidMount() {
    setBuryingPoint('用户管理');
    this.getRole();
    localStorage.getItem('tsvcloud_orgId');
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'user/clearState',
    });
  }

  // 通用 effects
  commonHandle(obj) {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/commonHandle',
      payload: obj,
    });
  }

  // 获取角色
  getRole() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/role',
    });
  }

  // 刷新页面请求
  getPage = (data) => {
    const {
      dispatch,
      user: { queryPager: queryPagers },
    } = this.props;
    const { orgId } = this.state;
    let orgIds = Number(orgId);
    if (data) {
      dispatch({
        type: 'user/getPage',
        payload: {
          queryPager: data,
        },
      });
    } else {
      let conditions = [
        {
          fieldName: 'orgId',
          dataType: 'Int',
          value: orgIds,
          conditionType: 'in',
          type: 'and',
        },
      ];
      let queryPager = Object.assign({}, queryPagers);
      queryPager.conditions = conditions;
      queryPager.recordCount = 0;
      dispatch({
        type: 'user/getPage',
        payload: {
          queryPager: queryPager,
        },
      });
    }
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

  // // 排序
  // columnSorter = (columnObj, order) => {
  //   // 'ascend' 'descend'
  //   let keys = '';
  //   let orderBy = columnObj.order === 'ascend';
  //   let columnKey = columnObj.columnKey;
  //
  //   if (columnKey === 'realName') {
  //     keys = 'T1.real_name';
  //   } else {
  //     return [
  //       {
  //         isAsc: false,
  //         fieldName: 'T1.real_name',
  //       },
  //     ];
  //   }
  //
  //   return [
  //     {
  //       fieldName: keys,
  //       isAsc: orderBy,
  //     },
  //   ];
  // };

  // 选择组织机构后，更新右侧的用户
  onSelect(keys) {
    const {
      user: { queryPager: queryPagers },
    } = this.props;
    let queryPager = Object.assign({}, queryPagers);
    if (keys !== null) {
      queryPager.conditions = [
        {
          conditionType: 'in',
          dataType: 'Int',
          fieldName: 'orgId',
          type: 'and',
          value: keys,
        },
      ];
    } else {
      queryPager.conditions = [];
    }
    queryPager.pageIndex = 1;
    this.getPage(queryPager);
    this.setState({
      orgId: keys,
    });
  }

  render() {
    const self = this;
    const { dispatch, user } = this.props;
    const {
      queryPager: queryPagers,
      loading,
      list,
      pagination,
      spinLoad,
      role,
    } = user;
    const {
      modalsList,
      selectedRowKeys,
      selectedRows,
      treeData,
      orgId,
      select,
    } = this.state;

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
        // getCheckboxProps: (record) => ({
        //   // disabled: record.isSys === true,
        //   disabled: record.isSys,
        //   name: record.key
        // }),
        getCheckboxProps: (record) => {
          // console.log(!!record.isSys);
          return {
            disabled: !!record.isSys,
            // disabled: false
          };
        },
      },
      select,
      dispatch,
      clearTableSelect: this.clearTableSelect,
      modal: {
        spinLoad,
        role,
        orgId,
        orgTreeData: treeData,
      },
    };

    const searchProps = {
      refs: (node) => {
        self.search = node;
      },
      roleProps: role,
      onSearch(params) {
        // let orgIdField = queryPager.conditions.filter((item) => {
        //     return item.fieldName === "orgId";
        // });
        // let conditions = [...orgIdField];
        let orgIds = Number(orgId);
        let conditions = [
          {
            fieldName: 'orgId',
            dataType: 'Int',
            value: orgIds,
            conditionType: 'in',
            type: 'and',
          },
        ];
        if (params['roleId']) {
          let tem = {
            fieldName: 'roleId',
            dataType: 'Int',
            conditionType: 'in',
            type: 'and',
            value: params['roleId'],
          };
          conditions.push(tem);
        }
        if (params['realName']) {
          let tem = {
            fieldName: 'realName',
            dataType: 'String',
            conditionType: 'like',
            type: 'and',
            value: params['realName'],
          };
          conditions.push(tem);
        }
        let queryPager = Object.assign({}, queryPagers);
        queryPager.conditions = conditions;
        queryPager.pageIndex = 1;
        dispatch({
          type: 'user/getPage',
          payload: {
            queryPager,
          },
        });
        self.clearTableSelect();
      },
    };

    const leftProps = {
      onSelect: this.onSelect.bind(this),
      loadGetByPage: (orgId, treeData) => {
        let queryPager = Object.assign({}, queryPagers);
        queryPager.conditions = [
          {
            conditionType: 'in',
            dataType: 'Int',
            fieldName: 'orgId',
            type: 'and',
            value: orgId,
          },
        ];
        this.getPage(queryPager);
        this.setState({
          treeData,
        });
      },
    };

    return (
      <div id="user" className="user">
        <div className="leftRightBox">
          <div className="leftBox">
            <LeftOrganization {...leftProps} />
          </div>
          <div
            className="rightBox"
            style={{ width: 'calc(100% - 270px)', marginLeft: 10 }}
          >
            <Search {...searchProps} />
            <List {...listProps} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(index);
