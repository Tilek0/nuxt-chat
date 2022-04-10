<template>
  <v-layout mt-5 column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card class="card">
        <v-snackbar
          v-model="snackbar"
          width="100"
          :timeout="6000"
          top
        >
          {{ message }}
          <v-btn
            color="pink"
            flat
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </v-snackbar>
        <v-card-title>
          <h1>Nuxt chat</h1>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="enter the room"
              required
            ></v-text-field>
            <v-layout
              row min-width="400"
              justify-space-between
            >
              <div
                v-for="img in image"
                :key="img"
                class="image"
                :class="{check: selectedImg === img}"
                @click="pickImg(img)"
              >
                <v-img :src="require(`~/assets/icons/${img}.png`)"/>
              </div>
            </v-layout>
            <transition name="error">
              <div v-if="imgError" class="errorImg">choose a picture</div>
            </transition>
            <v-btn
              :disabled="!valid"
              color="primary"
              @click="submit"
            >
              Enter
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  layout: "empty",
  head: {
    title: 'Welcome to Nuxt Chat'
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
    }
  },
  data: () => ({
    image: [
      'cowboy',
      'girl',
      'sailor',
      'sportsman',
      'woman',
    ],
    imgError: false,
    selectedImg: '',
    snackbar: false,
    valid: true,
    message: '',
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 16) || 'Name must be less than 16 characters'
    ],
    room: '',
    roomRules: [
      v => !!v || 'Room is required',
    ],
  }),
  mounted() {
    const {message} = this.$route.query
    if (message === 'noUser') {
      this.message = 'Add data'
    } else if (message === 'leftChat') {
      this.message = 'You left the chat'
    }
    this.snackbar = !!this.message
  },
  methods: {
    ...mapMutations([
      'setUser'
    ]),
    pickImg(img) {
      this.selectedImg = img;
      this.imgError = false;
    },
    submit () {
      if (!this.selectedImg.length) {
        this.imgError = true
      }
      if (this.$refs.form.validate() && !this.imgError) {
        const user = {
          name: this.name,
          room: this.room,
          image: this.selectedImg,
        };
        this.$socket.emit('userJoined', user, data => {
          if (typeof data === 'string') {
            console.error(data)
          } else {
            user.id = data.userId;
            this.setUser(user);
            this.$router.push('/chat');
          }
        })
      }
    },
  }
}
</script>
<style lang="stylus" scoped>
.card {
  width 50vh
  background rgba(255, 255, 255, 0.2);
  backdrop-filter blur(2px);
  border 1px solid rgba(255, 255, 255, 0.2);
  border-right-color rgba(255, 255, 255, 0.3);
  border-bottom-color rgba(255, 255, 255, 0.1);
  box-shadow 0 20px 30px rgba(0, 0, 0, 0.3);
  .check {
    background white
  }
  .error-enter-active,
  .error-left-active {
    transition .5s
  }
  .error-enter,
  .error-left-to {
    transform translateY(-2vh)
  }
  .errorImg {
    color red
  }
  .image {
    margin-top 2%
    width 15%
    height 15%
    border-radius 50%
    border 2px solid black
    transition .3s
    &:hover {
      border 2px solid #ffffff
    }
    img {
      width 100%
      height 100%
    }
  }
}


@media (max-width: 400px) {
  .card {
    width 37vh
    .image {
      width 20%
      height 20%
      margin 0 1%
    }
  }
}
</style>
