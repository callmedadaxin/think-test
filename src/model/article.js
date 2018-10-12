import { think } from 'thinkjs';
import { Schema } from 'mongoose';
const mongoosePaginate = require('mongoose-paginate');

export default class extends think.Mongoose {
  get schema() {
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
    });
    // 兼容think populate
    think.mongoose('types');
    think.mongoose('tags');

    // 翻页插件
    schema.plugin(mongoosePaginate);
    return schema;
  }
  /**
   * 获取列表
   */
  getList(query = {}, options) {
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
    } = options;

    return this.find({
      ...query,
      status: 1
    }, select)
      .sort(sort)
      .populate(populate);
  }
  /**
   * 分页获取文章列表
   * @param query 查询query
   * @param options 分页参数
   */
  getListByPage(query = {}, options) {
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
    } = options;

    return this.paginate({
      ...query,
      status: 1
    }, {
      select,
      sort,
      populate,
      page,
      limit
    });
  }
  /**
   * 获取归档信息
   */
  getArchiveList() {
    return this.aggregate([{
      $project: {
        _id: '$_id',
        year: { $dateToString: { format: '%Y', date: '$create_at' } },
        time: { $dateToString: { format: '%Y-%m-%d', date: '$create_at' } },
        title: '$title'
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
        list: {$push: '$data'}
      }
    }, {
      $sort: {
        _id: -1
      }
    }]);
  }
  /**
   * 获取归档信息
   */
  getListGroupByTags() {
    return this.aggregate([{
      $lookup: {
        from: 'tags',
        localField: 'tag',
        foreignField: '_id',
        as: 'tag'
      }
    }, {
      $project: {
        tag: '$tag.name',
        data: {
          _id: '$_id',
          title: '$title'
        }
      }
    }, {
      $unwind: '$tag'
    }, {
      $group: {
        _id: '$tag',
        list: {
          $push: '$data'
        }
      }
    }]);
  }
  /**
   * 获取文章详情
   */
  getItemDetail(id) {
    return this.findById(id, {
      __v: false
    });
  }
  /**
   * add item
   */
  addItem(article) {
    return this.create(article);
  }
  /**
   * delete Item
   * 仅更新状态，不进行物理删除
   */
  deleteItem(id) {
    return this.findByIdAndUpdate(id, {
      status: 0
    });
  }
  /**
   * update Item
   */
  updateItem(id, article) {
    return this.findByIdAndUpdate(id, article);
  }
}
