// import domTreeJsonFiles from "../../domTreeJsonFiles/index.js";

/**
 * Render Task Transformer: Creates and returns the search toolbar DOM element during rendering
 */
export const createSearchTask = ({
    inShowSearch = true,
    domTreeJsonFiles
} = {}) => {
    const localShowSearch = inShowSearch !== false;

    return () => {
        if (localShowSearch) {
            return domTreeJsonFiles.searchSpec;
        };

        return null;
    };
};

export default createSearchTask;
