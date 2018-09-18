import { think } from 'thinkjs';
export default class extends think.Controller {
  __before() {
  }
  protected async safetyExcuteService(fn: any) {
    try {
      return await fn()
    } catch (error) {
      return this.fail(-1, '服务器内部错误')
    }
  }
}
