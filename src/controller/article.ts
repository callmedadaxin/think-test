import Base from './base.js';
import ArticleModel, { IArticle, IListOptions } from '../model/article'

interface IQuery {
  sort?: object,
  tag?: string,
  type?: string,
}

export default class extends Base {
  /**
   * 获取article model
   */
  private getArticleModel(): ArticleModel {
    return this.mongoose('article') as ArticleModel
  }
  /**
   * 查询列表
   */
  public async indexAction() {
    const articleModel = this.getArticleModel()
    const {
      tag = '',
      type = '',
      current_page = 1,
      page_size = 10
    } = this.get()

    let query: IQuery = {}
    let options = {
      page: Number(current_page),
      limit: Number(page_size)
    }

    if (tag) query.tag = tag
    if (type) query.type = type

    const article = await this.safetyExcuteService(
      () => articleModel.getListByPage(query, options)
    )

    this.success({
      list: article.docs,
      page: {
        page: article.page,
        limit: article.limit,
        total: article.total,
        pages: article.pages
      }
    })
  }
  public async allListAction () {
    const articleModel = this.getArticleModel()
    const query: IQuery = {}
    const options: IListOptions = {
      select: '_id title create_at',
      populate: []
    }

    const article = await this.safetyExcuteService(
      () => articleModel.getList(query, options)
    )

    this.success(article)
  }
  public async archiveAction () {
    const articleModel = this.getArticleModel()
    const article = await this.safetyExcuteService(
      () => articleModel.getArchiveList()
    )

    this.success(article)
  }
  /**
   * 文章详情
   */
  public async detailAction () {
    const params: {
      id: string
    } = this.get()
    const articleModel = this.getArticleModel()
    const article = await this.safetyExcuteService(
      () => articleModel.getItemDetail(params.id)
    )
    this.success(article)
  }
  /**
   * 新增type
   */
  public async addAction () {
    const article: IArticle = this.post('title,desc,content,tag,type,create_at,update_at') as IArticle
    const articleModel: ArticleModel = this.getArticleModel()

    const result = await this.safetyExcuteService(
      () => articleModel.addItem(article)
    )
    this.success(result)
  }
  /**
   * 删除
   */
  public async deleteAction () {
    const post: {
      id: string
    } = this.post() as {
      id: string
    }

    const articleModel = this.getArticleModel()

    const result = await this.safetyExcuteService(
      () => articleModel.deleteItem(post.id)
    )
    this.success(result)
  }
  /**
   * 更新
   */
  public async updateAction() {
    const {
      id,
      ...others
    } = this.post() as IArticle
    const articleModel  = this.getArticleModel()

    const result = await this.safetyExcuteService(
      () => articleModel.updateItem(id, others)
    )
    this.success(result)
  }
}
