/**
 * 获取生成（不重复 + 固定长度）的随机字符串函数
 * @param length 随机字符串的长度
 * @returns 生成（不重复 + 固定长度）的随机字符串函数
 */
export const getRandomStrFn = () => {
  const set = new Set()

  /**
   * 生成（不重复 + 固定长度）的随机字符串
   * @param length 随机字符串的长度
   * @returns 随机字符串
   */
  return function fn(length: number): string {
    const randomStr = Array.from(crypto.getRandomValues(new Uint8Array(length)))
      .map((value) => value.toString(16).padStart(1))
      .join('')
      .slice(0, length)

    if (set.has(randomStr)) {
      return fn(length)
    }
    set.add(randomStr)
    return randomStr
  }
}

/**
 * 深克隆
 * @param target 数据
 * @returns 克隆数据
 */
export const cloneDeep = (target: any) => {
  if (typeof target !== 'object') {
    return target
  }

  const weakMap = new WeakMap<object, object>()
  const fn = (target: any) => {
    if (typeof target === 'object' && target !== null) {
      if (weakMap.has(target)) {
        return weakMap.get(target)
      }
      let result

      if (Array.isArray(target)) {
        result = []
        weakMap.set(target, result)
        target.forEach((value) => {
          result.push(fn(value))
        })
      } else {
        result = {}
        weakMap.set(target, result)
        Object.keys(target).forEach((key) => {
          result[key] = fn(target[key])
        })
      }

      return result
    }
    return target
  }

  return fn(target)
}
