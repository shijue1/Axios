/**
 * 深度合并（简单版）
 * 注：仅合并对象中的自身可迭代属性，其他的都不合并，合并规则如下：
 * boolean、number、string、null、undefined、Array 和 function 类型采用覆盖的方式合并，
 * 除此以外的引用类型，使用深度合并。
 * @param { Object * n}  被合并对象，后者合并优先级高于前者
 * @returns 深度合并后的对象
 */
export const deepMerge = (...sources) => {
    const target = {}
    for (let i = 0; i < sources.length; i++) {
        const source = sources[i]
        for (let key in source) {
            if (!source.hasOwnProperty(key)) {
                continue
            }
            const value = source[key]
            if (typeof value !== 'object' || value === null || value.constructor === Array) {
                target[key] = value
            } else {
                target[key] = deepMerge(target[key], value)
            }
        }
    }
    return target
}

/**
 * 深度拷贝（简单版）
 * 注：仅拷贝对象中的自身可迭代属性，其他的都不拷贝，拷贝规则如下：
 * boolean、number、string、null、undefined 和 function 类型采用浅拷贝，
 * 除此以外的引用类型（对象和数组），使用深拷贝。
 * @param { Array | Object } source 被拷贝对象
 * @returns 深度拷贝后的对象
 */
export const deepCopy = (source) => {
    const target = {}
    const deepCopyArray = (array) => {
        return array.map(item => {
            if (typeof item !== 'object' || item === null) {
                return item
            } else if (item.constructor === Array) {
                return deepCopyArray(item)
            } else {
                return deepCopy(item)
            }
        })
    }
    for (let key in source) {
        if (!source.hasOwnProperty(key)) {
            continue
        }
        const value = source[key]
        if (typeof value !== 'object' || value === null) {
            target[key] = value
        } else if (value.constructor === Array) {
            target[key] = deepCopyArray(value)
        } else {
            target[key] = deepCopy(value)
        }
    }
    return target
}
