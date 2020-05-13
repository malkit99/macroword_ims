<template>
<v-app id="inspire"> 
<nav-header></nav-header>
    <v-content>  
          <router-view></router-view>
    </v-content>
<bottom-footer></bottom-footer>
  </v-app>
</template>

<script>
import NavHeader from '../../components/front/home/NavHeader';
import BottomFooter from '../../components/front/home/BottomFooter';
import { mapActions } from 'vuex';
export default {
  name: "FrontLayout",
  components:{ NavHeader ,  BottomFooter  },
  created() {
    this.getCategory();
    this.getWebsite();
    this.getService();
    this.getTestimonial();
    this.getPopularCourse();
    this.getEvent();
    this.getAuthorization();
    this.getTeam();
  },
  methods: {
    ...mapActions({
      getWebsite:'website_detail/getWebsite',
      getService:'website_detail/getService',
      getTestimonial:'website_detail/getTestimonial',
      getPopularCourse:'website_detail/getPopularCourse',
      getEvent:'website_detail/getEvent',
      getAuthorization:'website_detail/getAuthorization',
      getTeam:'website_detail/getTeam',
      getCategory:'website_detail/getCategory',
    }),
  },
};
</script>