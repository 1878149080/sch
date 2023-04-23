import { log } from '@/services/device/deviceManage';

// 查询条件
type conditionType = {
  [index: string]: (key: string, value: any) => [] | object[];
};

// 处理查询条件
export  function handleCondition(form: object, searchConfig: conditionType) {
  let conditions: object[] = [];
  
  for (let [key, value] of Object.entries(form)) {
    if (value || value === 0 || value === false) {
      let configItem: any[] = searchConfig[key] ? searchConfig[key](key, value) : [];
      conditions = conditions.concat(configItem);
    }
  }
  
  return conditions;
}


// interface
export {
  conditionType
}
