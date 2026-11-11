export const Logger = {
  info(message: string) {
    console.info(formatLog("INFO", message));
  },
  warn(message: string) {
    console.warn(formatLog("WARN", message));
  },
  error(message: unknown) {
    let errorMessage: string;
    if (message instanceof Error) {
      errorMessage = message.message;
      console.error(message.stack)
    } else {
      errorMessage = String(message);
    }
    return console.error(formatLog("ERROR", errorMessage));
  },
  debug(message: string) {
    console.debug(formatLog("DEBUG", message));
  },
};

const getTimeStamp = () => {
  return new Date().toISOString();
};

const formatLog = (level: string, message: string) => {
  return `[${getTimeStamp()}] [${level.toUpperCase()}] ${message}`;
};

