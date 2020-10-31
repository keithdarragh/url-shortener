<template>
  <AddUrl @addedUrl="onEnlargeText"/>
  <DisplayUrl v-bind:urls="urls"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import AddUrl from './Add.vue';
import DisplayUrl from './DisplayUrl.vue';

export default defineComponent({
  name: 'UrlContainer',
  components: {
    AddUrl,
    DisplayUrl,
  },
  methods: {
    getAllUrls() {
      axios.get('http://localhost:8080/shortUrl')
        .then((response) => {
          console.log(response);
          this.urls = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onEnlargeText() {
      console.log('enlarging text');
      this.getAllUrls();
    },
  },
  data: () => ({
    urls: [],
    parentmessage: '',
  }),
  created() {
    this.getAllUrls();
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
