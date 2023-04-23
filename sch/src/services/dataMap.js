import { request } from "../utils/request";
import Config from "@/utils/config";

/**
 * 数据地图
 * @吴昊
 * */

// 获取所有菜单及其分支
export async function getAllMenuAndBranch(params) {
  return request(
    Config.tomcatUrl + '/vehicle/dailydatacollection/getAllMenuAndBranch',
    {
      data: params,
    },
  );
}

// 趋势图 - 获取字段下拉
export async function getAllFieldName(params) {
  return request(
    Config.tomcatUrl + '/vehicle/dailydatamonitor/getAllFieldName',
    {
      data: params,
    },
  );
}

// 趋势图 - 获取异常类型
export async function getAllmonitorType(params) {
  return request(
    Config.tomcatUrl + '/vehicle/dailydatamonitor/getAllmonitorType',
    {
      data: params,
    },
  );
}

// 趋势图 - 获取趋势图数据
export async function getByTableNameAndFieldName(params) {
  return request(
    Config.tomcatUrl + '/vehicle/dailydatamonitor/getByTableNameAndFieldName',
    {
      data: params,
    },
  );
}

// 获取所有菜单及其分支 - 用于首页展示，和记录登录日志
export async function getAllMenuAndBranch2(params) {
  return request(
    Config.tomcatUrl + '/vehicle/dailydatacollection/getAllMenuAndBranch2',
    {
      data: params,
    },
  );
}
