
type ConfigItem = {
  name: string; // 名称
  color: string; // 颜色
  fadeColor: string; // 不显示时的颜色
  exist: boolean; // 是否存在： true: 不展示，色例也不存在， false：反之
  disabled: boolean; // 是否禁止使用： 是否启用关闭展示功能
  show: boolean; // 地图控件是否展示和当前色例是否置灰： 色例展示--地图控件展示，色例置灰---地图控件不展示
  showedTotal: number; // 如果有子元素，并且子元素展示的数量为0 则父元素不展示。
  existTotal: number; // 子配置exist为ture的个数
  children?: { [index: string]: ConfigItem }; // 子控件
  [index: string]: any; // 自定义的字段
}

type ChildrenType = {
  [index: string]: ConfigItem
}
type ToProxyType = {
  config: ConfigItem;
  [index: string]: any;
}

function ToProxy(props: ToProxyType) {
  const { config } = props;
  // @ts-ignore
  this.config = JSON.parse(JSON.stringify(config));// 必须要克隆，再多次多次使用同一个config有出现proxy的中config被修改
  // @ts-ignore
  this.proxy = this.addProxy(this.config, null);
  // @ts-ignore
  return this.proxy;
}

// 递归创建proxy：将每一层配置都生成一个proxy
ToProxy.prototype.addProxy = function addProxy(config: ConfigItem, parent: ConfigItem) {
  if (typeof config !== "object" || Array.isArray(config)) return;
  let proxy = this.create(config, parent);// 必须在调用addProxy之前，如果parent没有产生proxy，set就无法实现监听
  let children = config.children;

  for (let key in children) {
    let childConfig = children[key];
    let result = this.addProxy(childConfig, proxy);
    children[key] = result || children[key];
  }
  return proxy
}

// 创建proxy
ToProxy.prototype.create = function create(obj: ConfigItem, parent: ConfigItem) {
  let self = this;
  return new Proxy(obj, {
    set(target, key, newValue, receiver) {
      let mode: any = {
        /**** show */
        show: () => {
          let oldValue = Reflect.get(target, "show");
          if (oldValue === newValue) return true;
          // 改变子元素的show值
          self.changeShowByParent(target.children, newValue);
          Reflect.set(target, key, newValue);
          mode['setParentShowedTotal']();
        },
        showedTotal: () => {
          Reflect.set(target, "show", newValue === 0 ? false : true);
          Reflect.set(target, key, newValue);
          mode['setParentShowedTotal']();
        },
        setParentShowedTotal: () => {
          parent && Reflect.set(parent, "showedTotal", self.getChildShowAmount(parent.children));
        },
        /**** show */

        disabled: () => {
          Reflect.set(target, key, newValue);
          self.changeDisabledByParent(target.children, newValue);
        },
        
        /**** exist */
        existTotal: () => {
          Reflect.set(target, "exist", newValue === 0 ? false : true);
          Reflect.set(target, key, newValue);
          mode['setParentExistTotal']();
        },
        setParentExistTotal: () => {
          parent && Reflect.set(parent, "existTotal", self.getChildExistAmount(parent.children));
        },
        exist: () => {
          let oldValue = Reflect.get(target, "exist");
          if (oldValue === newValue) return true;
          // 改变子元素的exist值
          self.changeExistByParent(target.children, newValue);
          Reflect.set(target, key, newValue);
          Reflect.set(target, "show", newValue);
          mode['setParentExistTotal']();
          mode['setParentShowedTotal']();
        }
        /**** exist */
      }
      mode[key]?.();
      return true
    }
  })
}

// 遍历最近的子元素，和父级的show保持一致
ToProxy.prototype.changeShowByParent = function (obj: ChildrenType | undefined, parentShow: boolean) {
  if(!obj) return
  for (let key in obj) {
    let item = obj[key];
    item && Reflect.set(item, "show", parentShow)
  }
}

// 遍历最近的子元素，和父级的exist保持一致
ToProxy.prototype.changeExistByParent = function (obj: ChildrenType | undefined, parentExist: boolean) {
  if(!obj) return
  for (let key in obj) {
    let item = obj[key];
    item && Reflect.set(item, "exist", parentExist)
  }
}

// 获取子元素的show为true的数量
ToProxy.prototype.getChildShowAmount = function (obj: ChildrenType | undefined) {
  let showedTotal = 0;
  for (let key in obj) {
    let current = obj[key];
    let num = current.show ? 1 : 0;
    showedTotal += current.children ? current.showedTotal : num;
  }
  return showedTotal;
}

// 获取子元素的exist为true的数量
ToProxy.prototype.getChildExistAmount = function (obj: ChildrenType | undefined) {
  let existTotal = 0;
  for (let key in obj) {
    let current = obj[key];
    let num = current.exist ? 1 : 0;
    existTotal += current.children ? current.showedTotal : num;
  }
  return existTotal;
}

// 遍历最近的子元素，和父级的disabled保持一致
ToProxy.prototype.changeDisabledByParent = function (obj: ChildrenType, parentDisabled: boolean) {
  for (let key in obj) {
    let item = obj[key];
    Reflect.set(item, "disabled", parentDisabled);
  }
}

// 遍历最近的子元素，将子元素的exist、show 和父级的exist保持一致
ToProxy.prototype.changeChildExist = function (obj: ChildrenType, parentExist: boolean) {
  for (let key in obj) {
    let item = obj[key];
    if(item) {
      Reflect.set(item, "exist", parentExist);
      Reflect.set(item, "show", parentExist);
    }
  }
}

// 如果所有的子元素exist都是false, 则返回false, 其他情况返回true
ToProxy.prototype.getParentExistByChild = function (child: ChildrenType): boolean {
  let isExist = false;
  console.log("exist---child", child);
  
  for (let key in child) {
    let item = child[key];
    if(item.exist) {
      isExist = true;
    }
  }
  return isExist;
}


export default ToProxy
export {
  ConfigItem,
  ToProxyType
}