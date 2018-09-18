import { think } from 'thinkjs';

export interface IType {
  // 标签名称
  name: string,

  // 标签描述
  desc?: string
}

export default class extends think.Mongoose {
  get schema () {
    return {
      name: String,
      desc: String
    }
  }
  /**
   * get type list
   */
  public getList (query : object = {}) {
    return this.find(query).populate('_id,name,desc')
  }
  /**
   * add item
   */
  public addItem (type: IType) {
    return this.create(type)
  }
  /**
   * delete Item
   */
  public deleteItem(id: string) {
    return this.findByIdAndDelete(id)
  }
  /**
   * update Item
   */
  public updateItem(id: string, type: IType) {
    return this.findByIdAndUpdate(id, type)
  }
}
