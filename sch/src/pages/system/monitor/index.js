import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Form, Row, Spin } from "antd";
import "./index.less";
import JavaInfo from "@/pages/system/monitor/javaInfo";
import SeverInfo from "@/pages/system/monitor/serverInfo";
import UsageCard from "@/pages/system/monitor/usageCard";
import FileInfo from "@/pages/system/monitor/fileInfo";
import { getSystemInfo } from "@/pages/system/monitor/request";
import { setBuryingPoint } from "@/utils/log/request";
import Search from "./search";

/**
 * @desc 系统管理 -> 系统监控
 * **/ 
const monitorIndex = (props) => {
  const pRef = useRef({ time: -1 });
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [form] = Form.useForm();
  const host = Form.useWatch("host", form);
  let type = host?.split(",")[1] ?? "1";

  useEffect(() => {
    // 用户访问埋点
    setBuryingPoint('系统监控');
  }, []);

  useEffect(() => {
    // getByPage();
    clearTimeout(pRef.current.time);
    return () => {
      clearTimeout(pRef.current.time);
    };
  }, [host]);

  const getByPage = () => {
    getSystemInfo({
      params: form.getFieldsValue(),
      setInfo,
      setLoading,
      callback: () => {
        clearTimeout(pRef.current.time);
        pRef.current.time = setTimeout(() => {
          getByPage();
        }, 1000 * 10);
      },
    });
  };

  // 手动刷新
  const handleRefresh = () => {
    clearTimeout(pRef.current.time);
    setLoading(true);
    getByPage();
  };

  const searchProps = {
    form,
    setLoading,
    onSearch: () => {
      getByPage();
    },
  };


  return (
    <div className="monitor-index">
      <Spin tip="正在加载中..." spinning={loading}>
        <Search {...searchProps} />
        <Row gutter={10}>
          <Col span={8}>
            <Card
              size="small"
              title="CPU使用率(监测10秒)"
              extra={<a onClick={handleRefresh}>刷新</a>}
            >
              <UsageCard type={1} id={'monitor-chart1'} data={info} />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              size="small"
              title="内存使用率(监测10秒)"
              extra={<a onClick={handleRefresh}>刷新</a>}
            >
              <UsageCard type={2} id={'monitor-chart2'} data={info} />
            </Card>
          </Col>
          <Col span={8}>
            {/* {type === "1" ? (
              <Card
                size="small"
                title="JVM使用率(监测10秒)"
                extra={<a onClick={handleRefresh}>刷新</a>}
              >
                <UsageCard type={3} id={'monitor-chart3'} data={info} />
              </Card>
            ) : (
            )} */}
              <Card
                size="small"
                title="磁盘使用率(监测10秒)"
                extra={<a onClick={handleRefresh}>刷新</a>}
              >
                <UsageCard type={4} id={'monitor-chart4'} data={info} />
              </Card>
          </Col>
        </Row>

        <Row gutter={10} style={{ marginTop: 10 }} className="monitor-card2">
          <Col span={12}>
            <Card size="small" title="JAVA虚拟机信息">
              <JavaInfo {...info} />
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small" title="服务器信息">
              <SeverInfo {...info} />
            </Card>
          </Col>
        </Row>

        <Row gutter={10} style={{ marginTop: 10 }} className="monitor-card3">
          <Col span={24}>
            <Card size="small" title="磁盘信息">
              <FileInfo {...info} />
            </Card>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};
export default monitorIndex;
