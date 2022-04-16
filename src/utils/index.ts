import { inject, InjectionKey } from 'vue'
/**
 * 抛出错误是利用 TypeScript 类型检查特性的一种方法。
 * 因为我们在早期处理了 undefined 的组件，所以如果实际使用的时候不添加 product类型 ，
 * 代码就无法正常运行到最后一行。
 * https://juejin.cn/post/7000339697142595592
 *
 * @param key
 * @param fallback
 * @returns
 */
export function injectStrict<T>(key: InjectionKey<T>, fallback?: T) {
  const resolved = inject(key, fallback)
  if (!resolved) {
    throw new Error(`Could not resolve ${key.description}`)
  }
  return resolved
}
