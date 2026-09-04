import { renderTable } from "../../webComponents/v6/core/v32/index.js";

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
            { key: "vchtype", label: "vchtype", type: "text" },
            { key: "vouchernumber", label: "voucher number", type: "number" },
            { key: "allinventoryentries.stockitemname", label: "stockitemname", type: "text" },
            { key: "allinventoryentries.batchallocations.godownname", label: "godownname", type: "text" },
            { key: "allinventoryentries.batchallocations.batchname", label: "batchname", type: "text" },
            { key: "allinventoryentries.batchallocations.amount", label: "amount", type: "number" },
            { key: "allinventoryentries.batchallocations.actualqty", label: "actual qty", type: "number" },
            { key: "allinventoryentries.batchallocations.billedqty", label: "billed qty", type: "text" }
        ],
        columnsConfig1: [
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
            search1: {},
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
                    "allinventoryentries.batchallocations.actualqty"
                ],
                footer: {
                    summaryRow: {
                        vchtype: "count",
                        vouchernumber: "sum",
                        "allinventoryentries.stockitemname": "max",
                        "allinventoryentries.batchallocations.actualqty": "sum"
                    },
                    balanceRow: {
                        vchtype: "---------",
                        vouchernumber: 666666,
                        "allinventoryentries.stockitemname": "min",
                        "allinventoryentries.batchallocations.actualqty": "{allinventoryentries.batchallocations.actualqty}*{vouchernumber}"
                    },
                    inputsRow1: [
                        ["StockItemName", "Credit", "Debit", "amount"]
                    ]

                }
            },
            form1: {
                fields: {
                    vouchernumber: {
                        attributes: {
                            style: "text-align: right; color: rgba(235, 37, 37, 1); text-transform: none;"
                        },
                        label: "Voucher Number"
                    },
                    "allinventoryentries.stockitemname": {
                        attributes: {
                            style: "text-transform: none;"
                        },
                        label: "Stock Item Name"
                    }
                },
                columns: [
                    "vchtype",
                    "vouchernumber",
                    "allinventoryentries.stockitemname",
                    "allinventoryentries.batchallocations.batchname",
                    "allinventoryentries.batchallocations.godownname",
                    "allinventoryentries.batchallocations.amount",
                    "allinventoryentries.batchallocations.actualqty",
                    "allinventoryentries.batchallocations.billedqty1"
                ]
            },
            card: {}
        },
        renderers1: {
            search: {},
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
            },
            form: {
                fields: {
                    vouchernumber: {
                        attributes: {
                            style: "text-align: right; color: rgba(235, 37, 37, 1); text-transform: none;"
                        },
                        label: "Voucher Number"
                    },
                    "allinventoryentries.stockitemname": {
                        attributes: {
                            style: "text-transform: none;"
                        },
                        label: "Stock Item Name"
                    }
                },
                columns: [
                    "vchtype",
                    "vouchernumber",
                    "allinventoryentries.stockitemname",
                    "allinventoryentries.batchallocations.batchname",
                    "allinventoryentries.batchallocations.godownname",
                    "allinventoryentries.batchallocations.amount",
                    "allinventoryentries.batchallocations.actualqty",
                    "allinventoryentries.batchallocations.billedqty1"
                ]
            }
        }
    });
};