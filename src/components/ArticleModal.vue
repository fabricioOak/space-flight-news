<template>
  <div>
    <div
      class="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
    >
      <div
        class="z-50 flex items-center justify-between flex-col border-2 rounded-lg border-white w-2/3 bg-myBlack p-4 my-2"
      >
        <div class="flex items-center justify-between">
          <div class="text-left m-2 h-full w-5/12">
            <img class="card-image" :src="imageUrl" alt="" />
          </div>
          <div class="h-56 w-7/12">
            <h2 class="drop-shadow-sm font-bold text-xl text-myOrange">
              {{ title }}
            </h2>
            <div class="mb-2 flex items-center justify-between">
              <span class="text-white text-xs">{{ getDate(publishedAt) }}</span>
              <span
                class="font-bold text-xs mr-2 p-2 rounded-md text-white bg-myOrange"
              >
                {{ newsSite }}
              </span>
            </div>
            <p class="overflow-y-scroll h-32 text-white">{{ summary }}</p>
          </div>
        </div>
        <div class="mt-4">
          <a
            :href="url"
            target="__blank"
            class="transition hover:border-white hover:bg-myOrange hover:text-white border-2 border-myOrange rounded mx-2 p-2 text-white"
            >Ir para o site</a
          >
          <a
            @click="$emit('input')"
            class="transition hover:border-white hover:bg-myOrange hover:text-white border-2 border-myOrange rounded mx-2 cursor-pointer p-2 text-white"
            >Fechar</a
          >
        </div>
      </div>
    </div>
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
    getDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>
