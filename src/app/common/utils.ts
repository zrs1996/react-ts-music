namespace utils {
    export interface DeepCopy {
        source: [] | {},
        target: [] | {}
    }
}

export const deepCopy = (target: utils.DeepCopy['target'], source: utils.DeepCopy['source'], isDeep = false) => {
    if (!isDeep) {
        return JSON.parse(JSON.stringify(source))
    }
    return target
}