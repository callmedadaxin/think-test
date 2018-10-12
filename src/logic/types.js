import Base from './base';

export default class extends Base {
  indexAction() {
    this.allowMethods = 'get,post';
  }
  async addAction() {
    this.allowMethods = 'post';
    const isParamsOk = this.validateAndReturnMessage({
      name: {
        required: true
      }
    });
    return isParamsOk
      ? this.validateHasItemExist('types', {
        name: this.post('name')
      })
      : isParamsOk;
  }
  async deleteAction() {
    this.allowMethods = 'post';
    return this.requireId();
  }
  async updateAction() {
    this.allowMethods = 'post';
    return this.requireId();
  }
  requireId() {
    return this.validateAndReturnMessage({
      id: {
        required: true
      }
    });
  }
}
