import { createTableTask } from "./tableTask/v3/index.js";
import { buildTableSpecTreeFromColumnsAndData, createTableTask as createTableTaskV4 } from "./tableTask/v5/createTask.js";

export { createTableTask, buildTableSpecTreeFromColumnsAndData, createTableTaskV4 };
export default createTableTask;
