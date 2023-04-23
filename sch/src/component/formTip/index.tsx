import { Tooltip } from "antd";

// interface
type FormTipType = {
  children: JSX.Element;
  title: string | number | JSX.Element;
  // [index: string | number]: any;
};

// 表单的tooltip提示
function FormTip(props: FormTipType): JSX.Element {
  const { children, title } = props;
  return (
    <Tooltip
      destroyTooltipOnHide={{ keepParent: false }}
      title={children.props.label || title}
    >
      {children}
    </Tooltip>
  );
}

export { FormTip };
