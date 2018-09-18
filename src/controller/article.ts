import Base from './base.js';

export default class extends Base {
  /**
   * 查询列表
   */
  public async indexAction() {
    const article = await this.mongoose('article').getList()
    this.success(article)
  }
  /**
   * 新增type
   */
  public async addAction () {
    const article = this.post('title,desc,content,tag,type')
    const result = await this.safetyExcuteService(
      () => this.mongoose('article').addItem(article)
    )
    this.success(result)
  }
  /**
   * 删除
   */
  public async deleteAction () {
    const id = this.post('id')

    const result = await this.safetyExcuteService(
      () => this.mongoose('article').deleteItem(id)
    )
    this.success(result)
  }
  /**
   * 更新
   */
  public async updateAction() {
    const { id, name, desc } = this.post('id,name,desc')

    const result = await this.safetyExcuteService(
      () => this.mongoose('article').updateItem(id, {
        name,
        desc
      })
    )
    this.success(result)
  }
}
