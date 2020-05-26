<template>
<v-parallax 
src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
height="400"
dark
align="center"
justify="center"
>
 <v-overlay value="true" absolute color="black darken-4">
<v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
            <v-avatar size="96" >
                <v-img  :src="slide.testi_image"></v-img>
            </v-avatar>
        </v-list-item-title>
        <v-list-item-title class="headline">
          {{slide.student}}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
        <v-card max-width="500">
        <v-card-text>     
          {{ slide.description}} 
        </v-card-text>
        </v-card>   
        </v-row>
 
    </v-carousel-item>
  </v-carousel>
 </v-overlay>
</v-parallax>
     
</template>
<script>
import { mapGetters } from 'vuex'
  export default {
    name:"TesimonislComponent",
    data () {
      return {

      }
    },

    computed: {
      ...mapGetters({
        slides:'website_detail/getTestimonial',
      }),
    },
  }
</script>
