<template>
  <div>
    <SiteHeader v-bind:title="siteTitle"></SiteHeader>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SiteHeader from './components/SiteHeader.vue';
import Store from './store';
import config from './config';

document.title = config.title;

export default Vue.component('App', {
  components: {
    SiteHeader
  },
  computed: {
    siteTitle(): string { return config.title; }
  }
});

</script>

