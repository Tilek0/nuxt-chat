<template>
  <v-app app class="chatWindow">
    <v-navigation-drawer app v-model="drawer" mobile-break-point="650" class="chatWindow-nav">
      <v-list subheader>
        <v-subheader>People in chat</v-subheader>
        <v-list-tile
          v-for="item in users"
          :key="item.id"
          avatar
        >
          <v-list-tile-avatar>
            <img :src="require(`~/assets/icons/${item.image}.png`)" alt="messenger">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{item.name}}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon :color="item.id === user.id ? 'primary' : 'grey'">chat_bubble</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app class="chatWindow-toolbar">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click="exit">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>Chat rooms {{user.room}}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <div style="height: 100%">
        <nuxt />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  data: () => ({
    drawer: true,
  }),
  computed:
    mapState([
    'user',
    'users'
  ]),
  methods: {
    ...mapMutations([
      'cleatData'
    ]),
    exit() {
      this.$socket.emit('userLeft', this.user.id, () => {
        this.$router.push('./?message=leftChat');
        this.cleatData();
      })
    }
  }
};
</script>
<style lang="stylus" scoped>
.chatWindow {
  background radial-gradient(circle, rgba(140,169,211,1) 0%, rgba(80,195,255,1) 100%);
  &-nav {
    background rgba(255, 255, 255, 0.2);
    backdrop-filter blur(2px);
    border 1px solid rgba(255, 255, 255, 0.2);
    border-right-color rgba(255, 255, 255, 0.3);
    border-bottom-color rgba(255, 255, 255, 0.1);
    box-shadow 0 20px 30px rgba(0, 0, 0, 0.3);
  }
  &-toolbar {
    background rgba(255, 255, 255, 0.2);
    backdrop-filter blur(2px);
    border 1px solid rgba(255, 255, 255, 0.2);
    border-right-color rgba(255, 255, 255, 0.3);
    border-bottom-color rgba(255, 255, 255, 0.1);
    box-shadow 0 20px 30px rgba(0, 0, 0, 0.3);
  }
}
</style>
