import { think } from 'thinkjs';
import { ITag } from './tags'
import { IType } from './types';
import { Schema } from 'mongoose'

export interface IArticle {
  id: string,

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
    const schema = new Schema({
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

      // 状态 1 发布 0 删除
      status: {
        type: Number,
        default: 1
      },

      // 标签
      tag: [{
        type: Schema.Types.ObjectId,
        ref: `${this.tablePrefix}tags`
      }],

      // 分类
      type: {
        type: Schema.Types.ObjectId,
        ref: `${this.tablePrefix}types`
      }
    })
    think.mongoose('types')
    think.mongoose('tags')
    return schema
  }
  /**
   * get type list
   */
  public getList (query: object = {}) {
    return this.find({
      ...query,
      status: 1
    }, 'title desc type tag create_at update_at')
    .populate({
      path: 'tag',
      select: '_id name'
    })
    .populate({
      path: 'type',
      select: '_id name'
    })
  }
  /**
   * 获取文章详情
   */
  public getItemDetail(id: string) {
    return this.findById(id, {
      __v: false
    })
  }
  /**
   * add item
   */
  public addItem (article: IArticle) {
    return this.create(article)
  }
  /**
   * delete Item
   * 仅更新状态，不进行物理删除
   */
  public deleteItem(id: string) {
    return this.findByIdAndUpdate(id, {
      status: 0
    })
  }
  /**
   * update Item
   */
  public updateItem(id: string, article: object) {
    return this.findByIdAndUpdate(id, article)
  }
}
