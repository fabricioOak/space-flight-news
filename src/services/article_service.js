import ApiService from "./api_service";
import ArticleEndpoint from "../utils/article.endpoint";

const ArticleService = {
  async getArticles(limit) {
    return await ApiService.get(ArticleEndpoint.article.getArticles(limit));
  },
  async getById(id) {
    return await ApiService.get(ArticleEndpoint.article.getById(id));
  }
};

export default ArticleService;