import { think } from 'thinkjs';
import { ITag } from './tags'
import { IType } from './types';
import { Schema } from 'mongoose'

export interface IArticle {
  // 文章标题
  title: string,

  // 描述
  desc: string,

  // 文章内容
  content: string,

  // 创建时间
  create_at: Date,

  // 修改时间
  update_at: Date,

  // 缩略图
  thumb: string,

  // 状态 1 发布 2 删除
  status: number,

  // 标签
  tag: ITag[],

  // 分类
  type: IType
}

export default class extends think.Mongoose {
  get schema () {
    return {
      // 文章标题
      title: String,

      // 描述
      desc: String,

      // 文章内容
      content: String,

      // 创建时间
      create_at: {
        type: Date,
        default: Date.now
      },

      // 修改时间
      update_at: {
        type: Date,
        default: Date.now
      },

      // 缩略图
      thumb: String,

      // 状态 1 发布 2 删除
      status: Number,

      // 标签
      tag: [{
        type: Schema.Types.ObjectId,
        ref: 'types'
      }],

      // 分类
      type: {
        type: Schema.Types.ObjectId,
        ref: 'tags'
      }
    }
  }
  /**
   * get type list
   */
  public getList (query : object = {}) {
    return this.find(query)
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
  public updateItem(id: string, tag: ITag) {
    return this.findByIdAndUpdate(id, tag)
  }
}
