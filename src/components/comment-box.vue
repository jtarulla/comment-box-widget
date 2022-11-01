<template>
  <div class="comment-box">
    <v-menu
      ref="menu"
      v-model="listActive"
      :position-x="positionX"
      :position-y="positionY">
      <v-list
        class="comment-box__user-list"
          height="150"
        width="250">
        <v-list-item
          v-for="{username, avatar_url, name} in users"
          :key="username">
          <v-list-item-avatar>
            <v-img
              :alt="`${username} avatar`"
              :src="avatar_url"/>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="name"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-textarea
      ref="textarea"
      class="comment-box__textarea"
      v-model="comment"
      outlined
      clearable
      hint="Use '@' to reference another user"
      color="#202020"
      label="Comment"
      @keyup="onKeyChange"/>
  </div>
</template>

<script>
const AT_KEY = '@'

export default {
  name: 'HypCommentBox',
  data: () => ({
    comment: '',
    listActive: false,
    users: [],
    positionX: 0,
    positionY: 35,
  }),
  created () {
    fetch("/api/users")
      .then((res) => res.json())
      .then((json) => {
        this.users = json.users
      })
  },
  methods: {
    onKeyChange(event) {
      if (event.key === AT_KEY) {
        this.positionX = this.$refs.textarea.$el.offsetLeft
        this.listActive = true
        return
      }
    },
  }    
}
</script>

<style lang="scss" scoped>
.comment-box {
  margin-top: 120px !important;
}
</style>