<template>
<v-container>

  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" :key="index" v-for="(banner , index) in banners">
    <v-col cols="12" sm="6" md="2">
                   <v-card
                    color="white darken-4"
                    dark
                    min-width="200"
                    class="mr-5"
                    >
                    <v-img
                    class="white--text align-end"
                    height="150px"
                    :src="banner.auth_image"
                    :alt="banner.title"
                    >
                    <v-card-title>{{banner.type}}</v-card-title>
                    </v-img>
                    <v-card-text class="text--primary">
                    <div>{{banner.title}}</div>
                    </v-card-text>
                    </v-card>
          </v-col>
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
    name:"OurAuthorization",
    data () {
      return {

        swiperOption: {
            slidesPerView: 3,
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
              slidesPerView: 5,
              spaceBetween: 40
            },
            768: {
              slidesPerView: 4,
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
        banners:'website_detail/getAuthorization',
      }),
    },
    mounted() {
      this.mySwiper.slideTo(3, 1000, false)
    }
  }
</script>