<template>
 <div id='display-url'>
   <table class="center hide-mobile" >
    <tr >
      <th>Full url</th>
      <th>Short Url</th>
    </tr>
    <tr v-for="(url, x) in urls" :key="x">
      <td>{{url.fullUrl}}</td>
      <td>{{url.shortUrl}}</td>
    </tr>
   </table>
   <table class="center show-mobile" v-for="(url, x) in urls" :key="x">
    <tr >
      <th>Full url</th>
      <td>{{url.fullUrl}}</td>
    </tr>
    <tr >
      <th>Short Url</th>
      <td>{{url.shortUrl}}</td>
    </tr>
   </table>
 </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DisplayUrl',
  props: {
    urls: Array,
  },
});
</script>

<style>
.center {
  margin-left: auto;
  margin-right: auto;
  table-layout: fixed;
  width: 30em;
}
@media (max-width: 500px) {
      .center {
        margin-left: 0;
        margin-right: 0;
        table-layout: fixed;
        width: 15em;
      }
}
@media (max-width: 480px) {
      .show-mobile {
        display: inline-table;
      }
      .hide-mobile {
        display: none;
      }
      #display-url {
        width: 0;
      }
    }

 @media (min-width: 481px) {
      .show-mobile {
        display: none;
      }
      .hide-mobile {
        display: inline-table;
      }
 }

</style>
