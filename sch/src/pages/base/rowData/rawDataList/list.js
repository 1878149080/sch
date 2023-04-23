import React from "react";
import {Table} from "antd";

/**
 * @desc 表格组件
 * @class list
 * @author 吴昊 2020/4/9
 */
class list extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      // tableBtnRefs,
      tableHeight,
      columns,
      loading,
      dataSource,
      pagination,
      onChange,
      selects,
      // handleExportCsv
    } = this.props;
    const columnsChange = (list = [], selects) => {
      let columns = [];
      list?.forEach((item) => {
        if (item.title.props) {
          let tem = selects.filter((items) => {
            return item.title.props.children === items;
          });
          if (tem.length > 0) {
            columns.push(item);
          }
        } else {
          let tem = selects.filter((items) => {
            return item.title === items;
          });
          if (tem.length > 0) {
            columns.push(item);
          }
        }
      });
      return columns;
    };
    return (
      <div className="tableListBox">
        {/* <div className="list-btnGroup" ref={tableBtnRefs}> */}
        {/*  <Button */}
        {/*    type="primary" */}
        {/*    style={{marginRight: "10px"}} */}
        {/*    icon="download" */}
        {/*    onClick={handleExportCsv} */}
        {/*    size={"small"}> */}
        {/*    csv下载 */}
        {/*  </Button> */}
        {/* </div> */}

        <Table
          loading={loading}
          columns={columnsChange(columns, selects)}
          dataSource={dataSource}
          bordered
          size="small"
          pagination={pagination}
          onChange={onChange}
          style={{
            background: '#fff',
            // height: tableHeight - 22 - 10 - 40
          }}
          scroll={{
            // x: "max-content",
            x: '160%',
            y: 'calc(100vh - 290px)'
          }}
        />
      </div>

    );
  }
}

export default list;
