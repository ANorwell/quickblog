<template>
  <div>
    <div id="header">
      <div id="top">
        <div id="header-title">
          <h2><a href="/#/">{{ title }}</a></h2>
        </div>
      </div>
    </div>
    <div class="pages-links"
      v-for="page in contentSummaries"
      v-bind:key="page.title">
      <router-link :to="'/pages/' + page.title">
        {{ page.title }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Store from '../store';
import config from '../config';

const store = new Store(config.pagesContentType, config.postsPerPage);

export default Vue.component('SiteHeader', {
  props: {
    title: String
  },
  data: () => store.data,
  created(): void { store.filterContentsByTag(null); }
});
</script>
