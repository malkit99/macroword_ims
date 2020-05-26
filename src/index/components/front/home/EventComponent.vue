<template>
  <v-container>
    <v-row
      align="center" 
      justify="center"   
      v-for="n in 1"
      :key="n"
      :class="n === 1 ? 'mb-6' : ''"
    >
    <v-col cols="12" sm="6" md="4"  v-for="(item , index) in items " :key="index">
  <v-card
    class="mx-auto"
  >
    <v-img
      :src="item.event_image"
      height="200px"
    >
    </v-img>
  
    <v-card-title>
      {{item.title}}
    </v-card-title>
    <v-card-subtitle class="red--text">
      {{item.start}} to {{item.last}}
    </v-card-subtitle>
  
  
      <p class="headline text-center blue--text font-weight-bold ">{{item.loction}}</p>
   
    <v-card-text>
       {{item.description}}
    </v-card-text>
     
      <v-card-actions>
          <v-btn text color="success">
            More Info
          </v-btn>
      </v-card-actions>
   
  </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name:"EventComponent",
    computed: {
      ...mapGetters({
        items:'website_detail/getEvent',
      }),
    },
}
</script>