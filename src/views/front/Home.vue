<template>
<div >
<top-slider></top-slider>
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
          Why Academics Works
        </v-alert>         
  </v-row>

<academic-work></academic-work>

<!-- why choose us component start here  -->

        <why-choose-us></why-choose-us>
<!-- why choose us component start here  -->

   
<!-- course template start here -->
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
            Our Popular Courses
            </v-alert>         
          </v-row>
            <course-slider></course-slider>
          
<!-- course template end here -->

<!-- testimonial component start here  -->

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
            Testimonials
            </v-alert>         
          </v-row>
    <testimonial-component></testimonial-component>       
<!-- testimonial component end  here  -->
<!-- event component start here  -->
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
            Events
            </v-alert>         
          </v-row>

         
            <event-component></event-component>

<!-- event component end here  -->
<!-- our authorization component start here  -->
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
<!-- our authorization component end here  -->
    
</div>
</template>
<script>
import TopSlider from '../../components/front/home/TopSlider';
import AcademicWork from '../../components/front/home/AcademicWork';
import CourseSlider from '../../components/front/home/CourseSlider';
import TestimonialComponent from '../../components/front/home/TestimonialComponent';
import EventComponent from '../../components/front/home/EventComponent';
import LatestEvent from '../../components/front/home/LatestEvent';
import WhyChooseUs from '../../components/front/home/WhyChooseUs';
import OurAuthorization from '../../components/front/home/OurAuthorization';
export default {
  name:"Home",
  components:{
    TopSlider , 
    CourseSlider , 
    TestimonialComponent , 
    AcademicWork , 
    EventComponent , 
    LatestEvent,
    WhyChooseUs,
    OurAuthorization,
    }

}
</script>