import cron from "node-cron";
import { Logger } from "./logger";

// # ┌────────────── second (optional)
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *
// const SCHEDULE = "0 10,15,21 * * *";
// const SCHEDULE = "* * * * * *";

const Job = (action: () => Promise<void>) => {
  Logger.info(`JOB => ${action.name} registered`);
  let status: "LAZY" | "BUSY" = "LAZY";
  const player = () => {
    Logger.info(`JOB => ${action.name}: Player triggered`);
    action();
  };

  const task = cron.schedule("0 10,15,21 * * *" as string, player, {
    scheduled: false,
    timezone: "America/Bogota",
  });

  const start = () => {
    Logger.info(`JOB => ${action.name}: Started`);
    task.start();
    status = "BUSY";
  };

  const stop = () => {
    Logger.info(`JOB => ${action.name}: Stopped`);
    task.stop();
    status = "LAZY";
  };

  const getStatus = () => status;

  return { start, stop, getStatus };
};

export { Job };
