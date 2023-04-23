let Client = require('ssh2-sftp-client');
let Moment = require('dayjs');
let path = require('path');
// 项目名称
const projectName = 'tsvcloud';
// ftp连接配置
const config = {
  host: '10.161.20.10',
  port: '22',
  username: 'root',
  password: 'aidrv15',
};

main();
function main() {
  let client = new Client();
  // 开始执行
  backFile(client);
}

// 1. 更换文件目录
function backFile(client) {
  const htmlRoot = '/usr/local/nginx/html/tsvcloud';
  const nowDate = Moment().format('YYYY_MM_DD HH_mm_ss');
  const serverForm = htmlRoot + '/' + projectName;
  const serverTo = htmlRoot + '/bak/' + projectName + '.bak' + nowDate;
  let state = false;
  client
    .connect(config)
    .then(() => {
      return client.exists(serverForm);
    })
    .then((data) => {
      if (data) {
        console.log('开始备份文件!', serverForm);
        return client.rename(serverForm, serverTo);
      } else {
        console.log('文件不存在，无需备份！');
        // 当文件不存在时，也可以上传文件
        state = true;
      }
    })
    .then((data) => {
      state = true;
      data && console.log('备份完成！', serverTo);
      return client.end();
    })
    .catch((err) => {
      client.end();
      console.error('文件备份，发生了错误！');
      console.warn('已断开Ftp连接！');
      console.error(err.message);
    })
    .finally(() => {
      // 如果备份成功，则开始上传文件
      state && upFile(client);
    });
}
// 2. 上传文件
function upFile(client) {
  let roots = path.resolve(__dirname, '..');
  let localPath = path.join(roots, projectName);
  let romotePath = '/usr/local/nginx/html/' + projectName;
  let state = false;
  client
    .connect(config)
    .then(() => {
      console.log(
        '-------------------- 已连接服务器,开始上传... ----------------',
      );
      console.log('本机地址:', localPath);
      console.log('服务器地址:', romotePath);
      console.log('开始上传时间:', Moment().format("YYYY-MM-DD HH:mm:ss"));
      return client.uploadDir(localPath, romotePath);
    })
    .then((data) => {
      console.log('-------------------- 上传完成!  ---------------');
      console.log('结束上传时间:', Moment().format("YYYY-MM-DD HH:mm:ss"));
      state = true;
      return client.end();
    })
    .catch((err) => {
      console.log('-------------------- 出错了！！ ----------------');
      console.error(err);
      // 断开连接
      client.end();
    })
    .finally(() => {
      state && isUpFileInfo(client);
    });
}

// 3. 打印上传目录的信息
function isUpFileInfo(client) {
  const htmlRoot = '/usr/local/nginx/html';
  const serverForm = htmlRoot + '/' + projectName;
  console.log('开始打印上传文件信息，如下：');
  client
    .connect(config)
    .then(() => {
      return client.stat(serverForm);
    })
    .then((data) => {
      if (data) {
        getFileInfo(data, serverForm);
      } else {
        console.log(
          '未获取到信息，上传存在异常，请登录服务器查看文件是否存在！',
        );
      }
    })
    .catch((err) => {
      console.error('获取更新文件信息发生错误！');
      console.error(err.message);
    })
    .finally(() => {
      client.end();
      console.log('已断开Ftp连接！');
    });
}

// 获取文件详细信息
function getFileInfo(stats = {}, serverForm) {
  const { modifyTime, isDirectory, size } = stats;
  console.info('文件地址：' + serverForm);
  console.info('类型：' + (isDirectory ? '目录' : '文件'));
  console.info(
    '上次修改时间：' + Moment(modifyTime).format('YYYY-MM-DD HH:mm:ss'),
  );
  // console.log("文件大小：" + size);
}
