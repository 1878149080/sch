import { request } from "@/utils/request";
import Config from "@/utils/config";

// 待办分页
export async function getByPageToDo(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/ota/agencyList', {
    // return request(Config.tomcatUrl + '/tsvcloud/api/ota/doingList', {
    data: params,
  });
}

// 已办分页
export async function getByPageComplete(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/ota/doneList', {
    data: params,
  });
}

//
// // 任务节点
// export async function getNodeState(params: any) {
//   return request('/tsvcloud/api/ota/doneList', {
//     data: params,
//   });
// }
//
// // 流程状态
// export async function getProState(params: any) {
//   return request('/tsvcloud/api/ota/doneList', {
//     data: params,
//   });
// }
//
// // 获OTA类型
// export async function getOtaType(params: any) {
//   return request('/tsvcloud/api/ota/doneList', {
//     data: params,
//   });
// }
