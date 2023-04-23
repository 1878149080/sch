import {
  getRolePermission,
  getTerminalSupplierAll,
  updateRolePermission,
} from '../../../../../services/System/permissions/role';
import { getOrgAll } from '../../../../../services/System/permissions/organization';
import { message } from 'antd';
// 获取所有的组织机构
export function getOrgAllData(props) {
  const { setOrg, params = {} } = props;
  // setLoading(true);
  let list = [];
  getOrgAll(params)
    .then((data) => {
      if (data.statusCode === 200) {
        list = data.content?.map((item) => {
          return {
            label: item.orgNameCn,
            value: item.orgCode,
            title: item.orgNameCn,
            key: item.orgCode,
            children: eachOrg(item.children),
          };
        });
      }
    })
    .catch((e) => console.error(e))
    .finally(() => {
      setOrg(list);
      // setLoading(false);
    });
}
function eachOrg(list = []) {
  return list.map((item) => {
    if (item.children) {
      item.children = eachOrg(item.children);
    } else {
      item.children = [];
    }
    return {
      label: item.orgNameCn,
      value: item.orgCode,
      title: item.orgNameCn,
      key: item.orgCode,
      children: item.children,
    };
  });
}

// 获取所有的厂商
export function getManufacturer(props) {
  const { setLoading, setManufacturer, params = {} } = props;
  // setLoading(true);
  let list = [];
  getTerminalSupplierAll(params)
    .then((data) => {
      if (data.statusCode === 200) {
        list = data.content?.map((item) => {
          return {
            label: item.supplierName,
            value: item.supplierId,
            title: item.supplierName,
            key: item.supplierId,
          };
        });
      }
    })
    .catch((e) => console.error(e))
    .finally(() => {
      setManufacturer(list);
      // setLoading(false);
    });
}

// 获取角色的数据权限
export function getInfo(props) {
  const {
    setLoading,
    params,
    setShowTreeOrg,
    setShowTreeMan,
    setManCheck,
    setOrgCheck,
    form,
  } = props;
  setLoading(true);
  getRolePermission(params)
    .then((data) => {
      if (data.statusCode === 200) {
        let org = { orgCodes_perValue: 1, orgCodes: [] };
        let supp = { supplierIds_perValue: 1, supplierIds: [] };
        data.content?.forEach((item) => {
          const { perValue, perType, orgCodes, supplierIds } = item;
          if (perType === 0) {
            org.orgCodes_perValue = perValue || 1;
            org.orgCodes = orgCodes ?? [];
            if (perValue === 5) {
              setShowTreeOrg(true);
              setOrgCheck(orgCodes ?? []);
            }
          } else if (perType === 1) {
            supp.supplierIds_perValue = perValue || 1;
            supp.supplierIds = supplierIds ?? [];
            if (perValue === 5) {
              setShowTreeMan(true);
              setManCheck(supplierIds ?? []);
            }
          }
        });
        form.setFieldsValue({
          ...org,
          ...supp,
        });
      }
    })
    .catch((e) => console.error(e))
    .finally(() => {
      setLoading(false);
    });
}

// 修改角色的数据权限
export function saveInfo(props) {
  const { setLoading, handleOk, params = {} } = props;
  setLoading(true);
  updateRolePermission(params)
    .then((data) => {
      if (data.statusCode === 200) {
        message.success('保存成功');
        handleOk && handleOk();
      }
    })
    .catch((e) => console.error(e))
    .finally(() => {
      setLoading(false);
    });
}

// 组装后台需要的参数
export function getSaveParams(record, roleId) {
  const { orgCodes_perValue, orgCodes, supplierIds_perValue, supplierIds } =
    record;
  const result = [
    {
      roleId,
      perType: 0,
      perValue: orgCodes_perValue,
      orgCodes: orgCodes_perValue === 5 ? keepParent(orgCodes) : [],
      // orgCodes: orgCodes_perValue === 5 ? orgCodes : [],
    },
    {
      roleId,
      perType: 1,
      perValue: supplierIds_perValue,
      supplierIds: supplierIds_perValue === 5 ? supplierIds : [],
    },
  ];
  console.log(result);
  return result;
}

function keepParent(arr = []) {
  let tem = [];
  // let arr = [
  //   "001005001",
  //   "001005002",
  //   "001005",
  //   "001005003",
  //   "001005004",
  //   "001009004",
  //   "001008004",
  //   "001008014",
  //   "001",
  // ];
  arr.sort((a, b) => a - b);
  // console.log("排序后", arr);
  arr.forEach((item, index) => {
    if (index === 0) {
      tem.push(item);
    } else {
      tem.forEach((tItem) => {
        if (tem.indexOf(item) === -1 && !item.startsWith(tItem)) {
          tem.push(item);
        }
      });
    }
  });
  // console.log(tem);
  return tem;
}
