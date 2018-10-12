import Base from './base.js';

export default class extends Base {
  getTypeModel() {
    return this.mongoose('types');
  }
  /**
   * 查询列表
   */
  async indexAction() {
    const typeModel = this.getTypeModel();
    const types = await typeModel.getList();
    this.success(types);
  }
  /**
   * 新增type
   */
  async addAction() {
    const type = this.post('name,desc');
    const typeModel = this.getTypeModel();

    const result = await this.safetyExcuteService(
      () => typeModel.addItem(type)
    );
    this.success(result);
  }
  /**
   * 删除
   */
  async deleteAction() {
    const { id } = this.post();
    const typeModel = this.getTypeModel();

    const result = await this.safetyExcuteService(
      () => typeModel.deleteItem(id)
    );
    this.success(result);
  }
  /**
   * 更新
   */
  async updateAction() {
    const { id, name, desc } = this.post('id,name,desc');
    const typeModel = this.getTypeModel();

    const result = await this.safetyExcuteService(
      () => typeModel.updateItem(id, {
        name,
        desc
      })
    );
    this.success(result);
  }
}
