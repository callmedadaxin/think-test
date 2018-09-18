import Base from './base.js';

export default class extends Base {
  /**
   * 查询列表
   */
  public async indexAction() {
    const types = await this.mongoose('types').getList()
    this.success(types)
  }
  /**
   * 新增type
   */
  public async addAction () {
    const type = this.post('name,desc')

    const result = await this.safetyExcuteService(
      () => this.mongoose('types').addItem(type)
    )
    this.success(result)
  }
  /**
   * 删除
   */
  public async deleteAction () {
    const id = this.post('id')

    const result = await this.safetyExcuteService(
      () => this.mongoose('types').deleteItem(id)
    )
    this.success(result)
  }
  /**
   * 更新
   */
  public async updateAction() {
    const { id, name, desc } = this.post('id,name,desc')

    const result = await this.safetyExcuteService(
      () => this.mongoose('types').updateItem(id, {
        name,
        desc
      })
    )
    this.success(result)
  }
}
