import React, { useEffect, useState } from 'react';
import {
  getOption,
  getSupplier,
  getTerminalType,
} from '@/services/common/index';

import { optionItem, optionType } from '@/pages/interface';

// 获取下拉框选型
export function useOption(
  params: (keyof optionType)[],
  callback?: (option: optionType) => void,
): [optionType, React.Dispatch<React.SetStateAction<optionType>>] {
  const [option, setOption] = useState<optionType>({});
  let data: optionType = {};

  // 因为这两个从通用接口里拆出来了
  useEffect(() => {
    if (params.includes('terminalType')) {
      getTerminalType({ isDelete: true })
        .then((res) => {
          if (res.statusCode === 200) {
            data = { ...data, terminalType: res.content.terminalType || [] };
          }
        })
        .finally(() => getData());
    }else{
      getData();
    }
  }, []);

  // 获取公用下拉框数据
  function getData() {
    let newParams = params.filter((item) => item !== 'terminalType');
    if (newParams.length > 0) {
      getOption({
        dictTypes: newParams,
      })
        .then((res) => {
          if (res.statusCode === 200) {
            data = { ...data, ...res.content };
          }
        })
        .finally(() => {
          setOption(data);
          callback && callback(data);
        });
    } else {
      callback && callback(data);
    }
  }
  
  return [option, setOption];
}
