import Base from './base.js';

export default class extends Base {
  /**
   * 查询列表
   */
  public async indexAction() {
    const tags = await this.mongoose('tags').getList()
    this.success(tags)
  }
  /**
   * 新增type
   */
  public async addAction () {
    const type = this.post('name,desc')

    const result = await this.safetyExcuteService(
      () => this.mongoose('tags').addItem(type)
    )
    this.success(result)
  }
  /**
   * 删除
   */
  public async deleteAction () {
    const id = this.post('id')

    const result = await this.safetyExcuteService(
      () => this.mongoose('tags').deleteItem(id)
    )
    this.success(result)
  }
  /**
   * 更新
   */
  public async updateAction() {
    const { id, name, desc } = this.post('id,name,desc')

    const result = await this.safetyExcuteService(
      () => this.mongoose('tags').updateItem(id, {
        name,
        desc
      })
    )
    this.success(result)
  }
}
