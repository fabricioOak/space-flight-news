import BaseEndpoint from "./base.endpoint";

const ArticleEndpoint = {
  article: {
    getArticles: (limit) => BaseEndpoint.URL + "/articles?_limit=" + limit,
    getById: (id) => BaseEndpoint.URL + "/articles/" + id,
  }
}

export default ArticleEndpoint;