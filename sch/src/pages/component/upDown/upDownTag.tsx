import { Tag } from 'antd';
import { bgColor, name, textColor } from '@/pages/component/upDown/upDownUtil';

interface upDownInt {
  text: undefined | number;
}

/**
 * @desc 方向的tag组件
 * */
function UpDownTag(props: upDownInt) {
  const { text = 0 } = props;
  let texts = String(text);
  return (
    <Tag color={bgColor[texts] ?? ''} style={{ color: textColor[texts] ?? '' }}>
      {name[texts] ?? '--'}
    </Tag>
  );
}

export default UpDownTag;
