import { redTag } from './color';

/**
 * @desc 排名颜色
 *
 * 排名颜色：
 * 排名数据少时遵循：如果最高排名是3 那就是 1绿色 2 黄色 3 红色，如果最高排名2 那就没有红色 排名最高 1那就没有 黄 红
 * 排名颜色也应该是721原则分本档，10% ，是红的，70%黄的，20%是绿的，排名分三档
 * */
export function dataRanking(list = [], maxNum: number) {
  if (list.length > 0) {

    if (maxNum === 1) {
      // 只有1条数据
      list.map((item: any) => {
        item.color = redTag.text;
        item.backColor = redTag.bg;
        return item;
      });
    } else if (maxNum === 2) {
      // 只有2条数据
      list.map((item: any) => {
        if (item.ranking === 1) {
          item.color = '#D6252D';
          item.backColor = '#F5DCDD';
        } else {
          item.color = '#F2AD34';
          item.backColor = '#FFFBEB';
        }
        return item;
      });

    } else if (maxNum === 3) {
      // 只有3条数据
      list.map((item: any) => {
        if (item.ranking === 1) {
          item.color = '#D6252D';
          item.backColor = '#F5DCDD';
        } else if (item.ranking === 2) {
          item.color = '#F2AD34';
          item.backColor = '#FFFBEB';
        } else {
          item.color = '#2FC62F';
          item.backColor = '#e8f9e8';
        }
        return item;
      });
    } else {
      // 数据在3条以上时
      sumDataColor(list, maxNum);
    }
  }
}

// 3条数据以上时
function sumDataColor(list = [], maxNum: number) {
  let one = Math.ceil(maxNum * 0.1);
  let two = Math.ceil(maxNum * 0.3);
  return list.map((item: any) => {
    if (item.ranking <= one) {
      item.color = '#D6252D';
      item.backColor = '#F5DCDD';
    } else if (one < item.ranking && item.ranking <= two) {
      item.color = '#F2AD34';
      item.backColor = '#FFFBEB';
    } else {
      item.color = '#2FC62F';
      item.backColor = '#e8f9e8';
    }
    return item;
  });
}
