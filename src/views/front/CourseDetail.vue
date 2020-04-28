<template>
    <div>
<!-- extra page header start here  -->
  <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" height="200">
    <v-overlay value="true" absolute color="black darken-4">        
                  <h1 class="text-center">Diploma In Office Automation & Publishing</h1>
                  <h4 class="text-center">Learn From Professional</h4>
    </v-overlay>  
  </v-parallax>

    <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6"  md="9">
            <v-toolbar 
              color="red"
              dark
              flat
            >  
            <v-toolbar-title>Course Detail</v-toolbar-title>
            </v-toolbar>
                <v-card flat>
                    <v-row>        
                            <v-col cols="12" sm="6" md="6">
                                <course-feature></course-feature>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <course-enquery></course-enquery>
                            </v-col>
                    </v-row>    
            </v-card>
    <!-- course content start here -->
        <course-content-detail></course-content-detail>
    <!-- course content end here -->

    <!-- other course explore in this category -->
        <v-toolbar 
              color="red"
              dark
              flat
            >  
            <v-toolbar-title>Explore Our Other Courses</v-toolbar-title>
        </v-toolbar>
        <!-- expolore other courses component start here -->
        <explore-course></explore-course>
        <!-- expolore other courses component end here -->

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
  <!-- testimonial component start herer -->
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
          What our Student Say
          </v-alert>         
        </v-row>
      <testimonial-component></testimonial-component>
  <!-- testimonial component end here -->
  <!-- our authorization start here -->
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
          Job Opportunities
          </v-alert>         
        </v-row>
        <job-opportunities></job-opportunities>
  <!-- our authorization end here -->
    </div>
</template>
<script>
import PopularCourse from '../../components/front/programme/PopularCourse'
import CourseContentDetail from '../../components/front/programme/CourseContentDetail'
import CourseFeature from '../../components/front/programme/CourseFeature'
import CourseEnquery from '../../components/front/programme/CourseEnquery'
import ExploreCourse from '../../components/front/programme/ExploreCourse'
import TestimonialComponent from '../../components/front/home/TestimonialComponent';
import JobOpportunities from '../../components/front/programme/JobOpportunities';
export default {
    name:"CourseDetail",
    components:{
        PopularCourse , 
        CourseContentDetail,
        CourseFeature,
        CourseEnquery,
        ExploreCourse,
        TestimonialComponent,
        JobOpportunities,
        },
}
</script>