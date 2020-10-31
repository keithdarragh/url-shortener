<template>
  <div id="add-url">
    <form id="signup-form" @submit.prevent="submitUrl">
      <label for="first name">Url:</label>
      <input type="text" v-model="url" required>
      <p class="error" >{{ urlError }}</p>
      <div class="field has-text-right">
        <button type="submit" class="button is-danger">Submit</button>
      </div>
    </form>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

interface AddUrlInterface {
  url: string;
  urlError: string;
}

export default defineComponent({
  name: 'AddUrl',
  data: (): AddUrlInterface => ({
    url: '',
    urlError: '',
  }),
  emits: ['addedUrl'],
  methods: {
    isValidUrl(urlString: string): boolean {
      const r = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
      return r.test(urlString);
    },
    submitUrl() {
      if (this.isValidUrl(this.url as string)) {
        axios.post('http://localhost:8080/shortUrl', {
          fullUrl: this.url,
        })
          .then((response) => {
            console.log(response);
            this.url = '';
            // eslint-disable-next-line vue/custom-event-name-casing
            this.$emit('addedUrl', 'someValue');
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.urlError = 'Please enter a valid url';
      }
    },
  },
});
</script>

<style>
.error {
  color: red;
}
</style>
