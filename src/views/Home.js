import Modal from "../components/ArticleModal.vue";

export default {
  name: "Home",
  components: {
    Modal,
  },
  data() {
    return {
      articles: [],
      showModal: false,
      modalArticle: [],
      limit: 10,
      sort: "",
      title: "",
      loading: true,
      error: "",
    };
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    getArticles() {
      if (this.sort === "publishedAt") {
        this.$store
          .dispatch("getArticles", {
            limit: this.limit,
            sort: this.sort,
          })
          .then((response) => {
            this.articles = response.data;
            this.loading = false;
          })
          .catch((error) => {
            this.error = error;
            this.loading = false;
            console.log(error);
          });
      } else {
        this.$store
          .dispatch("getArticles", {
            limit: this.limit,
            sort: "publishedAt:desc",
          })
          .then((response) => {
            this.articles = response.data;
            this.loading = false;
          })
          .catch((error) => {
            this.error = error;
            this.loading = false;
            console.log(error);
          });
      }
    },
    searchArticles() {
      this.$store
        .dispatch("searchByTitle", {
          title: this.title,
          limit: this.limit,
        })
        .then((response) => {
          this.articles = response.data;
          this.loading = false;
          console.log(response);
        })
        .catch((error) => {
          this.error = error;
          this.loading = false;
          console.log(error);
        });
    },
    toggleModal() {
      this.showModal = true;
      document.getElementById("container").style.opacity = "0.55";
    },
    closeModal() {
      this.showModal = false;
      document.getElementById("container").style.opacity = "1";
    },
    getById(id) {
      this.$store
        .dispatch("getById", { id: id })
        .then((response) => {
          this.modalArticle = response.data;
          console.log(this.modalArticle);
        })
        .catch((error) => {
          this.error = error;
          console.log(error);
        });
    },
    loadMore() {
      this.limit += 10;
      this.getArticles();
    },
    getDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};