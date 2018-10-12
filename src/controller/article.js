import Base from './base.js';

export default class extends Base {
  /**
   * 获取article model
   */
  getArticleModel() {
    return this.mongoose('article');
  }
  /**
   * 查询列表
   */
  async indexAction() {
    const articleModel = this.getArticleModel();
    const {
      tag = '',
      type = '',
      current_page: currentPage = 1,
      page_size: pageSize = 10
    } = this.get();

    const query = {};
    const options = {
      page: Number(currentPage),
      limit: Number(pageSize)
    };

    if (tag) query.tag = tag;
    if (type) query.type = type;

    const article = await this.safetyExcuteService(
      () => articleModel.getListByPage(query, options)
    );

    this.success({
      list: article.docs,
      page: {
        page: article.page,
        limit: article.limit,
        total: article.total,
        pages: article.pages
      }
    });
  }
  async allListAction() {
    const articleModel = this.getArticleModel();
    const query = {};
    const options = {
      select: '_id title create_at',
      populate: []
    };

    const article = await this.safetyExcuteService(
      () => articleModel.getList(query, options)
    );

    this.success(article);
  }
  /**
   * 文章归档
   */
  async groupAction() {
    const articleModel = this.getArticleModel();
    const article = await this.safetyExcuteService(
      () => articleModel.getListGroupByTags()
    );

    this.success(article);
  }
  /**
   * 文章归档
   */
  async archiveAction() {
    const articleModel = this.getArticleModel();
    const article = await this.safetyExcuteService(
      () => articleModel.getArchiveList()
    );

    this.success(article);
  }
  /**
   * 文章详情
   */
  async detailAction() {
    const params = this.get();
    const articleModel = this.getArticleModel();
    const article = await this.safetyExcuteService(
      () => articleModel.getItemDetail(params.id)
    );
    this.success(article);
  }
  /**
   * 新增type
   */
  async addAction() {
    const article = this.post('title,desc,content,tag,type,create_at,update_at,thumb');
    const articleModel = this.getArticleModel();

    const result = await this.safetyExcuteService(
      () => articleModel.addItem(article)
    );
    this.success(result);
  }
  /**
   * 删除
   */
  async deleteAction() {
    const post = this.post();

    const articleModel = this.getArticleModel();

    const result = await this.safetyExcuteService(
      () => articleModel.deleteItem(post.id)
    );
    this.success(result);
  }
  /**
   * 更新
   */
  async updateAction() {
    const {
      id,
      ...others
    } = this.post();
    const articleModel = this.getArticleModel();

    const result = await this.safetyExcuteService(
      () => articleModel.updateItem(id, others)
    );
    this.success(result);
  }
}
