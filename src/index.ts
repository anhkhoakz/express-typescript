import { env } from "@/common/utils/envConfig";
import { app, logger } from "@/server";

const { NODE_ENV, HOST, PORT } = env;

const server = app.listen(env.PORT, () => {
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});

const onCloseSignal = () => {
  logger.info("sigint received, shutting down");

  const shutdown = () => {
    server.close(() => {
      logger.info("server closed");
      process.exit();
    });
  };

  const isDevelopment: boolean = NODE_ENV === "development";
  if (isDevelopment) {
    shutdown();
    setTimeout(() => process.exit(1), 10 * 1000).unref();
  } else {
    setTimeout(shutdown, 3 * 1000).unref();
  }
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
