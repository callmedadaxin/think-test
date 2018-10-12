import Base from './base.js';

export default class extends Base {
  getTagModel() {
    return this.mongoose('tags');
  }
  /**
   * 查询列表
   */
  async indexAction() {
    const tagModel = this.getTagModel();
    const tags = await tagModel.getList();
    this.success(tags);
  }
  /**
   * 新增type
   */
  async addAction() {
    const tag = this.post('name,desc');
    const tagModel = this.getTagModel();

    const result = await this.safetyExcuteService(
      () => tagModel.addItem(tag)
    );
    this.success(result);
  }
  /**
   * 删除
   */
  async deleteAction() {
    const { id } = this.post();
    const tagModel = this.getTagModel();

    const result = await this.safetyExcuteService(
      () => tagModel.deleteItem(id)
    );
    this.success(result);
  }
  /**
   * 更新
   */
  async updateAction() {
    const { id, name, desc } = this.post('id,name,desc');
    const tagModel = this.getTagModel();

    const result = await this.safetyExcuteService(
      () => tagModel.updateItem(id, {
        name,
        desc
      })
    );
    this.success(result);
  }
}
