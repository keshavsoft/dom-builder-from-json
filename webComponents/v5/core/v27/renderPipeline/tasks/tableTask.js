import {
    createTableTask,
    buildTableSpecTreeFromColumnsAndData,
    initialBaseSpecTree
} from "./tableTask/index.js";

const createTableTaskV4 = createTableTask;

export {
    createTableTask,
    createTableTaskV4,
    buildTableSpecTreeFromColumnsAndData,
    initialBaseSpecTree
};

export default createTableTask;
