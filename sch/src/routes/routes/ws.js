const wsuri = `ws://localhost:3000`;

export function Ws() {
  const self = this;
  self.websocks = null
  try {
    const websocks = new WebSocket(wsuri);
    websocks.onmessage = self.websocketonmessage;
    websocks.onopen = self.websocketonopen;
    websocks.onerror = self.websocketonerror;
    websocks.onclose = self.websocketclose;
    console.log('初始化weosocket');
  } catch (e) {
    console.error('初始化weosockets失败！请检查websocket连接是否通常！');
  }
}

// 连接建立成功
Ws.prototype.websocketonmessage = function() {
  console.log('连接建立成功', info);
}
// 连接建立失败重连
Ws.prototype.websocketonerror = function() {
  console.log('连接建立失败重连');
  // 需要增加重连机制
}
// 数据接收
Ws.prototype.websocketonmessage = function(e) {
  const redata = JSON.parse(e.data);
  console.log('接收到数据', redata);
}

// 数据发送
Ws.prototype.websocketonmessage = function(Data) {
  console.log('数据发送', Data);
  this?.websocks?.send(Data);
}
// 关闭
Ws.prototype.websocketonmessage = function(Data) {
  console.log('断开连接', e);
  // 关闭标签页，或者关闭组件需要关闭连接。 具体看场景
}

