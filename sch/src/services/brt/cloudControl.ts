import { request } from "@/utils/request";
import Config from "@/utils/config";


// 站点和道路轨迹
export async function getTrackAndStation(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/websocket/line/station/gps', {
    data: params,
  });
}

// 获取超速区域和限速轨迹
export async function getRegion(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/websocket/speed/lane/park', {
    data: params,
  });
}

// 获取离线车辆位置
export async function getCarPosition(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/websocket/getCarOnlineGps', {
    data: params,
  });
}

// 获取所有的车
export async function getCar(params: any) {
  return request(Config.tomcatUrl + '/tsvcloud/api/websocket/getCarLineUpDown', {
    data: params,
  });
}

export const socketURL = Config.webSocket + '/tsvcloud/ws/brt/pushMessage';

