import React, { useState } from "react";
import { Alert, Form, Input, message, Modal } from "antd";
import { modalRender, modalTitle, useModalDraggle } from "../../utils/modal/draggle";
import { updatePwdById } from "../../services/app";
import md5 from "js-md5";
import { checkPassword } from "../../utils/password/checkPassword";

/**
 * @desc 仿真工具 - 创建仿真任务
 * @author 吴昊
 * */
const UpUserPassword = (props) => {
  const { handleCancel, handleLogout } = props;
  const [form] = Form.useForm();

  // 请求时，防止多次点击
  const [loading, setLoading] = useState(false);

  // 确认，表单进行校验
  const handleOnOk = () => {
    form.submit();
  };

  // 表单校验通过，开始执行成功回调
  const onFinish = (value) => {
    const { oldPwd: old, pwd } = value;
    let user = {};
    user.pwd = md5(md5(md5(pwd)));
    user.userId = localStorage.getItem('tsvcloud_userId');
    console.log(old, md5(md5(md5(old))));
    upUserPwd({
      param: {
        user,
        oldPwd: md5(md5(md5(old))),
      },
      setLoading,
      handleCancel,
      handleLogout,
    });
  };

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };

  // const [pwdState, setPwdState] = useState(null);
  const [confirmDirty, setConfirmDirty] = useState(false);
  const handlePwdState = (e) => {
    if (e.target.value) {
      // setPwdState(null);
    } else {
      // setPwdState('a');
      form.validateFields(['pwd'], { force: true });
      form.validateFields(['pwd2'], { force: true });
    }
  };

  const handleConfirmBlur = (e) => {
    const value = e.target.value;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (rule, value = '', callback) => {
    // const form = this.props.form;
    const length = String(value ? value : '').length;
    if (length < 8) {
      callback('密码位数少于8位!');
    } else if (length > 16) {
      callback('密码位数大于16位!');
    } else if (!checkPassword(value)) {
      callback('密码未包含数字、字母、特殊字符!');
    } else {
      // callback();
      if (value && value !== form.getFieldValue('pwd')) {
        callback('输入的两个密码不一致！');
      } else {
        callback();
      }
    }
  };

  const validateToNextPassword = (rule, value = '', callback) => {
    const length = String(value ? value : '').length;
    if (value && confirmDirty) {
      form.validateFields(['pwd2'], { force: true });
    }
    // callback();
    if (length < 8) {
      callback('密码位数少于8位!');
    } else if (length > 16) {
      callback('密码位数大于16位!');
    } else if (!checkPassword(value)) {
      callback('密码未包含数字、字母、特殊字符!');
    } else {
      callback();
    }
  };

  // 弹出 - 拖动/最大化/挂载位置
  const useProps = useModalDraggle({ w: 500 });
  const { mWidth } = useProps;
  const checkPwd = localStorage.getItem('tsvcloud_checkPassword');
  return (
    <Modal
      title={modalTitle({ ...useProps }, '修改密码')}
      modalRender={(modal) => modalRender({ modal, ...useProps })}
      open={true}
      onCancel={!checkPwd && handleCancel}
      onOk={handleOnOk}
      okButtonProps={{
        disabled: loading,
      }}
      width={mWidth}
      okText="更新密码"
      centered
      destroyOnClose
      style={{
        paddingBottom: 0,
      }}
    >
      {checkPwd && (
        <Alert
          message="密码强度弱，请修改为强密码后才可以使用系统!"
          type="warning"
          showIcon
          style={{
            marginBottom: 10,
          }}
        />
      )}
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={({ values, errorFields, outOfDate }) => {
          if (errorFields.length === 0) {
            onFinish(values);
          }
        }}
        layout="horizontal"
        style={{ maxHeight: '450px', overflow: 'auto' }}
      >
        <Form.Item
          label="登录名"
          {...formItemLayout}
          name="userName"
          initialValue={localStorage.getItem('tsvcloud_userName')}
        >
          <Input disabled={true} placeholder="请输入登录名" />
        </Form.Item>

        <Form.Item
          label="真实姓名"
          {...formItemLayout}
          name="realName"
          initialValue={localStorage.getItem('tsvcloud_realName')}
        >
          <Input disabled={true} placeholder="请输入真实姓名" maxLength={8} />
        </Form.Item>

        <Form.Item
          label="旧密码"
          {...formItemLayout}
          name="oldPwd"
          rules={[
            {
              required: true,
              message: '请输入旧密码!',
            },
            {
              min: 6,
              message: '密码长度最小6位!',
            },
            {
              max: 30,
              message: '密码长度最大30位!',
            },
          ]}
        >
          <Input placeholder="请输入旧密码" maxLength={30} />
        </Form.Item>

        <Form.Item
          label="新密码"
          {...formItemLayout}
          name="pwd"
          rules={[
            {
              required: true,
              message: '',
            },
            // {
            //   min: 6,
            //   message: '密码长度最小6位!',
            // },
            // {
            //   max: 30,
            //   message: '密码长度最大30位!',
            // },
            {
              validator: validateToNextPassword,
            },
          ]}
          hasFeedback
          extra={`8~16位，必须包含数字、字母、特殊字符~!@#$%^&*()_+<>?:"{},.;'`}
        >
          <Input
            type="password"
            onChange={handlePwdState}
            placeholder={'请输入新密码'}
            maxLength={30}
          />
        </Form.Item>

        <Form.Item
          label="确认新密码"
          {...formItemLayout}
          name="pwd2"
          rules={[
            {
              required: true,
              message: '',
            },
            // {
            //   min: 6,
            //   message: '密码长度最小6位!',
            // },
            // {
            //   max: 30,
            //   message: '密码长度最大30位!',
            // },
            {
              validator: compareToFirstPassword,
            },
          ]}
          hasFeedback
          extra={`8~16位，必须包含数字、字母、特殊字符~!@#$%^&*()_+<>?:"{},.;'`}
        >
          <Input
            type="password"
            placeholder={'请输入确认新密码'}
            onChange={handlePwdState}
            onBlur={handleConfirmBlur}
            maxLength={30}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpUserPassword;

function upUserPwd(props = {}) {
  const { param = {}, setLoading, handleCancel, handleLogout } = props;
  setLoading(true);
  let state = false;
  updatePwdById(param)
    .then((data) => {
      if (data.statusCode === 200) {
        // message.success('修改成功！即将自动退出登录!');
        state = true;
      } else {
        message.error(data.message);
      }
    })
    .catch((e) => console.error(e))
    .finally(() => {
      if (state) {
        // 修改成功，自动退出!
        handleLogout && handleLogout(true);
        handleCancel && handleCancel();
        localStorage.removeItem('tsvcloud_checkPassword');
      }
      setLoading(false);
    });
}
