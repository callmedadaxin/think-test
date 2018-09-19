import { think } from 'thinkjs';
import { Schema } from 'mongoose'

export interface IType {
  id: string

  // 标签名称
  name: string

  // 标签描述
  desc?: string
}

export default class extends think.Mongoose {
  baseModelName = 'Type'
  get schema () {
    const schema: Schema = new Schema({
      name: String,
      desc: String
    })
    schema.set('toObject', { getters: false })
    return schema 
  }
  /**
   * get type list
   */
  public getList (query : object = {}) {
    return this.find(query, {
      name: true,
      desc: true
    })
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
  public updateItem(id: string, type: object) {
    return this.findByIdAndUpdate(id, type)
  }
}
