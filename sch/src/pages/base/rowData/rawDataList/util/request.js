import { getRecursionByParentId } from '@/services/System/permissions/organization';
import { getLineCarTreeData } from '@/services/common';

// 获取组织机构到车队
export function getOrgData(props) {
  const { setOrgOption, params = {}, form, callback } = props;
  let option = [];
  getRecursionByParentId(params)
    .then((data) => {
      if (data.statusCode === 200) {
        const list = data.content || [];
        // 机构类别: 1.公交集团;2.场站公司;3.子集团;4.分公司;5.车队;6.外协单位;7.职能管理部门
        option = eachOrg(list);
      }
    })
    .catch((e) => console.error(e))
    .finally(() => {
      setOrgOption(option);
      if (option.length > 0 && form) {
        form.setFieldsValue({
          fleet: option[0].value,
        });
        callback && callback(option[0].value);
      }
    });
}

// 遍历组织机构
export function eachOrg(list = []) {
  return list.map((item) => {
    const { orgType } = item;
    let param = {
      title: item.orgNameCn,
      value: item.orgId,
      // value: item.orgCode +(orgType === 5 ? ",5" : ""),
    };
    if (item.children !== null && item.children.length > 0) {
      item.children = eachOrg(item.children);
      param.children = item.children;
    }
    return param;
  });
}

// 获取车队下的线路和车辆
// 注释
export function getLineCarTree(props) {
  const { setLineOption, params = {}, form, isSearch } = props;
  let option = [];
  // let busTreeData = [];
  let busValue = 1;
  let lineValue = '';
  let lineCode = '';
  let carType = -1;
  getLineCarTreeData(params)
    .then((data) => {
      if (data.statusCode === 200) {
        option = data.content.map((item, index) => {
          item.title = item.lineName;
          item.value = item.lineName;
          item.selectable = false;
          if (item.child) {
            item.children = getTreeLineData(
              item.child,
              item.lineName,
              item.lineCode,
            );
            // 进行默认值控制
            if (busValue === 1 && lineValue === '' && item.child.length > 0) {
              lineValue = item.lineName;
              lineCode = item.lineCode;
              busValue = item.child[0].plateNumber;
              carType = item.child[0].energyType;
              form.setFieldsValue({
                plateNumber: lineValue + "," + lineCode + "," +busValue,
              });
            }
          }
          return item;
        });
      }
    })
    .catch((e) => console.error(e))
    .finally(() => {
      setLineOption(option);
      isSearch && form?.submit();
    });
}

// 递归获取线路下的车辆
function getTreeLineData(arrList, lineName, lineCode) {
  arrList.map((item) => {
    const { plateNumber } = item;
    item.title = item.plateNumber;
    item.value = lineName + ',' + lineCode + ',' + plateNumber;
    // item.type = item.energyType;
    item.lineName = lineName;
    item.lineCode = lineCode;
    if (item.child) {
      item.children = getTreeLineData(item.child, lineName, lineCode);
    }
    return item;
  });
  return arrList;
}
