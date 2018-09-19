import Base from './base.js';
import ArticleModel, { IArticle } from '../model/article'

interface IQuery {
  title?: string,
  tag?: string,
  type?: string
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
    const params: IQuery = this.get()
    let query: IQuery = {}

    if (params.tag) {
      query.tag = params.tag
    }
    if (params.type) {
      query.type = params.type
    }
    if (params.title) {
      query.title = params.title
    }
    const article = await articleModel.getList(query)
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
    const article = await articleModel.getItemDetail(params.id)
    this.success(article)
  }
  /**
   * 新增type
   */
  public async addAction () {
    const article: IArticle = this.post('title,desc,content,tag,type') as IArticle
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
