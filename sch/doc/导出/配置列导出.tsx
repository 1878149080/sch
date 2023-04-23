import React from 'react';
import { getRoleBarBtn } from '@/utils/logo/roleBtn';
import { downExcel } from '@/services/brt/speedCloud/dynamicSpeedLimit';
import ExportExcel from '@/pages/component/exportExcel/exportExcel';

/***
 * @desc 一级菜单 -> 二级菜单 -> 列表页
 * */
class List extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      exportExcel: false,
    };
  }

  // 导出报表
  downLoadFileExcel = () => {
    this.setState({
      exportExcel: true,
    });
  };

  // 获取表格工具栏操作按钮
  getTableBarRoleBtn = () => {
    const { table }: any = this.props;
    let btnList = [
      {
        name: '导出报表',
        // role: 'device_fact_export',
        icon: <span className="iconfont icon-daochu" />,
        disabled: table?.dataSource?.length === 0,
        handle: this.downLoadFileExcel,
      },
    ];
    return getRoleBarBtn(btnList);
  };

  render() {
    const { queryPager }: any = this.props;
    const { columns, exportExcel }: any = this.state;

    // 表格工具栏的props
    const toolbarProps = {
      btnList: this.getTableBarRoleBtn(),
    };

    // 表格组件
    const dataListProps = {};

    // 导出列的props
    const exportProps = {
      list: columns.filter(
        (item: any) => item.title !== '操作' && item.title !== '序号',
      ),
      handleOk: (props: any) => {
        const { newCol, setLoading } = props;
        downExcel({
          param: encodeURIComponent(
            JSON.stringify({
              queryPager,
            }),
          ),
          fields: newCol,
          fileName: '1111.xlsx',
          callback: () => {
            exportProps.handleCancel();
            setLoading(false);
          },
        });
      },
      handleCancel: () => {
        this.setState({
          exportExcel: false,
        });
      },
    };

    return (
      <div className="clear-tableBox">
        {exportExcel && <ExportExcel {...exportProps} />}
      </div>
    );
  }
}

export default List;
