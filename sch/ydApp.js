const express = require("express");
const ydApp = express();
const server = require("http").createServer(ydApp);

// 托管静态资源
ydApp.use(express.static("yd"));
// 启动服务，端口号默认 8100
server.listen(8100, () => {
  console.log("server running at http://192.168.50.224:8100/");
})
