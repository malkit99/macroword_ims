<template>
<div>
  <v-carousel    
    cycle
    height="100%"
    hide-delimiter-background
    show-arrows-on-hover app
    class="hidden-xs-only"
    >
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.slider_image"
    >
     <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="display-3 , font-weight-bold , white--text">
              {{ item.title }}
          </div>
        </v-row>
    </v-carousel-item>
  </v-carousel>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
  export default {
      name:"TopSlider",
    data () {
      return {
        
      }
    },

    computed: {
      ...mapGetters({
        items:'website_detail/getSlider',
      }),
    },

    mounted() {
      this.$store.dispatch('website_detail/getSlider');
    },
  }
</script>