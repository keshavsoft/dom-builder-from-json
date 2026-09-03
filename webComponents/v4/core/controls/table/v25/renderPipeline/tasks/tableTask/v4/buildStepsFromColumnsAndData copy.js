export const buildStepsFromColumnsAndData = ({ inColumns, inData }) => {
    const localColumns = inColumns;
    const localData = inData;

    if (!Array.isArray(localColumns) || localColumns.length === 0) {
        return [];
    }

    const stepsList = [];

    // Step 1: Build Header TH cells for table.thead.tr
    const headerThNodes = localColumns.map(colKey => ({
        tagName: "th",
        attributes: {
            class: "px-4 py-2 border border-gray-300 bg-gray-100 text-left font-semibold text-gray-700"
        },
        textContent: String(colKey)
    }));

    stepsList.push({
        find: "table.thead.tr",
        target: "children",
        value: headerThNodes
    });

    // Step 2: Build TR rows with TD cells for table.tbody
    if (Array.isArray(localData)) {
        localData.forEach((item, rowIndex) => {
            const rowTdNodes = localColumns.map(colKey => {
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
    }

    return stepsList;
};

export default buildStepsFromColumnsAndData;
