<template>
  <div class="cWrap">
    <div class="cWrap-chat" ref="block">
      <transition-group name="fadeMessage">
        <message
          v-for="message in messages" :key="message.text"
          :name="message.name"
          :text="message.text"
          :owner="message.id === user.id"
          :time="message.time"
          @deleteMessage="deleteMessage(message)"
        />
      </transition-group>
    </div>
    <div class="cWrap-form">
      <chat-form />
    </div>
  </div>
</template>

<script>
import message from "../components/message";
import chatForm from "../components/chatForm";
import { mapState } from "vuex";
export default {
  data() {
    return {
      time: null,
    }
  },
  name: "chat",
  components: {
    message,
    chatForm
  },
  middleware: ['chat'],
  head() {
    return {
      title: `Room ${this.user.room}`
    }
  },
  computed: mapState(['user', 'messages']),
  watch: {
    messages() {
      setTimeout(() => {
        this.$refs.block.scrollTop = this.$refs.block.scrollHeight;
      });
    }
  },
  methods: {
    deleteMessage(message) {
      this.$socket.emit('deleteMessage', {
        text: message.text,
        id: message.id,
      }, data => {
        if (typeof data === 'string') {
          console.error(data)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.cWrap {
  height 100%
  position relative
  overflow hidden
  &-chat {
    position absolute
    top 0
    left 0
    right 0
    bottom 80px
    padding 1rem
    overflow-y auto
    .fadeMessage-enter-active,
    .fadeMessage-leave-active {
      transition: all .5s ease;
    }
    .fadeMessage-enter,
    .fadeMessage-leave-to {
      transform: translateY(-9.6vh);
    }
  }
  &-form {
    position absolute
    bottom 0
    left 0
    right 0
    height 59px
    background rgba(255, 255, 255, 0.2);
    backdrop-filter blur(2px);
    border 1px solid rgba(255, 255, 255, 0.2);
    border-right-color rgba(255, 255, 255, 0.3);
    border-bottom-color rgba(255, 255, 255, 0.1);
    box-shadow 0 20px 30px rgba(0, 0, 0, 0.3);
  }
}
</style>
