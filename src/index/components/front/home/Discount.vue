<template>
<v-container>

  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" :key="index" v-for="(item , index) in items">
            <v-col cols="12" md="12" sm="12">
    <v-card >
          <v-img
            :src="item.discount_image"
            class="align-center"
          >
          <div class="display-2 text-center font-weight-bold purple--text" >Get Discount {{item.discount}} %</div>
          <div class="display-2 text-center font-weight-bold purple--text" >{{item.last}}</div>
          <div class="display-2 text-center font-weight-bold red--text" >{{ item.title}} </div>
          <div class=" headline text-center font-weight-bold white--text" >{{ item.description}}</div>
          </v-img>
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
      name:"Discount",
    data () {
      return {
        swiperOption: {
            slidesPerView: 1,
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
              slidesPerView: 1,
              spaceBetween: 40
            },
            768: {
              slidesPerView: 1,
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
        items:'website_detail/getDiscount'
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




