/*
 * 获取环境变量
 */

// 环境变量
export const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
// 正式环境
export const isProd = env === 'production';
// 测试环境（对应后端pre
export const isTest = env === 'test';
// 开发测试环境（对应后端test
export const isDevTest = env === 'devtest';
// 本地开发环境
export const isDev = env === 'development';
// 调试模式
export const isDebug = Boolean(process.env.NODE_DEBUG);
export const isCloud = +process.env.NODE_DEBUG === 2;