import Base from './base.js';

export default class extends Base {
  rest = true

  async indexAction() {
    if (this.isGet) {
      const types = await this.mongoose('types').getList()
      this.success(types)
    }
    if (this.isPost) {
      return await this.action('types', 'add')
    }
  }
  async addAction () {
    const type = this.ctx.post('name,desc')

    try {
      const result = await this.mongoose('types').add(type)
      
      this.success(result)
    } catch (error) {
      this.fail(-1, '服务器内部出错!')
    }
  }
}
