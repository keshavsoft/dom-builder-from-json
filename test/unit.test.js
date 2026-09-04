import test from "node:test";
import assert from "node:assert/strict";

import { buildStory } from "../webComponents/v6/core/v27/story/buildStory.js";
import {
    versions,
    defaultVersion,
    maxVersion,
    buildDataModels
} from "../webComponents/v6/core/v27/story/buildDataModels/index.js";
import { runRenderPipeline } from "../webComponents/v6/core/v27/renderPipeline/index.js";
import purchasesJson from "./v1/purchases.json" with { type: "json" };

test("buildDataModels versioning exports", () => {
    assert.equal(typeof versions, "object");
    assert.equal(typeof versions.v1, "function");
    assert.equal(defaultVersion, "v1");
    assert.equal(maxVersion, "v1");
    assert.equal(typeof buildDataModels, "function");
});

test("buildStory constructs dataModels as 3rd layer and passes to pipeline", () => {
    const columnsConfig = [
        { key: "vchtype", label: "vchtype", type: "text" },
        { key: "vouchernumber", label: "voucher number", type: "number" }
    ];

    const renderers = {
        search: {},
        table: {
            header: {
                vouchernumber: { textContent: "Voucher Number" }
            },
            columns: ["vchtype", "vouchernumber"],
            footer: {
                summaryRow: {
                    vouchernumber: "sum"
                }
            }
        },
        form: {
            columns: ["vchtype", "vouchernumber"]
        }
    };

    const story = buildStory({
        data: purchasesJson,
        columnsConfig,
        renderers
    });

    // Verify story properties
    assert.ok(story.store, "globalStore should exist");
    assert.ok(story.renderersStore, "renderersStore should exist");
    assert.ok(story.dataModels, "dataModels layer should exist");
    assert.ok(story.renderPipeline, "renderPipeline should exist");

    // Verify dataModels content
    assert.ok(story.dataModels.table, "table dataModel should exist");
    assert.ok(story.dataModels.form, "form dataModel should exist");

    assert.ok(Array.isArray(story.dataModels.table.tHead), "table tHead should be an array");
    assert.ok(Array.isArray(story.dataModels.table.tBody), "table tBody should be an array");
    assert.ok(Array.isArray(story.dataModels.table.tFoot), "table tFoot should be an array");

    assert.equal(story.dataModels.table.tHead.length, 2);
    assert.equal(story.dataModels.table.tHead[0].key, "vchtype");
    assert.equal(story.dataModels.table.tHead[1].key, "vouchernumber");

    assert.ok(Array.isArray(story.dataModels.form.fields), "form fields should be an array");
    assert.equal(story.dataModels.form.fields.length, 2);
    assert.equal(story.dataModels.form.fields[0].key, "vchtype");
    assert.equal(story.dataModels.form.fields[1].key, "vouchernumber");

    // Verify pipeline runs with dataModels
    const renderedNodes = runRenderPipeline({
        inPipeline: story.renderPipeline,
        inRenderersStore: story.renderersStore,
        inDataModels: story.dataModels
    });

    assert.equal(renderedNodes.length, 3, "Pipeline should return 3 tasks (search, table, form)");
    assert.ok(renderedNodes[0] !== null, "Search node should exist");
    assert.ok(renderedNodes[1] !== null, "Table node should exist");
    assert.ok(renderedNodes[2] !== null, "Form node should exist");
});
