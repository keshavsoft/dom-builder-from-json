import { renderTable } from "../../webComponents/v3/core/controls/table/v25/index.js";

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
            { key: "vouchernumber", label: "voucher number" },
            { key: "allinventoryentries.stockitemname", label: "stockitemname" },
            { key: "allinventoryentries.batchallocations.godownname", label: "godownname" },
            { key: "allinventoryentries.batchallocations.batchname", label: "batchname" },
            { key: "allinventoryentries.batchallocations.amount", label: "amount" },
            { key: "allinventoryentries.batchallocations.actualqty", label: "actual qty" },
            { key: "allinventoryentries.batchallocations.billedqty", label: "billed qty" }
        ],
        renderers: {
            table: {
                header: {
                    vouchernumber: {
                        "attributes": {
                            "style": "text-align: right; color: rgba(235, 37, 37, 1); text-transform: none;"
                        },
                        textContent: "Voucher Number"
                    },
                    "allinventoryentries.stockitemname": {
                        "attributes": {
                            "style": "text-transform: none;"
                        },
                        textContent: "Stock Item Name",
                        isSortable: true
                    }
                },
                columns: ["vchtype", "vouchernumber", "allinventoryentries.stockitemname",
                    "allinventoryentries.batchallocations.batchname",
                    "allinventoryentries.batchallocations.godownname",
                    "allinventoryentries.batchallocations.amount",
                    "allinventoryentries.batchallocations.actualqty",
                    "allinventoryentries.batchallocations.billedqty"
                ],
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
};