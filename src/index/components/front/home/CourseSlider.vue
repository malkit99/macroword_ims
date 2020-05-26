<template>
<v-container>

  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" :key="index" v-for="(banner , index) in banners">
    <v-col cols="12" sm="6" md="4">
  <v-card
    
    class="mx-auto my-12"
    min-width="374"
  >
    <v-img
      height="250"
      :src="banner.course_image"
    ></v-img>
    <v-card-title><div class="headline text-center">{{banner.title}}</div></v-card-title>    
    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="courseBySlug(banner.slug)"
      >
      More Info...
      </v-btn>
    </v-card-actions>
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
import { mapGetters , mapActions} from 'vuex'
  export default {
    data () {
      return {
        swiperOption: {
            slidesPerView: 3,
            spaceBetween: 40,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },  
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
              slidesPerView: 3,
              spaceBetween: 40
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            640: {
              slidesPerView: 1,
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
        banners:'website_detail/getPopularCourse',
      }),
    },
    mounted() {
      this.mySwiper.slideTo(3, 1000, false)
    },

    methods: {
      ...mapActions({
        singleCourseBySlug:'website_detail/singleCourseBySlug'
      }),
      courseBySlug(course){
        this.singleCourseBySlug(course)
        .then((response) => {
          this.$router.push({name: 'course-detail'});
        })
      },
    },
  }
</script>