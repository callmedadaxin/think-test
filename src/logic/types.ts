import Base from './base'

export default class extends Base {
  public indexAction() {
    this.allowMethods = 'get,post'
  }
  public async addAction () {
    this.allowMethods = 'post'
    const isParamsOk = this.validateAndReturnMessage({
      name: {
        required: true
      }
    })
    return isParamsOk
      ? await this.validateHasItemExist({
        name: this.post('name')
      })
      : isParamsOk
  }
  public async deleteAction () {
    this.allowMethods = 'post'
    return this.requireId()
  }
  public async updateAction () {
    this.allowMethods = 'post'
    return this.requireId()
  }
  private requireId () {
    return this.validateAndReturnMessage({
      id: {
        required: true
      }
    })
  }
}
