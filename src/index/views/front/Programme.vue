<template>
  <div>
    <!-- extra page header start here  -->
  <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" height="200">
    <v-overlay value="true" absolute color="black darken-4">        
                  <h1 class="text-center">Our Courses</h1>
                  <h4 class="text-center">Learn From Professional</h4>
    </v-overlay>  
  </v-parallax>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6"  md="9">
            <all-course></all-course>
      </v-col>
      <v-col cols="12" sm="6" md="3">
            <v-toolbar 
              color="red"
              dark
              flat
            >
            
            <v-toolbar-title>Our Popular Course</v-toolbar-title>
            </v-toolbar>
            <popular-course></popular-course>
      </v-col>
    </v-row>
  </v-container>
<!-- our Authorization start here -->
  <why-choose-us></why-choose-us>
  <!-- our Authorization end here -->
  <!-- our Authorization start here -->
          <v-row
        align="center" 
        justify="center" 
        >
          <v-alert
          border="bottom"
          colored-border
          color="deep-purple accent-4"
          class="display-1 , font-weight-bold , text-center"
          >
          Our Authorization
          </v-alert>         
        </v-row>
  <our-authorization></our-authorization>
  <!-- our Authorization end here -->
  </div>
</template>
<script>
import AllCourse from '../../components/front/programme/AllCourse'
import PopularCourse from '../../components/front/programme/PopularCourse'
import OurAuthorization from '../../components/front/home/OurAuthorization';
import WhyChooseUs from '../../components/front/home/WhyChooseUs';
export default {
  name:"Programme",
  components:{ 
    AllCourse , 
    PopularCourse , 
    OurAuthorization,
    WhyChooseUs,
    },
}
</script>