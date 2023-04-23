/**
 * @desc 这里定义多个颜色
 * @author 吴昊 2020/3/11
 */

const colorList = [
  '#64ea91',
  '#CCCC66',
  '#8fc9fb',
  '#d897eb',
  '#f69899',
  '#114861',
  '#FF6666',
  '#e31b9a',
  '#006633',
  '#CC0000',
  '#0099FF',
  '#CC0099',
  '#00CC66',
  '#993333',
  '#333366',
  '#33CC00',
  '#33CCFF',
  '#FF0033',
  '#FF9900',
  '#000000',
];
const colorLists = [
  '#a1e5b8',
  '#c8c8a1',
  '#c1e0fb',
  '#e0bceb',
  '#f3c8c9',
  '#6ea8c3',
  '#facdcd',
  '#99778d',
  '#8dedbd',
  '#dc8d8d',
  '#8fc3e5',
  '#ca8fbb',
  '#84d3ab',
  '#e7a8a8',
  '#afaff3',
  '#acd69e',
  '#afdceb',
  '#f3b1be',
  '#e8d1b0',
  '#4c4242',
];

/**
 * @method randomColors
 * @return {String} color
 */
function randomColors() {
  let colorPre = '#';
  let color = '';
  while (color.length < 7) {
    color = colorPre + Math.floor(Math.random() * 16777215).toString(16);
  }
  return color;
}

/**
 * @method randomColorsBus
 * * @param {number} indexs
 * @return {String} color
 */
function randomColorsBus(indexs) {
  if (indexs < 19) {
    return colorList[indexs];
  } else {
    return randomColors();
  }
}

function shouYeColors(indexs) {
  if (indexs < 19) {
    return colorLists[indexs];
  } else {
    return randomColors();
  }
}

export { colorLists, colorList, randomColors, randomColorsBus, shouYeColors };
