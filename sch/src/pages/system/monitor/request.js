import { getByPage1, getByPage2 } from "@/services/System/monitor";
import { message } from "antd";

// 获取系统监控数据
export function getSystemInfo(props) {
  const { setInfo, setLoading, callback, params = {} } = props;
  let option = {};
  let type = params.host.split(",")[1];
  // if(type === "1") {
  //   getByPage1()
  //     .then((data) => {
  //       console.log(data);
  //       if (data.statusCode === 200) {
  //         option = data?.content || {};
  //       } else {
  //         message.error(data.message);
  //       }
  //     })
  //     // .catch((e) => console.error(e))
  //     .finally(() => {
  //       setInfo(option);
  //       setLoading(false);
  //       callback && callback();
  //     });
  // }else{
  // }
  getByPage2({host: params.host.split(",")[0]})
    .then((data) => {
      console.log(data);
      if (data.statusCode === 200) {
        option = data?.content || {};
      } else {
        message.error(data.message);
      }
    })
    // .catch((e) => console.error(e))
    .finally(() => {
      setInfo(option);
      setLoading(false);
      callback && callback();
    });
  // setLoading(true);
}
