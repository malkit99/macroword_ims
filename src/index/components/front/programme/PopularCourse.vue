<template>
    <div>
        <v-container>
            <v-col cols="12" sm="12" md="12" v-for=" (course , index) in items.slice(0 , 3)" :key="index">
                <v-card
                    min-width="200"
                    >
                    <v-img
                    height="200"
                    :src="course.course_image"
                    ></v-img>

                    <v-card-title>
                      <v-chip color="pink" dark >{{ course.course_name}}</v-chip>
                    </v-card-title>
                      <v-card-text>
                      <p class="caption text-center text-uppercase font-weight-bold">{{ course.title}}</p>
                    <v-card-actions>
                    <v-btn
                    color="deep-purple lighten-2"
                    text
                    @click="courseBySlug(course.slug)"
                    >
                    More Info...
                    </v-btn>
                    </v-card-actions>
                      </v-card-text>
                    </v-card>
              
            </v-col>
        </v-container>
     
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name:"PopularCourse",

      computed: {
      ...mapGetters({
          items:'website_detail/getPopularCourse',
      }),
    },

    methods: {
         ...mapActions({
                getcourseBySlug:'website_detail/getcourseBySlug',
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