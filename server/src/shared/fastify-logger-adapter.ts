import { Logger } from './logger';

export function fastifyLoggerAdapter(log: any): Logger {
  return {
    info: (obj, msg) => log.info(obj, msg),
    warn: (obj, msg) => log.warn(obj, msg),
    error: (obj, msg) => log.error(obj, msg),
  };
} 