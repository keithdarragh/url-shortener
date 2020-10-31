<template>
  <img alt="Vue logo" src="./assets/primaryBidLogo.png">
  <h1>Url Shortener</h1>
  <UrlContainer/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UrlContainer from './components/UrlContainer.vue';

export default defineComponent({
  name: 'App',
  components: {
    UrlContainer,
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
img {
  width: 20em;
}
</style>
