<template>
  <div>
    <div class="contents">
      <Post
        v-for="post in loadedContents"
        v-bind:key="post.summary.title"
        v-bind:summary="post.summary"
        v-bind:content="post.content"
      ></Post>
    </div>
    <div class="load-more" v-if="hasMoreContent">
      <button class="load-more-button" v-on:click="fetchMore()">Load Older Posts</button>
    </div>
  </div>
</template>

<script lang="ts">
import Post from './Post.vue';
import Vue from 'vue';
import config from '../config';
import Store from '../store';

async function fetchContents(store: Store, params: any) {
  if (params.title) {
    await store.filterContentsByTitle(params.title);
  } else {
    await store.filterContentsByTag(params.tag);
  }
  await store.fetchMore();
}

function contentType(selectedContentType: string) {
  return selectedContentType || config.defaultContentType;
}

export default Vue.component('Contents', {
  props: {
    contentType: String
  },
  components: {
    Post
  },
  data() {
    const store = new Store(contentType(this.contentType), config.postsPerPage);
    return store.data;
  },
  created(): void {
    fetchContents(this.store, this.$route.params);
  },
  computed: {
    tag(): string { return this.$route.params.tag; },
    siteTitle(): string { return config.title; },
    hasMoreContent(): boolean { return this.store.hasMoreFetchableContent(); }
  },
  watch: {
    $route(to, from): void {
      this.store.setContentType(this.contentType);
      fetchContents(this.store, this.$route.params);
    }
  },
  methods: {
    fetchMore(): void {
      this.store.fetchMore();
    }
  }
});

</script>

<style src="../stylesheets/contents.css"></style>