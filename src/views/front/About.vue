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
    <service-component></service-component>
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
import ServiceComponent from '../../components/front/about/ServiceComponent'
import OurTeam from '../../components/front/about/OurTeam'
export default {
  name:"About",
  components:{ OurMission , ServiceComponent, OurTeam },
}
</script>