import Base from './base.js';
import TagModal, { ITag } from '../model/tags'

export default class extends Base {
  getTagModel (): TagModal{
    return this.mongoose('tags') as TagModal
  }
  /**
   * 查询列表
   */
  public async indexAction() {
    const tagModel = this.getTagModel()
    const tags = await tagModel.getList()
    this.success(tags)
  }
  /**
   * 新增type
   */
  public async addAction () {
    const tag: ITag = this.post('name,desc') as ITag
    const tagModel = this.getTagModel()

    const result = await this.safetyExcuteService(
      () => tagModel.addItem(tag)
    )
    this.success(result)
  }
  /**
   * 删除
   */
  public async deleteAction () {
    const { id } = this.post() as ITag
    const tagModel = this.getTagModel()

    const result = await this.safetyExcuteService(
      () => tagModel.deleteItem(id)
    )
    this.success(result)
  }
  /**
   * 更新
   */
  public async updateAction() {
    const { id, name, desc } = this.post('id,name,desc') as ITag
    const tagModel = this.getTagModel()

    const result = await this.safetyExcuteService(
      () => tagModel.updateItem(id, {
        name,
        desc
      })
    )
    this.success(result)
  }
}
