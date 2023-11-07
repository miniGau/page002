
/**
 * cgi:规范说明
 * request：
 * header：
 *  request-id: 唯一id
 *  dua：k1=v1&k2=v2
 *  request-ts: 请求时间时间戳
 *  content-type: 请求类型，默认是：text/json, 未来支持text/pb
 * 
 * body:
 *   请求参数序列化
 * 
 * response：
 *  body
 *      retcode: 业务返回码
 *      message： 返回msg
 *      data: 响应数据
 *      traceId: 唯一id
 *    
 */

