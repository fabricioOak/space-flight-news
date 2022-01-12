<template>
  <div>
    <div
      class="border-2 border-white w-2/3 flex items-center justify-between p-4 my-2"
    >
      <div class="text-left m-2 h-full w-5/12">
        <img class="card-image" :src="imageUrl" alt="" />
      </div>
      <div class="h-56 w-7/12">
        <h2 class="drop-shadow-sm font-bold text-xl text-myOrange">
          {{ title }}
        </h2>
        <div class="mb-2 flex items-center justify-between">
          <span class="text-xs">{{ getDate(publishedAt) }}</span>
          <span class="font-bold text-xs mr-2 p-2 rounded-md bg-myOrange">
            {{ newsSite }}
          </span>
        </div>
        <p>{{ summary }}</p>
      </div>
      <a :href="url" class="border-2 border-myOrange p-2 mt-2 rounded-md">
        Ir para o site
      </a>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
export default {
  name: "large-modal",
  props: {
    title: String,
    imageUrl: String,
    summary: String,
    publishedAt: String,
    newsSite: String,
    url: String,
  },

  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    getDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>
