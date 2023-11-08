import * as winston from 'winston';
import * as path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
import { getTraceId } from './cls';

const fileTransport = new DailyRotateFile({
  filename: path.join(__dirname, 'xlogs', `%DATE%.log`),
  datePattern: 'YYYY-MM-DD',
  json: true,
});

const format = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS',
  }),
  winston.format.printf(({ timestamp, message, ...info }) => {
    const traceId = getTraceId();
    const str = `${timestamp}|${
      process.pid
    }|${message}|${traceId}|${JSON.stringify(info)}\n`;
    return str;
  }),
);
const consoleTransport = new winston.transports.Console({
  format,
});

export const logger = winston.createLogger({
  level: 'info',
  format: format,
  transports: [fileTransport, consoleTransport],
});
