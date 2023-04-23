/**
 * 用户设置
 * @author 吴昊
 * **/
import { history } from 'umi';
import { Dropdown, Menu } from 'antd';
import { clearStorage } from '../../utils/localStorage';

const Account = (props) => {
  // 退出登录
  const handleLogout = () => {
    clearStorage();
    history.replace('/');
    history.go('/');
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <span>设置</span>
      </Menu.Item>
      <Menu.Item>
        <span onClick={handleLogout}>退出</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      placement="bottomCenter"
      overlayClassName="qy-account-dropdwn"
      arrow
    >
      <span className="iconfont icon-weidenglu-touxiang" />
    </Dropdown>
  );
};

export default Account;
