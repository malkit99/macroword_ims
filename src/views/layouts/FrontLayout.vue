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
export default {
  name: "FrontLayout",
  components:{ NavHeader ,  BottomFooter  },

};
</script>