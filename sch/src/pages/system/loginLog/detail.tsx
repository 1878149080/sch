import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "antd";
import { certDetail } from "@/services/serverCertificationManage";
import Table from "@/component/tables/index";
import getColumns from "./detailColumns";
import dayjs from "dayjs";
// const Option = Select.Option;
// const { confirm } = Modal;
// const { Search } = Input;
// const {TextArea} = Input;

const Register: React.FC<any> = (props) => {
  const { row } = props;
  const { visible, title, onOk, onCancel } = props.modal;
  const [form] = Form.useForm();
  const [data, setData] = useState<{
    cert: { [index: string]: any };
    list: any[];
  }>({ cert: {}, list: [] });
  useEffect(() => {
    certDetail({ id: row.certId }).then((res) => {
      if (res.statusCode === 200) {
        setData(res.content);
      }
    });
  }, []);

  const register = () => {};
  const tableProps = {
    table: {
      source: [],
      loading: false,
      columns: getColumns({}),
    },
  };

  return (
    <Modal
      open={true}
      title={title}
      centered
      width={500}
      // onOk={() => {
      //   register();
      //   // onOk(form.getFieldsValue());
      // }}
      footer={
        <Button onClick={onOk} type="primary">
          关闭
        </Button>
      }
      onCancel={onCancel}
      destroyOnClose={true}
    >
      <div className="serve-detail-container" style={{ padding: '0 20px' }}>
        <p>
          <span>数字证书:</span>
          <span>{data.cert.certName ?? '--'}</span>
        </p>
        <p className="region">
          <div>
            <span>国家:</span>
            <span>{data.cert.c ?? '--'}</span>
          </div>
          <div>
            <span>省份:</span>
            <span>{data.cert.st ?? '--'}</span>
          </div>
          <div>
            <span>城市:</span>
            <span>{data.cert.l ?? '--'}</span>
          </div>
        </p>
        <p>
          <span>公司:</span>
          <span>{data.cert.ou ?? '--'}</span>
        </p>
        <p>
          <span>签发机构:</span>
          <span>{data.cert.o ?? '--'}</span>
        </p>
        <p>
          <span>证书名称:</span>
          <span>{data.cert.certName ?? '--'}</span>
        </p>
        <p>
          <span>有效期:</span>
          <span>
            {data.cert.validTime
              ? dayjs(data.cert.validTime).format('YYYY-MM-DD')
              : '--'}
          </span>
          <span className="interval">至</span>
          <span>
            {data.cert.invalidTime
              ? dayjs(data.cert.invalidTime).format('YYYY-MM-DD')
              : '--'}
          </span>
          {/* <span className="day">{data.cert.validDays ?? "--"}天</span> */}
        </p>

        <Table {...tableProps}></Table>
      </div>
    </Modal>
  );
};

export default Register;
