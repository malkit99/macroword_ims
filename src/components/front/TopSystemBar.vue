<template>   
    <v-system-bar dark color="red" height="75">
    <v-avatar class="hidden-sm-and-down" >
      <img
        src="./../../../public/img/rg_logo.png"
        alt="John"
      >
    </v-avatar>
    <v-toolbar-title class="hidden-xs-only font-weight-bold white--text ml-2" >Macroword Online Learning </v-toolbar-title>    
    <v-spacer></v-spacer> 
        <v-icon left color="white" >mdi-email</v-icon>
        <span class="font-weight-bold white--text">rgcsm.pb@gmail.com</span>
        <v-icon left color="white" class="ml-2" >mdi-cellphone</v-icon>
        <span class="font-weight-bold white--text">+91 99882-77100</span>
    <v-spacer></v-spacer>
    <v-icon class="hidden-xs-only" left color="white">mdi-clock</v-icon>
    <span class="hidden-xs-only">Sunday 16 March 12:30</span>
    </v-system-bar>    
</template>
<script>
export default {
    name:"TopSystemBar",
}
</script>