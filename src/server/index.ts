import Koa from 'koa';
import cors from '@koa/cors';
import koabody from 'koa-bodyparser';
import fs from 'fs';
import path from 'path';
import serve from 'koa-static';
import router from './controllers/router';
import mysql from './utils/mysql';
import redis from './utils/redis';
import { port, servername, public_dir } from './config.json';

const app = async () => {
  // 检查并创建公共资源文件夹
  if (!fs.existsSync(path.join(public_dir, 'avatar')))
    fs.mkdirSync(path.join(public_dir, 'avatar'), { recursive: true });
  if (!fs.existsSync(path.join(public_dir, 'poster')))
    fs.mkdirSync(path.join(public_dir, 'poster'), { recursive: true });
  if (!fs.existsSync(path.join(public_dir, 'photos')))
    fs.mkdirSync(path.join(public_dir, 'photos'), { recursive: true });

  const koa = new Koa();
  koa.use(cors());
  koa.use(koabody({ formLimit: '10mb', jsonLimit: '10mb', textLimit: '10mb' }));
  koa.use(serve(path.join(public_dir, '../')));

  // 测试mysql连接
  await mysql
    .getConnection()
    .then((res) => {
      console.log('Mysql服务器已连接');
      res.release();
    })
    .catch((err) => {
      console.error('Mysql服务器连接失败', err);
      throw err;
    });

  // 测试redis连接,连接失败并重试尝试5次后redis将抛出异常终止服务器
  await redis
    .setex('test', 1, 'test')
    .then(() => {
      console.log('Redis服务器已连接');
    })
    .catch((err) => {
      console.error('Redis服务器连接失败', err);
      throw err;
    });

  koa.use(router.routes()).use(router.allowedMethods());
  koa.listen(port);

  console.log(`服务器已启动在${servername}`);
};

const appExit = async (code = 0) => {
  await mysql.end();
  console.log('已断开mysql连接');
  await redis.quit();
  console.log('已断开redis连接');
  process.exit(code);
};

process.on('SIGINT', () => appExit(0));

app().catch((err) => {
  console.error(err);
  appExit(-1);
});
