export const buildStepsFromData = ({ inData, inColumns }) => {
    const localData = inData;
    const localColumns = inColumns;

    if (!Array.isArray(localData) || localData.length === 0) {
        return [];
    }

    // Determine target columns: use provided inColumns or extract primitive value keys
    const columns = (Array.isArray(localColumns) && localColumns.length > 0)
        ? localColumns
        : Object.keys(localData[0]).filter(key => {
            const val = localData[0][key];
            return typeof val === "string" || typeof val === "number" || typeof val === "boolean";
        });

    const stepsList = [];

    // Step 1: Add TH header cells to table.thead.tr
    const headerThNodes = columns.map(colKey => ({
        tagName: "th",
        attributes: {
            class: "px-4 py-2 border border-gray-300 bg-gray-100 text-left font-semibold text-gray-700"
        },
        textContent: colKey
    }));

    stepsList.push({
        find: "table.thead.tr",
        target: "children",
        value: headerThNodes
    });

    // Step 2: Add TR rows to table.tbody with TD cells containing data values
    localData.forEach((item, rowIndex) => {
        const rowTdNodes = columns.map(colKey => {
            const val = item[colKey];
            const cellText = (val !== null && val !== undefined) ? String(val) : "";
            return {
                tagName: "td",
                attributes: {
                    class: "px-4 py-2 border border-gray-200 text-sm text-gray-800"
                },
                textContent: cellText
            };
        });

        const rowNode = {
            tagName: "tr",
            attributes: {
                class: rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
            },
            children: rowTdNodes
        };

        stepsList.push({
            find: "table.tbody",
            target: "children",
            value: rowNode
        });
    });

    return stepsList;
};

export default buildStepsFromData;
