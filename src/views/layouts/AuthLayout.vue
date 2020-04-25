<template>
   <v-content>
    <v-toolbar
      dark
      prominent
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-btn icon :to="{name: 'home'}">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-toolbar-title>Macroword Computer Academy</v-toolbar-title>

      <v-spacer></v-spacer>

    </v-toolbar>
       <router-view></router-view>
   </v-content>
</template>
<script>
export default {
    name:"AuthLayout"
}
</script>