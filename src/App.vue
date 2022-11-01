<template>
  <v-app>
    <Home />
  </v-app>
</template>

<script>
import Home from './views/Home.vue';

export default {
  name: 'App',
  components: {
    Home,
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
