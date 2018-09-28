import { think } from 'thinkjs';
import { ITag } from './tags'
import { IType } from './types';
import { Schema } from 'mongoose'
const mongoosePaginate = require('mongoose-paginate')
// import mongoosePaginate from 

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

export interface IListOptions {
  select?: string,
  sort?: object,
  populate?: object[] | object | string
}

export interface IGetListPageOptions extends IListOptions {
  page: number,
  limit: number
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
    // 兼容think populate
    think.mongoose('types')
    think.mongoose('tags')

    // 翻页插件
    schema.plugin(mongoosePaginate)
    return schema
  }
  /**
   * 获取列表
   */
  public getList (query: object = {}, options: IListOptions) {
    const {
      select = 'title desc type tag create_at update_at thumb',
      sort = {
        create_at: -1
      },
      populate = [{
        path: 'tag',
        select: '_id name'
      }, {
        path: 'type',
        select: '_id name'
      }]
    } = options

    return this.find({
      ...query,
      status: 1
    }, select)
    .sort(sort)
    .populate(populate)
  }
  /**
   * 分页获取文章列表
   * @param query 查询query
   * @param options 分页参数
   */
  public getListByPage (query: object = {}, options: IGetListPageOptions) {
    const {
      select = 'title desc type tag create_at update_at thumb',
      sort = {
        create_at: -1
      },
      populate = [{
        path: 'tag',
        select: '_id name'
      }, {
        path: 'type',
        select: '_id name'
      }],
      page = 1,
      limit = 10
    } = options

    return this.paginate({
      ...query,
      status: 1
    }, {
      select,
      sort,
      populate,
      page,
      limit
    })
  }
  /**
   * 获取归档信息
   */
  public getArchiveList() {
    return this.aggregate([{
      $project: {
        _id: '$_id',
        year: { $dateToString: { format: "%Y", date: "$create_at" } },
        time: { $dateToString: { format: "%Y-%m-%d", date: "$create_at" } },
        title: '$title',
      }
    }, {
      $sort: {
        time: -1
      }
    }, {
      $project: {
        year: '$year',
        data: {
          _id: '$_id',
          title: '$title',
          time: '$time'
        }
      }
    }, {
      $group: {
        _id: '$year',
        list: {$push: '$data'},
      }
    }, {
      $sort: {
        _id: -1
      }
    }])
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
