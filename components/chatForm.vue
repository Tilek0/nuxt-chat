<template>
  <div>
    <v-flex xs12>
      <v-text-field
        label="enter your message"
        outline
        v-model="text"
        @keydown.enter="send"
      />
    </v-flex>
  </div>
</template>

<script>
export default {
  name: "chatFrom",
  data: () => ({
    text: ''
  }),
  methods: {
    async send() {
    let time = await new Date();
      time = `${time.getHours()}:${time.getMinutes()}`
      this.$socket.emit('createMessage', {
        text: this.text,
        time: time,
        id: this.$store.state.user.id,
      }, data => {
        if (typeof data === 'string') {
          console.error(data)
        } else {
          this.text = '';
        }
      })
    }
  }
}
</script>

<style></style>
