import { Button, Divider } from "antd";

/**
 * @desc 用户权限信息相关
 * @author 吴昊 2020/9/11
 */

function userRole(sess) {
  // const isAdmin = sess.getItem("tsvcloud_isAdmin") === "true";
  const isAdmin = sess.getItem('tsvcloud_isAdmin');
  const perssionBtn = JSON.parse(sess.getItem('tsvcloud_perssionBtn'));
  return {
    isAdmin,
    perssionBtn,
  };
}

/**
 * @desc 生成按钮
 * @param {String} condition 权限标识
 * @param {String} name 按钮名称
 * @param {String} icon 图标
 * @param {String} disabled 不可选
 * @param {Function} onClick 点击事件
 * @author 吴昊 2020/9/11
 * */
function createBtn({
  sess,
  condition = '',
  name = '',
  icon = 'menu',
  disabled = false,
  onClick = () => {},
  sessState = true,
  // size = 'small',
  size = '',
}) {
  const { isAdmin, perssionBtn } = sessState
    ? userRole(sess)
    : { isAdmin: 'true' };
  return isAdmin === 'true' || perssionBtn.indexOf(condition) > -1 ? (
    <Button
      title={name}
      type="primary"
      // icon={icon}
      size={size}
      disabled={disabled}
      onClick={onClick}
      style={{ marginLeft: '10px' }}
    >
      {name}
    </Button>
  ) : null;
}

// 表格表头，过滤操作列
function filterColumn(data = []) {
  const operating = data[data.length - 1];
  return operating.width === 0 ? data.slice(0, data.length - 1) : data;
}

/**
 * @desc 生成表格按钮
 // * @param {String} condition 权限标识
 * @author 吴昊 2020/9/11
 * */
function tableBtn({ data = [], edits, deletes }) {
  return data.map((item, index) => {
    return (
      <span key={index}>
        {index > 0 ? <Divider type="vertical" /> : null}
        {item.indexOf('edit') > -1 ? <a onClick={edits}>修改</a> : null}
        {item.indexOf('del') > -1 ? <a onClick={deletes}>删除</a> : null}
      </span>
    );
  });
}

export { userRole, createBtn, filterColumn, tableBtn };
