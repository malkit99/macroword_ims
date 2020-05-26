<template>
  <div>
    <!-- extra page header start here  -->
  <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" height="200">
    <v-overlay value="true" absolute color="black darken-4">        
                  <h1 class="text-center">About Us</h1>
                  <h4 class="text-center">Learn From Professional</h4>
    </v-overlay>  
  </v-parallax>
  <!-- extra page header end here  -->
  <!-- our mission component start here -->
  <our-mission></our-mission>
  <!-- our mission component start here -->
  <!-- our service component start here -->
    <academic-work></academic-work>
  <!-- our service component start here -->
  <!-- our team component start here -->
      <v-row
        align="center"
        justify="center"
        >
            <h1 >Our Team</h1>
        </v-row>
      
    <our-team></our-team>
  <!-- our team component start here -->

  </div>
</template>
<script>
import OurMission from '../../components/front/about/OurMission'
import AcademicWork from '../../components/front/home/AcademicWork';
import OurTeam from '../../components/front/about/OurTeam'
import { mapGetters, mapActions } from 'vuex';
export default {
  name:"About",
  components:{ OurMission ,  OurTeam , AcademicWork , },
  created() {
    this.getTeam();
  },
  methods: {
    ...mapActions({
      getTeam:'website_detail/getTeam',
    }),
  },
}
</script>