<template>
  <v-app>

      <router-view></router-view>

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
  created() {
   this.checkUserState()
   .then(()=>{
     if(this.loggedIn){
       this.me().then(() => {
      
       })
     }
   }) 
  },

  computed: {

    ...mapGetters({
      getNotifications:'application/getNotifications',
      loggedIn:'user/loggedIn'
    }),
   
  },

  methods: {
    ...mapActions({
      checkUserState:'user/setLoggedInState',
      removeNotification:'application/removeNotification',
      addNotification:'application/addNotification',
      me:'user/me'

    }),
    updateNotification(show , index){
        if(!show){
          this.removeNotification(index);
        }
    }
  },
};
</script>
