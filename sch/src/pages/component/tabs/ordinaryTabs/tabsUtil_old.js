// 根据ref，获取宽度
function getRefWidth(ref = null) {
  let width = 0;
  if (ref?.current) {
    width = ref.current.offsetWidth;
  }
  // console.log('根据ref，获取宽度', width);
  return width;
}

// 获取所有标签页的宽度
function getTabWidthAll(titleRef) {
  let sumWidth = 0;
  titleRef?.current?.childNodes.forEach((item) => {
    sumWidth = sumWidth + item.offsetWidth;
  });
  return sumWidth;
}

// 计算标签页可用宽度
export function getTabScrollWidth(props) {
  const { tabRootRef, btnRef, scrollBtnRef } = props;
  // 1. 获取操作按钮的宽度
  const btnGroup = getRefWidth(btnRef);
  // 2. 获取滚动按钮的宽度
  const scrollWidth = getRefWidth(scrollBtnRef);
  // 3. 获取根元素的总宽度
  const rootWidth = getRefWidth(tabRootRef);
  // 4. 获取所有标签页的宽度
  const tabWidthAll = getTabWidthAll(scrollBtnRef);

  if (scrollWidth === 0) {
    if (rootWidth - 59 - btnGroup - 1 <= tabWidthAll) {
      const tem = rootWidth - 59 - scrollWidth - 1;
      // console.log('计算标签页可用宽度', tem);
      return {
        tabWidth: tem,
        visible: true,
      };
    }
  } else if (scrollWidth > 0) {
    if (rootWidth - scrollWidth - btnGroup - 1 <= tabWidthAll) {
      const tem = rootWidth - 59 - scrollWidth - 1;
      // console.log('计算标签页可用宽度', tem);
      return {
        tabWidth: tem,
        visible: true,
      };
    }
  }
  const tem = rootWidth - btnGroup - scrollWidth - 1;
  // console.log('计算标签页可用宽度', tem);
  return {
    tabWidth: tem,
    visible: false,
  };
}

/**
 * @desc 获取可是区域内的元素
 * @param {Object} titleRef 标签页的父级，用于获取子级全部的标签页
 * @param {number} tabWidth 整个标签页的宽度
 * @param {number} tabOffsetLeft 标签页偏移量
 */
export function getViewDom(titleRef, tabWidth, tabOffsetLeft = 0) {
  let viewList = [];
  let newLeft = 1;
  // 1. 获取所有的标签页
  // console.log(titleRef);
  let domWidth = 0;
  titleRef?.childNodes.forEach((item) => {
    domWidth = domWidth + item.offsetWidth;
    // 1.1 根据公示，判断在可视区域内的元素  offsetLeft offsetWidth
    const sumLeft = item.offsetLeft + tabOffsetLeft;
    const sumLeftWidth = item.offsetLeft + item.offsetWidth + tabOffsetLeft;
    // const isVisible = sumLeft <= tabWidth && sumLeft >= 0;
    const isVisible = sumLeft < tabWidth && sumLeft >= 0;
    const isVisible2 = sumLeftWidth < tabWidth && sumLeftWidth > 0;
    if (isVisible || isVisible2) {
      viewList.push(item);
    }
  });

  // 1. 如果是删除，并且可视区域内剩余空间富余
  const lastDom = !!viewList[viewList.length - 1]?.nextSibling;
  const firstDom = !!viewList[0]?.previousSibling;
  // 2. 可视元素内的最后一个没有下一个，并且可视元素第一个之前还有元素； 可视元素宽度，小于可视宽度
  if (domWidth < tabWidth && lastDom === false && firstDom) {
    // 3. 按照最后一个重新定位，并重新获取可视元素；
    const newTabLeft = tabWidth - domWidth;
    viewList = [];
    newLeft = -newTabLeft;
    titleRef?.childNodes.forEach((item) => {
      domWidth = domWidth + item.offsetWidth;
      // 1.1 根据公示，判断在可视区域内的元素  offsetLeft offsetWidth
      const sumLeft = item.offsetLeft + newTabLeft;
      const sumLeftWidth = item.offsetLeft + item.offsetWidth + newTabLeft;
      const isVisible = sumLeft < tabWidth && sumLeft >= 0;
      const isVisible2 = sumLeftWidth < tabWidth && sumLeftWidth > 0;
      if (isVisible || isVisible2) {
        viewList.push(item);
      }
    });
  }

  // 1.2 返回可视区域内的元素
  return { viewList, newLeft };
}

// 获取最后一个可视元素 nextSibling
export function getLastDom(viewDom = [], tabWidth, tabLeft, viewRange) {
  const lastDom = viewDom[viewDom.length - 1];
  if (lastDom) {
    // 如果最后一个未完整显示，则本次完整进入可视区域
    const sumOffset = lastDom.offsetLeft + lastDom.offsetWidth + tabLeft;
    if (viewRange) {
      if (sumOffset === tabWidth) {
        return tabLeft;
      } else if (sumOffset > tabWidth && lastDom.nextSibling === null) {
        // 如果是最后一个
        return tabWidth - sumOffset + tabLeft;
      } else if (sumOffset > tabWidth) {
        return tabWidth - sumOffset;
      } else if (sumOffset < tabWidth) {
        return -lastDom.offsetLeft + (tabWidth - lastDom.offsetWidth);
      }
    } else if (sumOffset > tabWidth) {
      return tabWidth - sumOffset;
    } else if (lastDom.nextSibling) {
      return -lastDom.nextSibling.offsetWidth;
    }
  }
  return 0;
}

// 获取第一个可视元素 previousSibling
export function getFirstDom(viewDom = [], tabLeft) {
  const firstDom = viewDom[0];
  if (firstDom) {
    // 如果第一个未完整显示，则本次完整进入可视区域
    if (-firstDom.offsetLeft !== tabLeft) {
      return -firstDom.offsetLeft;
    } else if (firstDom.previousSibling) {
      return -firstDom.previousSibling.offsetLeft;
    }
  }

  return 0;
}

// 计算左移动，还是右移动
export function sumOffsetLeft(type = 'right', tabLeft, left) {
  if (type === 'right') {
    // return tabLeft - left;
    return left + tabLeft;
  } else {
    return tabLeft + left;
  }
}

// 判断该元素在可视范围内的下标
export function getActDomIndex(viewDom, activeKey) {
  // 所在下标
  let dataIndex = -1;
  let viewDomLength = viewDom.length;

  viewDom.forEach((item, index) => {
    if (item.dataset.tabkey === activeKey) {
      dataIndex = index;
    }
  });
  return {
    dataIndex,
    viewDomLength,
  };
}

// 在可视范围左边界
export function domOffsetLeft(viewDom = [], tabLeft, type) {
  return getFirstDom(viewDom, tabLeft, type);
}

// 在可视范围右边界
export function domOffsetRight(viewDom = [], tabWidth, tabLeft) {
  return getLastDom(viewDom, tabWidth, tabLeft, true);
}

// 不再可视范围内
export function domNoView(titleRef, activeKey, tabWidth, tabLeft) {
  // 判断在可视范围的左边还是右边
  const { range, viewTemList } = isViewLeftOrRight(
    titleRef,
    activeKey,
    tabWidth,
    tabLeft,
  );

  if (range === 'left') {
    // 在可视范围左边时，直接使用offsetLeft，即可
    return domOffsetLeft(viewTemList, tabLeft);
  } else if (range === 'right') {
    // 在可视范围右边时。
    return handleViewRight(viewTemList, activeKey, tabWidth);
  }
}

// 不在可视范围内，且在可视范围右边时
function handleViewRight(viewTemList, activeKey, tabWidth) {
  let left = 0;
  viewTemList.forEach((item, index) => {
    if (item.dataset.tabkey === activeKey) {
      left = tabWidth - item.offsetWidth - item.offsetLeft;
    }
  });
  // console.log('不在可视范围内，且在可视范围右边时', left);
  return left;
}

// 判断在可视范围的左边还是右边
function isViewLeftOrRight(titleRef, activeKey, tabWidth, tabLeft) {
  let actKeyIndex = -1;
  titleRef?.childNodes.forEach((item, index) => {
    if (item.dataset.tabkey === activeKey) {
      actKeyIndex = -1;
    }
  });
  const { viewIndex, temList } = getViewDomTem(titleRef, tabWidth, tabLeft);
  return {
    range: actKeyIndex < viewIndex ? 'left' : 'right',
    viewTemList: temList,
  };
}

function getViewDomTem(titleRef, tabWidth, tabLeft = 0) {
  let viewIndex = -2;
  let temList = [];
  titleRef?.childNodes.forEach((item, index) => {
    const sumLeft = item.offsetLeft + tabLeft;
    const sumLeftWidth = item.offsetLeft + item.offsetWidth + tabLeft;
    const isVisible = sumLeft < tabWidth && sumLeft >= 0;
    const isVisible2 = sumLeftWidth < tabWidth && sumLeftWidth > 0;
    if ((isVisible || isVisible2) && viewIndex > -1) {
      viewIndex = index;
    }
    temList.push(item);
  });
  return {
    viewIndex,
    temList,
  };
}

// 检测可视范围内dom，是否可以在一屏幕内放下。
export function testingDom(viewDom, tabWidth, tabLeft) {
  let sunWidth = 0;
  let lastTab = null;
  viewDom.forEach((item, index) => {
    sunWidth = sunWidth + item.offsetWidth;
    if (index === viewDom.length - 1) {
      lastTab = item;
    }
  });
  // 如果一屏幕放不下
  if (sunWidth < tabWidth) {
    return reloadLeft(lastTab, tabWidth);
  } else if (sunWidth > tabWidth) {
    return -sunWidth + tabWidth;
  }
  return tabLeft;
}

// 当一屏幕放不下的时候，重新计算left
function reloadLeft(lastItem, tabWidth) {
  return -lastItem.offsetLeft + (tabWidth - lastItem.offsetWidth);
}

// 可视范围有边界，且没有下一个，并且整个可视范围小于可视范围宽度；
export function getViewExt(viewDom, tabWidth) {
  let sunWidth = 0;
  viewDom.forEach((item) => {
    sunWidth = sunWidth + item.offsetWidth;
  });

  return sunWidth >= tabWidth;
}

export function getScrollState() {}

/**
 * @desc 判断前面是否还有元素
 * @return {Boolean} true: 有元素 false：无元素
 * */
export function isLastDomNext(scrollRef, tabWidth, tabLeft) {
  const scrollWidth = getTabWidthAll(scrollRef);
  const maxOffsetLeft = tabWidth - scrollWidth;
  return maxOffsetLeft < tabLeft;
}

/**
 * @desc 如果发生了删除，需要进行判断边界情况
 * @desc step1 可视范围外的右侧还有dom元素，则不需要处理
 * @desc step2 可视范围外的右侧，无dom元素，需要重新定位
 * @desc step3 根据新的left，重新获取可视范围内的dom
 * @desc step4 新可视范围dom的第一个前面，如果还有，则根据最后一个dom元素，重新计算left偏移量
 * @desc step5 新可视范围dom的第一个前面，如果没有，则按照第一个元素，重新计算left
 * */
export function removeTab(viewDom, scrollRef, tabWidth, tabLeft) {
  const lastDom = !!viewDom[viewDom.length - 1]?.nextSibling;
  // step1 可视范围外的右侧还有dom元素，则不需要处理
  // step2 可视范围外的右侧，无dom元素，需要重新定位
  if (!lastDom) {
    // step3 根据新的left，重新获取可视范围内的dom
    const { viewList } = getViewDom(scrollRef?.current, tabWidth, tabLeft);
    const firstDom = !!viewList[0]?.previousSibling;
    // step4 新可视范围dom的第一个前面，如果还有，则根据最后一个dom元素，重新计算left偏移量
    const scrollWidth = getTabWidthAll(scrollRef);
    const maxOffsetLeft = tabWidth - scrollWidth;
    if (firstDom) {
      return maxOffsetLeft;
    } else if (!firstDom) {
      // step5 新可视范围dom的第一个前面，如果没有，则按照第一个元素，重新计算left
      if (scrollWidth > tabWidth) {
        return maxOffsetLeft;
      } else if (scrollWidth <= tabWidth) {
        return 0;
      }
    }
  }
  return tabLeft;
}
