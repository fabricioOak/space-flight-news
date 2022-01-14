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
    <div id="container">
      <header id="header" class="h-30 p-4 bg-white">
        <!-- Main header -->
        <div class="p-4 flex justify-between items-center">
          <span></span>
          <div class="flex flex-row justify-center items-center">
            <div class="flex items-center pr-4">
              <input
                v-model="title"
                @keyup.enter="searchArticles()"
                type="text"
                placeholder="Search"
                class="w-full pr-10 pl-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-myBlue"
              />
              <div @click="searchArticles()">
                <svg
                  class="hover:text-myBlack transition cursor-pointer w-4 h-4 fill-current text-gray-500 -ml-8 z-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="black"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path
                    d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                  />
                </svg>
              </div>
            </div>
            <div class="flex items-center pl-4">
              <select
                v-model="sort"
                @change="getArticles()"
                class="border bg-white rounded px-3 py-2 outline-none"
                name="sort"
                id="sort"
              >
                <option value=""><label>Select</label></option>
                <option value="publishedAt">Mais antigas</option>
                <option value="id">Mais novas</option>
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
            class="w-2/3 flex items-center justify-between p-4 my-4"
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
              <p class="truncate">{{ article.summary }}</p>
              <button
                @click="
                  toggleModal();
                  getById(article.id);
                "
                class="transition hover:bg-myOrange hover:border-white border-2 border-myOrange p-2 mt-2 rounded-md"
              >
                Ver mais
              </button>
            </div>
          </div>
          <!-- Right Side -->
          <div
            v-if="article.id % 2 !== 0"
            class="w-2/3 flex items-center justify-between p-4 my-4"
          >
            <div class="h-56 w-7/12">
              <h2 class="font-bold text-xl text-myOrange">
                {{ article.title }}
              </h2>
              <div class="mb-2 flex items-center justify-between">
                <span class="text-xs">{{ getDate(article.publishedAt) }}</span>
                <span class="font-bold text-xs mr-2 p-2 rounded-md bg-myOrange">
                  {{ article.newsSite }}
                </span>
              </div>
              <p class="truncate">{{ article.summary }}</p>
              <button
                @click="
                  toggleModal();
                  getById(article.id);
                "
                class="transition hover:bg-myOrange hover:border-white border-2 border-myOrange p-2 mt-2 rounded-md"
              >
                Ver mais
              </button>
            </div>
            <div class="text-left m-2 w-5/12">
              <img class="card-image" :src="article.imageUrl" alt="" />
            </div>
          </div>
        </div>
        <div v-if="!loading">
          <button
            class="mb-4 bg-transparent hover:bg-myBlack text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded"
            @click="loadMore()"
          >
            Carregar mais
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="postcss">
.card-image {
  @apply bg-cover bg-center h-56 w-full p-2;
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

.spinner {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.spinner div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: spinner 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.spinner div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes spinner {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>

<script src="./Home"></script>
