import Base from './base.js';
import TypeModel, { IType } from '../model/types.js';

export default class extends Base {
  getTypeModel (): TypeModel {
    return this.mongoose('types') as TypeModel
  }
  /**
   * 查询列表
   */
  public async indexAction() {
    const typeModel = this.getTypeModel()
    const types = await typeModel.getList()
    this.success(types)
  }
  /**
   * 新增type
   */
  public async addAction () {
    const type: IType = this.post('name,desc') as IType
    const typeModel = this.getTypeModel()

    const result = await this.safetyExcuteService(
      () => typeModel.addItem(type)
    )
    this.success(result)
  }
  /**
   * 删除
   */
  public async deleteAction () {
    const { id } = this.post() as IType
    const typeModel = this.getTypeModel()

    const result = await this.safetyExcuteService(
      () => typeModel.deleteItem(id)
    )
    this.success(result)
  }
  /**
   * 更新
   */
  public async updateAction() {
    const { id, name, desc } = this.post('id,name,desc') as IType
    const typeModel = this.getTypeModel()

    const result = await this.safetyExcuteService(
      () => typeModel.updateItem(id, {
        name,
        desc
      })
    )
    this.success(result)
  }
}
