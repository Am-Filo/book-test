<template>
  <v-app>
    <v-toolbar
      color="grey"
      :max-height="70"
      dark
    >
      <v-toolbar-title>Books - test app</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="ma-2" tile color="indigo" dark :to="'/'">to mainpage</v-btn>
    </v-toolbar>

    <v-content>
      <transition name="slide">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  created () {
    this.$store.dispatch('GetBooks');
  }
};

</script>
