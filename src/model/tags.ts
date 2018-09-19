import { think } from 'thinkjs';
import { Schema } from 'mongoose'

export interface ITag {
  id: string

  // 标签名称
  name: string

  // 标签描述
  desc?: string
}

export default class extends think.Mongoose {
  get schema () {
    const schema: Schema = new Schema({
      name: String,
      desc: String
    })
    schema.set('toObject')
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
  public addItem (tag: ITag) {
    return this.create(tag)
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
  public updateItem(id: string, tag: object) {
    return this.findByIdAndUpdate(id, tag)
  }
}
