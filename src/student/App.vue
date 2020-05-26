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

                <v-card color="success" dark>
           <v-snackbar
                  :key="index"
                  v-for="(loading , index) in getLoading"
                  v-model="loading.show"
                  @input="updateLoading($event , index)"
                    top   
                    color="success"
                    dark
                >
                  <v-card-text>
                  <p class="text-center" v-if="loading.text">{{ loading.text}}</p>
                  <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                        >
                  </v-progress-linear>
                  </v-card-text>
                <v-card-actions>
                <v-btn
                  color="white"
                  text
                  @click="removeloading(index)"
                >
                  Close
                </v-btn>
                </v-card-actions>
      </v-snackbar>
    </v-card>
  </v-app> 
</template>

<script>

import {mapGetters , mapActions } from 'vuex'
export default {
  name: 'App',


  computed: {
    ...mapGetters({
      getNotifications:'application/getNotifications',
      getLoading:'loading/getLoading',
     
    }),
   
  },

 

  methods: {
    ...mapActions({
      removeNotification:'application/removeNotification',
      addNotification:'application/addNotification',
      removeloading:'loading/removeloading',
    }),

    updateNotification(show , index){
        if(!show){
          this.removeNotification(index);
        }
    },

    updateLoading(show , index){
        if(!show){
          this.removeloading(index);
        }
    },
  },
};
</script>