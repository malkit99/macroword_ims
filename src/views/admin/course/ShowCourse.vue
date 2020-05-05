<template>
  <v-card class="mx-auto" v-if="course">
    <v-toolbar color="primary" dark>
      <v-card-title>{{course.category}}</v-card-title>
      <v-spacer></v-spacer>
      <v-btn color="white" class="black--text" :to="{name:'course-home'}" dark >Back</v-btn>
    </v-toolbar>
    <v-img :src="course.course_image" height="200px"></v-img>

    <v-card-title>
      {{course.title}}
      <v-spacer></v-spacer>
      <v-chip color="primary" dark>Course Code: {{course.code}}</v-chip>
    </v-card-title>
    <v-card-subtitle>
      <v-chip>Published At {{course.create}}</v-chip>
    </v-card-subtitle>

    <v-divider></v-divider>

    <v-simple-table>
      <template>
        <thead>
          <tr>
            <th class="text-center , font-weight-black">Doration</th>
            <th class="text-center , font-weight-black">Batch Size</th>
            <th class="text-center , font-weight-black">Course Fee</th>
            <th class="text-center , font-weight-black">Certificate</th>
            <th class="text-center , font-weight-black">Status</th>
            <th class="text-center , font-weight-black">Popular</th>
            <th class="text-center , font-weight-black">Certified Instructor</th>
            <th class="text-center , font-weight-black">Practical Training</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-center">
              <v-chip color="pink" dark>{{course.duration}}</v-chip>
            </td>
            <td class="text-center">
              <v-chip color="pink" dark>{{course.batch}} Seats</v-chip>
            </td>
            <td class="text-center">
              <v-chip color="pink" dark>{{course.fee}} INR</v-chip>
            </td>
            <td class="text-center">
              <v-chip color="pink" dark>{{course.certificate == 1 ? "Yes" : "No"}}</v-chip>
            </td>
             <td class="text-center">
              <v-chip color="pink" dark>{{course.status == 1 ? "Publish" : "Close"}}</v-chip>
            </td>
             <td class="text-center">
              <v-chip color="pink" dark>{{course.popular_course == 1 ? "Popular" : "Normal"}}</v-chip>
            </td>
            <td class="text-center">
              <v-chip color="pink" dark>{{course.instructor == 1 ? "Yes" : "No"}}</v-chip>
            </td>

            <td class="text-center">
              <v-chip color="pink" dark>{{course.training == 1 ? "Yes" : "No"}}</v-chip>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-card-actions>
      <div v-for=" subject in course.subjects" :key="subject.id">
        <v-btn
          color="purple"
          text
          v-if="subject"
          @click="getContent(subject)"
        >{{subject.subject_name}}</v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-container class="grey lighten-5">
          <v-row justify="center">
            <v-col cols="12" md="9" sm="6" v-for="content in contents.contents" :key="content.id">
              <v-card class="pa-2" outlined tile>
                <v-card-title primary-title>
              
                  {{content.topic_name}}
                </v-card-title>
                <v-card-text v-html="content.topic_description">
                
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      show: false
    };
  },

  computed: {
    ...mapGetters({
      course: "course/getCourseBySlug",
      contents: "course/getContent"
    })
  },

  mounted() {
    this.$store.dispatch("course/getCourseBySlug", this.$route.params.slug);
  },

  methods: {
    ...mapActions({
      getContentById: "course/getContentById"
    }),

    getContent(subject) {
      this.getContentById(subject)
    }
  }
};
</script>