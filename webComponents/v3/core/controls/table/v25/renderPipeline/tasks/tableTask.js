import { createTableTask } from "./tableTask/v3/index.js";
import { buildTableSpecTreeFromColumnsAndData } from "./tableTask/v5/index.js";
import { createTableTask as createTableTaskV4 } from "./tableTask/v5/createTask.js";

export { createTableTask, buildTableSpecTreeFromColumnsAndData, createTableTaskV4 };
export default createTableTask;
