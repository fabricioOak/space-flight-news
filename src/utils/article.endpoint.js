import BaseEndpoint from "./base.endpoint";

const ArticleEndpoint = {
  article: {
    getArticles: BaseEndpoint.URL + "/articles",
  }
}

export default ArticleEndpoint;