import { Logger } from '@nestjs/common';

class LogStrategy {
  private static initialize = (name: string = 'Unknown') => new Logger(name);

  public static debug = (name: string, message: string) => {
    const logger = this.initialize(name);
    logger.debug(message);
  };

  public static log = (name: string, message: string) => {
    const logger = this.initialize(name);
    logger.log(message);
  };

  public static warn = (name: string, message: string) => {
    const logger = this.initialize(name);
    logger.warn(message);
  };

  public static error = (name: string, message: string, fatal = false) => {
    const error = new Error(message);
    const logger = this.initialize(name);
    logger.error(error.message, error.stack);

    if (fatal) process.exit(1);
  };
}

export default LogStrategy;
