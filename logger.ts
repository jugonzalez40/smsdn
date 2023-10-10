import pinoHttp from "pino-http";
import pino from "pino";

const loggerConfig = {
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
};

const LoggerHttp = pinoHttp(loggerConfig);

const Logger = pino(loggerConfig);

export { LoggerHttp, Logger  };
