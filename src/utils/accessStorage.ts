/**
 * @param keyName 储存的key
 * @param storage 存储的方式（传字符串）：localStorage和sessionStorage，默认localStorage
 * @returns
 */
export function getAccessStorage(keyName: string, storage?: string): string {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.getItem(keyName) || ''
    } else if ('sessionStorage' === storage) {
      return sessionStorage.getItem(keyName) || ''
    } else {
      return localStorage.getItem(keyName) || ''
    }
  } else {
    return localStorage.getItem(keyName) || ''
  }
}

/**
 *
 * @param keyName 储存的key
 * @param keyValue 值
 * @param storage 存储的方式（传字符串）：localStorage和sessionStorage，也可以在config配置，默认localStorage
 * @returns
 */
export function setAccessStorage(keyName: string, keyValue: string, storage?: string): void {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.setItem(keyName, keyValue)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.setItem(keyName, keyValue)
    } else {
      return localStorage.setItem(keyName, keyValue)
    }
  } else {
    return localStorage.setItem(keyName, keyValue)
  }
}

/**
 *
 * @param keyName 要删除的key
 * @param storage 删除的位置（传字符串）：localStorage还是sessionStorage，默认localStorage
 * @returns
 */
export function removeAccessStorage(keyName: string, storage?: string): void {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.removeItem(keyName)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.clear()
    } else {
      return localStorage.removeItem(keyName)
    }
  } else {
    return localStorage.removeItem(keyName)
  }
}
