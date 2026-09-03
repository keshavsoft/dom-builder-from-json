export const createElement = ({ inTagName }) => {
    const localTagName = inTagName;
    return {
        tagName: localTagName
    };
};

export default createElement;
