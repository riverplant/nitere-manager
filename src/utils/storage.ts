/**
 * localStorage模块封装
 */

export default {
  /**
   * storage save
   * @param key {string}
   * @param value {any}
   */
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  /**
   * storage load
   * @param key {string}
   * @returns
   */
  get(key: string) {
    const value = localStorage.getItem(key)
    if (!value) return ''
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  },
  /**
   * delete
   * @param key
   */
  remove(key: string) {
    localStorage.removeItem(key)
  },

  clear() {
    localStorage.clear()
  },
}
