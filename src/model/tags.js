import { think } from 'thinkjs';
import { Schema } from 'mongoose';

export default class extends think.Mongoose {
  get schema() {
    const schema = new Schema({
      name: String,
      desc: String
    });
    schema.set('toObject');
    return schema;
  }
  /**
   * get type list
   */
  getList(query = {}) {
    return this.find(query, {
      name: true,
      desc: true
    });
  }
  /**
   * add item
   */
  addItem(tag) {
    return this.create(tag);
  }
  /**
   * delete Item
   */
  deleteItem(id) {
    return this.findByIdAndDelete(id);
  }
  /**
   * update Item
   */
  updateItem(id, tag) {
    return this.findByIdAndUpdate(id, tag);
  }
}
