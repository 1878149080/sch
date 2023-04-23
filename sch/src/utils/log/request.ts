// import { message } from 'antd';
// @ts-ignore
import { insertMenuLog } from '@/services/app';

/**
 * @desc 用户访问菜单埋点
 * **/
export function setBuryingPoint(menuName = '') {
  insertMenuLog({
    moduleName: '',
    menuName,
  })
    .then((data: any) => {
      if (data.statusCode === 200) {
      } else {
        // message.error(data.message);
        console.error('用户访问菜单埋点接口报错。');
      }
    })
    .catch((e: any) => console.error(e))
    .finally(() => {});
}
