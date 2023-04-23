// 处理返回结果
import { httpErrFilter } from '@/utils/dictionaries';
import { message } from 'antd';

export function handleData(props: any) {
  const { data, pagination, setPagination, keyName, eachFunc, setList } = props;

  let list = [];
  if (data?.statusCode === 200) {
    let queryPager = data.content.queryPager;

    pagination.total = queryPager.recordCount;
    pagination.current = queryPager.pageIndex;
    pagination.pageSize = queryPager.pageSize;
    const { result, recordSet } = data.content || {};

    list = (result ?? recordSet ?? []).map((item: any) => {
      if (eachFunc) {
        return eachFunc(item);
      } else {
        item.key = keyName ? item[keyName] : item.id;
      }
      return item;
    });
  } else if (httpErrFilter.indexOf(data?.statusCode) === -1) {
    message.error(data?.message || '接口发生错误!');
    pagination.current = 1;
    pagination.total = 0;
  }

  setPagination(pagination);
  setList(list);
}
