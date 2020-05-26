<template>
    <div>
        <v-container>
            <v-row
                align="center" 
                justify="center"   
            >
                <v-col cols="12" sm="6" md="4" v-for="(course , index ) in courses" :key="index">
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
            </v-row>
        </v-container>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name:"ExploreCourse",
        props:['items'],

            computed: {
                ...mapGetters({
                courses:'website_detail/getCourseByCategorySlug',
                }),
            },
            created() {
                this.getallCourse();
            },

            methods: {
                ...mapActions({
                getcourseBySlug:'website_detail/getcourseBySlug',
                singleCourseBySlug:'website_detail/singleCourseBySlug'
                }),

                getallCourse(){
                    const item = this.items.category
                    this.getcourseBySlug(item)
                },

                courseBySlug(course){
                this.singleCourseBySlug(course)
                .then((response) => {
                this.$router.push({name: 'course-detail'});
                })
                },
            },
}
</script>