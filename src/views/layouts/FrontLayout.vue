<template>
<v-app id="inspire"> 
<top-system-bar></top-system-bar>
<nav-header></nav-header>
<top-slider></top-slider>
    <v-content>  
          <router-view></router-view>
    </v-content>
<bottom-footer></bottom-footer>
  </v-app>
</template>

<script>
import NavHeader from '../../components/front/NavHeader';
import TopSystemBar from '../../components/front/TopSystemBar';
import BottomFooter from '../../components/front/BottomFooter';
export default {
  name: "FrontLayout",
  components:{ NavHeader , TopSystemBar ,  BottomFooter  },

};
</script>