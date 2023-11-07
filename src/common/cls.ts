/*
 * 持续本地存储
 */

import * as cls from 'cls-hooked';

export const getTraceId = () => cls.getNamespace('traceStorage')?.get('traceId') || '';
