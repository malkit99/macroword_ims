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
      :src="item.src"
    >
     <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="display-3 , font-weight-bold , white--text">
              {{ item.heading }}
          </div>
        </v-row>
    </v-carousel-item>
  </v-carousel>
</div>
</template>

<script>
  export default {
      name:"TopSlider",
    data () {
      return {
        items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
            heading:'Macroword Computer Avademy',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
            heading:'Rgcsm Computer Education',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
            heading:'Learn From Professional',
          },
        ],
      }
    },
  }
</script>