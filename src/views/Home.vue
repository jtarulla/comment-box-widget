<template>
  <div>
    <h2>Home</h2>
    <v-container>
      <v-row justify="center">
        <v-date-picker v-model="picker"></v-date-picker>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
    }
  },
}
</script>
