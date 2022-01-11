<template>
  <div id="home">
    <header id="header" class="p-4 flex justify-between items-center">
      <span></span>
      <div class="flex flex-row justify-center items-center">
        <div class="pr-4">
          <div class="border-2 flex items-center border-b border-teal-500">
            <input
              class="appearance-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Search"
              aria-label="Full name"
            />
            <button
              class="rounded-md flex-shrink-0 bg-myBlack hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-2 mr-2 p-2"
              type="button"
            >
              <img
                style="filter: invert(1)"
                src="../assets/mag-glass.svg"
                alt=""
              />
            </button>
          </div>
        </div>
        <div class="pl-4">
          <select class="p-2" name="sort" id="sort">
            <option value="old">Mais antigas</option>
            <option value="new">Mais novas</option>
          </select>
        </div>
      </div>
    </header>
    <main class="content">
      <div
        v-for="(article, index) in articles"
        :key="index.id"
        class="flex items-center justify-center"
      >
        <div>
          <img :src="article.imageUrl" alt="" />
        </div>
        <div>
          <h2>{{ article.title }}</h2>
          <p>{{ article.summary }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      articles: [],
      loading: true,
      error: "",
      sort: "",
    };
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    getArticles() {
      this.$store
        .dispatch("getArticles")
        .then((response) => {
          this.articles = response.data;
          this.loading = false;
        })
        .catch((error) => {
          this.error = error;
          this.loading = false;
          console.log(error);
        });
    },
  },
};
</script>
