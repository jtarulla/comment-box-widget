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
          v-for="{username, avatar_url, name} in filteredUsers"
          :key="username"
          @click="setUser(name), $refs.textarea.focus()">
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
      hint="Use '@' to reference another user"
      color="#202020"
      label="Comment"
      @keyup="onKeyChange"
      @keydown="onKeyDown"/>
  </div>
</template>

<script>
const AT_KEY = '@'
const ESCAPE_KEY = 'Escape'

export default {
  name: 'HypCommentBox',
  data: () => ({
    comment: '',
    input: '',
    listActive: false,
    users: [],
    atSignPosition: null,
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
  computed: {
    filteredUsers() {
        const rawInput = this.input.substring(1)
        const filteredUsers = this.users.filter(user => (
          user.name.toLowerCase().includes(rawInput.toLowerCase()) ||
          user.username.toLowerCase().includes(rawInput.toLowerCase())
        ))
      return (filteredUsers.length ? filteredUsers : this.users)
    },
  },
  methods: {
    onKeyChange(event) {
      if (event.key === AT_KEY) {
        this.positionX = this.$refs.textarea.$el.offsetLeft
        this.atSignPosition = this.comment.lastIndexOf('@')
        this.listActive = true
        return
      }
      if (event.key === ESCAPE_KEY && this.listActive) {
        this.input = ''
        this.listActive = false
      }
      if (this.listActive) {
        this.input = this.comment.slice(this.atSignPosition)
        if(this.input === '') this.listActive = false 
      }
    },
    onKeyDown(event) {
      if (this.listActive) this.$refs.menu.onKeyDown(event)
    },
    setUser(name) {
      this.comment = this.comment.slice(0, this.atSignPosition)
      this.comment += name + ' '
      this.input = ''
      this.listActive = false
    },
  }    
}
</script>

<style lang="scss" scoped>
.comment-box {
  margin-top: 120px !important;
}
</style>