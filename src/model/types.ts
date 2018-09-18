import { think } from 'thinkjs';

export default class extends think.Mongoose {
  get schema () {
    return {
      // 标签名称
      name: String,

      // 标签描述
      desc: String
    }
  }
  getList () {
    return this.find({})
  }
  add (type) {
    return this.create(type)
  }
}
