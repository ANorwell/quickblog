<template>
  <div> {{id}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.component('test', {
  props: {
    id: String
  }
});
</script>