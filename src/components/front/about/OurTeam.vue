<template>
<v-container>

  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
    <div class="swiper-slide" :key="index" v-for="(banner , index) in banners">
  
                   <v-card
                    dark
                    min-width="280"
                    class="mr-5"
                    >
                    <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="banner.team_image"
                    :alt="banner.name"
                    >
                    <v-card-title class="red--text font-weight-bold" dark >{{ banner.name}}</v-card-title>
                    </v-img>
                    <v-card-title >
                      {{ banner.post }}
                    </v-card-title>
                     
                      <p class="text-center">{{banner.description}}</p>
                  
                    <v-card-actions>
                        <v-btn icon :href="banner.facebook ? banner.facebook : '#'" target="_blank">
                            <v-icon color="white" dark >mdi-facebook</v-icon>
                        </v-btn>
                         <v-btn icon :href="banner.insta ? banner.insta : '#'" target="_blank">
                            <v-icon color="white" dark >mdi-instagram</v-icon>
                        </v-btn>
                         <v-btn icon :href="banner.twitter ? banner.twitter : '#'" target="_blank">
                            <v-icon color="white" dark >mdi-twitter</v-icon>
                        </v-btn>
                         <v-btn icon :href="banner.linkedin ? banner.linkedin : '#'" target="_blank">
                            <v-icon color="white" dark >mdi-linkedin</v-icon>
                        </v-btn>
                    </v-card-actions>
                    </v-card>
         
      </div>
    </div>
     <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
     <div class="swiper-pagination" slot="pagination"></div>
  </div>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
      name:"OurTeam",
    data () {
      return {

        swiperOption: {
            slidesPerView: 4,
            spaceBetween: 40,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
            navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
             breakpoints: {
            1024: {
              slidesPerView: 4,
              spaceBetween: 40
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            }
          }
        }
      }
    },
    computed: {
      ...mapGetters({
        banners:'website_detail/getTeam',
      }),
    },
    mounted() {
      this.mySwiper.slideTo(3, 1000, false)
    }
  }
</script>