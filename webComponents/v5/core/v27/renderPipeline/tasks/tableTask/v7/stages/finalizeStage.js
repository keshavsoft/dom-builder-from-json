import { buildSpecElement } from "../build/buildSpecElement.js";

/**
 * Stage 3: Finalizes and normalizes the completed spec tree via buildSpecElement
 * Follows in -> local parameter naming convention
 */
export const finalizeSpecTree = ({ inSpecTree }) => {
    const localSpecTree = inSpecTree;

    const finalSpecTree = buildSpecElement({ inSpec: localSpecTree });
    console.log("=== [v6: Final Spec Tree after buildSpecElement] ===", JSON.parse(JSON.stringify(finalSpecTree)));

    return finalSpecTree;
};

export default finalizeSpecTree;
