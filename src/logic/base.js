import { think } from 'thinkjs';

export default class extends think.Logic {
  /**
   * 通用的验证方法，若错误，则直接返回错误信息
   * @param rules 验证规则
   */
  validateAndReturnMessage(rules) {
    const flag = this.validate(rules);
    if (!flag) {
      const errors = this.validateErrors;
      return this.fail(
        this.config('validateDefaultErrno'),
        errors[Object.keys(errors)[0]]
      );
    }
    return true;
  }
  async validateHasItemExist(modelName, query = {}) {
    const has = await this.mongoose(modelName).findOne(query);
    if (has) {
      return this.fail(
        this.config('validateDefaultErrno'),
        '已经存在相同的元素'
      );
    }
  }
}
