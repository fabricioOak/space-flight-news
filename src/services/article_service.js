import ApiService from "./api_service";
import ArticleEndpoint from "../utils/article.endpoint";

const ArticleService = {
  async getArticles() {
    return await ApiService.get(ArticleEndpoint.article.getArticles);
  }
};

export default ArticleService;