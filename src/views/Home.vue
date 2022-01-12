<template>
  <div id="home">
    <Modal
      @input="closeModal()"
      v-show="showModal"
      :url="this.modalArticle.url"
      :title="this.modalArticle.title"
      :summary="this.modalArticle.summary"
      :publishedAt="this.modalArticle.publishedAt"
      :newsSite="this.modalArticle.newsSite"
      :imageUrl="this.modalArticle.imageUrl"
    />

    <header id="header" class="h-30 p-4 bg-white">
      <!-- Main header -->
      <div class="p-4 flex justify-between items-center">
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
                  class="w-7 h-7"
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
      </div>
      <!-- Page title -->
      <div>
        <div class="flex items-center flex-col justify-center">
          <span
            class="roll-in-blurred-left rounded-full border-2 border-myBlack"
          >
            <img
              class="vibrate-1 p-12 h-60 w-60"
              src="../assets/space-rocket.svg"
              alt=""
            />
          </span>
          <p class="mt-4 text-3xl font-bold">
            Welcome aboard to the
            <span class="text-myOrange">Space Flight News</span>
          </p>
        </div>
      </div>
    </header>
    <div v-if="!loading" style="height: 150px; overflow: hidden">
      <svg
        class="w-full h-full bg-white"
        viewBox="0 0 500 150"
        preserveAspectRatio="none"
      >
        <path
          d="M0.00,49.98 C150.00,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
          style="stroke: none; fill: #302e53"
        ></path>
      </svg>
    </div>
    <main
      v-if="!loading"
      class="flex items-center flex-col container text-white bg-myBlue content"
    >
      <div
        class="flex items-center container justify-center"
        v-for="article in articles"
        :key="article.id"
      >
        <!-- Left Side -->
        <div
          v-if="article.id % 2 === 0"
          class="w-2/3 flex items-center justify-between p-4 my-2"
        >
          <div class="text-left m-2 h-full w-5/12">
            <img class="card-image" :src="article.imageUrl" alt="" />
          </div>
          <div class="h-56 w-7/12">
            <h2 class="drop-shadow-sm font-bold text-xl text-myOrange">
              {{ article.title }}
            </h2>
            <div class="mb-2 flex items-center justify-between">
              <span class="text-xs">{{ getDate(article.publishedAt) }}</span>
              <span class="font-bold text-xs mr-2 p-2 rounded-md bg-myOrange">
                {{ article.newsSite }}
              </span>
            </div>
            <p>{{ article.summary }}</p>
            <button
              @click="
                toggleModal();
                getById(article.id);
              "
              class="border-2 border-myOrange p-2 mt-2 rounded-md"
            >
              Ver mais
            </button>
          </div>
        </div>
        <!-- Right Side -->
        <div
          v-if="article.id % 2 !== 0"
          class="w-2/3 flex items-center justify-between p-4 my-2"
        >
          <div class="h-56 w-7/12">
            <h2 class="font-bold text-xl text-myOrange">{{ article.title }}</h2>
            <div class="mb-2 flex items-center justify-between">
              <span class="text-xs">{{ getDate(article.publishedAt) }}</span>
              <span class="font-bold text-xs mr-2 p-2 rounded-md bg-myOrange">
                {{ article.newsSite }}
              </span>
            </div>
            <p>{{ article.summary }}</p>
            <button
              @click="
                toggleModal();
                getById(article.id);
              "
              class="border-2 border-myOrange p-2 mt-2 rounded-md"
            >
              Ver mais
            </button>
          </div>
          <div class="text-left m-2 w-5/12">
            <img class="card-image" :src="article.imageUrl" alt="" />
          </div>
        </div>
      </div>
      <div>
        <button
          class="mb-4 bg-transparent hover:bg-myBlack text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded"
          @click="loadMore()"
        >
          Carregar mais
        </button>
      </div>
    </main>
  </div>
</template>

<script>
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
      loading: true,
      error: "",
      sort: "",
    };
  },
  mounted() {
    this.getArticles();
    console.log(this.showModal);
  },
  methods: {
    getArticles() {
      this.$store
        .dispatch("getArticles", {
          limit: this.limit,
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
    },
    toggleModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
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
</script>

<style lang="postcss">
.card-image {
  @apply bg-cover bg-center h-56 w-full;
  border-radius: 1em;
}

.roll-in-blurred-left {
  animation: roll-in-blurred-left 0.65s cubic-bezier(0.23, 1, 0.32, 1) both;
}

.vibrate-1:hover {
  animation: vibrate-1 0.3s linear infinite both;
}

@keyframes vibrate-1 {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
}
@keyframes roll-in-blurred-left {
  0% {
    transform: translateX(-1000px) rotate(-720deg);
    filter: blur(50px);
    opacity: 0;
  }
  100% {
    transform: translateX(0) rotate(0deg);
    filter: blur(0);
    opacity: 1;
  }
}
</style>
