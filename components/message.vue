<template>
  <div>
    <div v-if="name === 'admin'" class="system">
      <p class="text-xs-center">{{text}}</p>
      <hr>
    </div>
    <div v-else class="wrap">
      <div class="wrap-mess" :class="{owner}">
        <div class="wrap-mess_text">
          <small><strong>{{name}}</strong></small>
          <p>{{text}}</p>
        </div>
        <p class="wrap-mess_time">{{time}}</p>
        <div v-if="owner" @click="messageOption" class="wrap-mess_button"><img src="../assets/icons/exit.png" alt="#"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "message",
  props: {
    name: String,
    text: String,
    time: String,
    owner: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    messageOption() {
      this.$emit('deleteMessage')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .system {
    margin-bottom 1rem
    p {
      margin-bottom 1rem
    }
  }
  .wrap {
    display flex
    flex-direction column
    &-mess {
      padding 1rem
      margin 0 1rem
      border-radius 4px
      background rgba(100, 255, 255, 0.2);
      backdrop-filter blur(2px);
      border 1px solid rgba(255, 255, 255, 0.2);
      border-right-color rgba(255, 255, 255, 0.3);
      border-bottom-color rgba(255, 255, 255, 0.1);
      box-shadow 0 20px 30px rgba(0, 0, 0, 0.3);
      width 50%
      position: relative
      margin-bottom 1rem
      p {
        margin-bottom 0
      }
      &_time{
        position absolute
        top 35%
        right 5%
      }
      &_button {
        background gray
        color white
        width 25px
        height 25px
        text-align center
        position absolute
        border-radius 50%
        right 4%
        cursor: pointer
        transition .4s ease
        background rgba(255, 255, 255, 0.2);
        backdrop-filter blur(2px);
        border 1px solid rgba(255, 255, 255, 0.2);
        border-right-color rgba(255, 255, 255, 0.3);
        border-bottom-color rgba(255, 255, 255, 0.1);
        box-shadow 0 20px 30px rgba(0, 0, 0, 0.3);
        img {
          width 100%
          height 100%
        }
        &:hover {
          background #1976d2
        }
      }
    }
    .owner {
      background rgba(255, 255, 255, 0.2);
      backdrop-filter blur(2px);
      border 1px solid rgba(255, 255, 255, 0.2);
      border-right-color rgba(255, 255, 255, 0.3);
      border-bottom-color rgba(255, 255, 255, 0.1);
      box-shadow 0 20px 30px rgba(0, 0, 0, 0.3);
      color black
      align-self flex-end
    }
  }
</style>
