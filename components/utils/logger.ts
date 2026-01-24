
type LogLevel = 'info' | 'warn' | 'error';

class Logger {
  private static instance: Logger;
  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) Logger.instance = new Logger();
    return Logger.instance;
  }

  public log(level: LogLevel, message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const output = `[GSR ${level.toUpperCase()}] ${timestamp}: ${message}`;
    if (level === 'error') console.error(output, data || '');
    else if (level === 'warn') console.warn(output, data || '');
    else console.info(output, data || '');
  }

  public error(message: string, error: any) {
    this.log('error', message, { msg: error?.message, stack: error?.stack });
  }
}

export const logger = Logger.getInstance();
