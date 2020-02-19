<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <v-toolbar-title>
       Macroword
    </v-toolbar-title>

      <v-spacer></v-spacer>

     <v-btn color="success" @click="logout" v-if="loggedIn">logout</v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
     <v-snackbar
                  :key="index"
                  v-for="(snackbar , index) in getNotifications"
                  v-model="snackbar.show"
                  @input="updateNotification($event , index)"
                    top
                    color="success"
                    dark
                >
                  {{ snackbar.text }}
                  <v-btn
                    color="white"
                    text
                    @click="removeNotification(index)"
                  >
                    Close
                  </v-btn>
      </v-snackbar>
  </v-app>
  
</template>

<script>

import {mapGetters , mapActions } from 'vuex'
export default {
  name: 'App',



  data: () => ({
 
  }),

  created() {
   this.checkUserState(); 
  },

  computed: {

    ...mapGetters({
      loggedIn:'user/loggedIn',
      getNotifications:'application/getNotifications',
    }),
   
  },

  methods: {
    ...mapActions({
      loggedOut:'user/loggedOut',
      checkUserState:'user/setLoggedInState',
      removeNotification:'application/removeNotification',
      addNotification:'application/addNotification'

    }),
    logout(){
      this.loggedOut()
      .then(()=>{

        this.$router.push({name:'login'});
         this.addNotification({
            show: true,
            text : 'You are successfully Logout'
        })
      })
      .catch(()=>{
           this.addNotification({
              show: true,
              text : 'Something went wrong '
          })
      })
    },

    updateNotification(show , index){
        if(!show){
          this.removeNotification(index);
        }
    }
  },
};
</script>
