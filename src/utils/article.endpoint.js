import BaseEndpoint from "./base.endpoint";

const ArticleEndpoint = {
  article: {
    getArticles: (limit, sort) => BaseEndpoint.URL + "/articles?_limit=" + limit + "&_sort=" + sort,
    getById: (id) => BaseEndpoint.URL + "/articles/" + id,
    searchByTitle: (limit, title) => BaseEndpoint.URL + "/articles?_limit=" + limit + "&title_contains=" + title,
  }
}

export default ArticleEndpoint;