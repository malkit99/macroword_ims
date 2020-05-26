<template>
       <v-content>
    <v-toolbar
      dark
      prominent
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-btn icon @click="toHome">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn icon @click="toMainLogin">
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
    name:"StudentAuthLayout",

    methods: {
        toHome(){
            
        },
        toMainLogin(){
           
        }
    },
}
</script>