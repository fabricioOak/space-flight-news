import ApiService from "./api_service";
import ArticleEndpoint from "../utils/article.endpoint";

const ArticleService = {
  async getArticles(limit, sort) {
    return await ApiService.get(ArticleEndpoint.article.getArticles(limit, sort));
  },
  async getById(id) {
    return await ApiService.get(ArticleEndpoint.article.getById(id));
  },
  async searchByTitle(limit, title) {
    return await ApiService.get(ArticleEndpoint.article.searchByTitle(limit, title));
  }
};

export default ArticleService;