import { renderTable } from "../../webComponents/v2/core/controls/table/v25/index.js";

import purchasesJson from "./purchases.json" with { type: "json" };

const tableContainer = document.getElementById("tableContainer");

if (tableContainer) {
    // Raw stock items data (No serialNo column provided - auto computed by Data Mapper)
    // Table Render (v9 Single-Call orchestrator pattern with responsibility-grouped options)
    renderTable({
        toRenderHtmlId: "tableContainer",
        theme1: "dark",
        data: purchasesJson,
        inVisibility: {
            showSearch: true,
            showTable: true
        },
        columnsConfig: [
            { key: "vchtype", label: "vchtype" },
            { key: "vouchernumber", label: "vouchernumber" },
            { key: "allinventoryentries.stockitemname", label: "stockitemname" },
            { key: "Credit", label: "Credit" },
            { key: "Debit", label: "Debit" }
        ],
        renderers: {
            table: {
                columns: ["vchtype", "vouchernumber", "allinventoryentries.stockitemname"],
                footer: {
                    summaryRow: {
                        vchtype: "count",
                        Credit: "sum",
                        Debit: "sum"
                    },
                    balanceRow1: {
                        StockItemName: "111",
                        Credit: "Credit-Debit",
                        Debit: "Debit-Credit"
                    },
                    inputsRow1: [
                        ["StockItemName", "Credit", "Debit"]
                    ]

                }
            }
        }
    });

    // if (tableElement) {
    //     tableContainer.appendChild(tableElement);

    //     // Reconstruct JSON Spec from rendered DOM Element
    //     const jsonSpec = buildSpecFromElement({ inElement: tableElement });
    //     console.log("Reverted JSON Spec from DOM:", jsonSpec);

    //     const report = compareSpecs({ inFromSpec: tableElement, inToSpec: jsonSpec });
    //     console.log("Spec Comparison Report:", report);
    // };

    // tableContainer.appendChild(directJs());

}
