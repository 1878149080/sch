import React from "react";
import PropTypes from "prop-types";
import { connect } from "umi";

/**
 * 首页 - 数据地图
 * @吴昊
 */
class Welcome extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  // componentDidMount() {
  //   this.defaultSearch();
  // }

  // componentWillUnmount() {
  //   this.props.dispatch({
  //     type: "Welcome/clearState",
  //   });
  // }

  // 通用 effects
  // commonHandle(obj) {
  //   this.props.dispatch({
  //     type: "Welcome/commonHandle",
  //     payload: obj,
  //   });
  // }

  // 首次加载，默认查询
  defaultSearch() {
    this.props.dispatch({
      type: 'Welcome/getSystemTree',
    });
  }

  // 如果有子级，则进行数据组装
  isChildSetData = (data = []) => {
    return data.reduce((newArr, item) => {
      if (item.children) {
        item.children = this.isChildSetData(item.children);
        newArr.push(...item.children);
      } else {
        newArr.push(item);
      }
      return newArr;
    }, []);
  };

  render() {
    // const { Welcome } = this.props;
    // const { loading, treeData } = Welcome;
    //
    // // 树结构的props
    // const threeChartsProps = {
    //   treeData,
    //   loading,
    //   // 图表点击事件，更换表格的数据源
    //   handleClick: (params) => {
    //     let tem = params.data.children;
    //     let treeTable = this.isChildSetData(params.data.children);
    //     this.commonHandle({
    //       treeTable: tem ? treeTable : [params.data],
    //     });
    //   },
    // };

    return <div className="welcome"></div>;
  }
}

Welcome.propTypes = {
  dispatch: PropTypes.func,
};

function mapStateToProps({ Welcome }) {
  return { Welcome };
}

export default connect(mapStateToProps)(Welcome);
