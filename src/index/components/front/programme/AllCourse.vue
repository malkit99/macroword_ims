<template>
  <div>
    <v-toolbar
      color="red"
      dark
      flat
    >

      <template v-slot:extension>
        <v-tabs
          v-model="tab"
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab v-for="(item , index) in items" :key="index" @click="getCourse(item.name)">
            {{ item.name }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="(item , index) in items"
        :key="index"
      >
        <v-container>
            <v-row 
            align="center" 
            justify="center"   
            v-for="n in 1"
            :key="n"
            :class="n === 1 ? 'mb-6' : ''"
            >
                <v-col cols="12" sm="2" md="4"  v-for="(course , index) in filterCourse" :key="index">
                    <v-card
                    min-width="250"
                    >
                    <v-img
                    height="200"
                    :src="course.course_image"
                    ></v-img>

                    <v-card-title>
                      <v-chip color="pink" dark >{{ course.course_name}}</v-chip>
                      
                      <v-spacer></v-spacer>
                      <v-chip color="pink" dark >{{ course.skill_level}}</v-chip>
                    </v-card-title>
                      <v-card-text>
                      <p class="headline text-center text-uppercase font-weight-bold">{{ course.title}}</p>
                      </v-card-text>
                    <v-card-actions>
                    <v-btn
                    color="deep-purple lighten-2"
                    text
                    @click="courseBySlug(course.slug)"
                    >
                    More Info...
                    </v-btn>
                    </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>   
       
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        tab: null,
        slug:"",
      }
    },

    computed: {
      ...mapGetters({
        items:'website_detail/getCategory',
        courses:'website_detail/getPopularCourse',
      }),

      filterCourse(){
        return this.courses.filter((course) =>{
          return course.category.match(this.slug);
        })
      },
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

      getCourse(item){
        this.slug = item
      }
    },
  }
</script>