<template>
  <ValidationObserver ref="courseForm" v-slot="{ validate, reset }">
    <v-form @submit.prevent="save">
      <v-card class="mx-auto">
        <v-toolbar color="primary">
          <v-card-title color="primary" class="display-1 white--text">Edit Course Content</v-card-title>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-alert type="primary" dense outlined v-if="allerror">
              <ul v-for="(error , index) in allerror" :key="index">
                <li>{{error[0]}}</li>
              </ul>
            </v-alert>
            <v-row justify="center">
              <v-col cols="12" sm="6" md="6">
                <ValidationProvider v-slot="{ errors }" name="Category" rules="required">
                  <v-select
                        :items="categories"
                        label="Course Category"
                        item-text="name"
                        v-model="course.category"
                        :error-messages="errors"
                        item-value="id"
                    ></v-select>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <ValidationProvider v-slot="{ errors }" name="Course Name" rules="required" >
                  <v-text-field 
                  name="course_title" 
                  label="Course Title"
                  v-model="course.course_name" 
                  :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

            </v-row>
            <v-row>
                <v-col cols="12" sm="6" md="12">
                    <ValidationProvider v-slot="{ errors }" name="Course Title" rules="required">
                    <v-text-field 
                    name="content_name" 
                    label="Course Title"
                    v-model="course.title"  
                    :error-messages="errors"
                    ></v-text-field>
                    </ValidationProvider>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6" md="12">
                    <h4>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure corporis eum numquam, reiciendis sequi quisquam quaerat quia.</h4>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <ValidationProvider v-slot="{ errors }" name="Course Code" rules="required">
                        <v-select
                        :items="courseCodes"
                        label="Course Code"
                        item-text="course_code"
                        v-model="course.code"
                        :error-messages="errors"
                        item-value="id"
                        solo
                        ></v-select>
                    </ValidationProvider>
                </v-col>
                 <v-col cols="12" sm="6" md="3">
                    <ValidationProvider v-slot="{ errors }" name="Duration" rules="required">
                        <v-select
                        :items="durations"
                        label="Duration"
                        item-text="duration"
                        v-model="course.duration"
                        :error-messages="errors"
                        item-value="id"
                        solo
                        ></v-select>
                    </ValidationProvider>
                </v-col>
                 <v-col cols="12" sm="6" md="3">
                    <ValidationProvider v-slot="{ errors }" name="Batch Size" rules="required">
                        <v-select
                        :items="batchSize"
                        label="Batch Size"
                        item-text="batch_size"
                        v-model="course.batch"
                        :error-messages="errors"
                        item-value="id"
                        solo
                        ></v-select>
                    </ValidationProvider>
                </v-col>
                 <v-col cols="12" sm="6" md="3">
                    <ValidationProvider v-slot="{ errors }" name="Course Fee" rules="required">
                        <v-select
                        :items="courseFee"
                        label="Course Fee"
                        item-text="course_fee"
                        v-model="course.fee"
                        :error-messages="errors"
                        item-value="id"
                        solo
                        ></v-select>
                    </ValidationProvider>
                </v-col>
            </v-row>

            <v-row justify="center">
              <v-col cols="12" sm="6" md="6">
                <ValidationProvider v-slot="{ errors }" name="Skill Leval" rules="required">
                  <v-select
                        :items="skillLeval"
                        v-model="course.skill_level"
                        :error-messages="errors"
                        label="Skill Leval"
                    ></v-select>
                </ValidationProvider>
              </v-col>
                 <v-col cols="12" sm="6" md="6">
                      <v-list-item-avatar tile size="200" color="grey">
                        <v-img :src="imageURL ? imageURL : course.course_image"></v-img>
                      </v-list-item-avatar>

                <ValidationProvider v-slot="{ errors , validate }" name="Course Inmage" rules="required">
                     <v-btn color="error" @click="onpickFile">Image Upload</v-btn>
                     <p id="error" class="red--text">{{ errors[0] }}</p>
                      <input
                        type="file"
                        ref="fileInput"
                        accept="image/*"
                        name="profile_image"
                        :error-messages="errors"
                        style="display:none"
                        @change="onFilePicked($event) || validate($event)"
                      />
                </ValidationProvider>
              </v-col>
            </v-row>

            <v-row justify="center">
              <v-col cols="12" sm="6" md="12">
                <ValidationProvider v-slot="{ errors }" name=" Course Contents" rules="required">
                  <v-select
                    :items="contents"
                    label="Course Content"
                    item-text="subject_name"
                    v-model="subject"
                    :error-messages="errors"
                    item-value="id"
                    chips
                    multiple
                    ></v-select>
                </ValidationProvider>
              </v-col>
            </v-row>

          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" dark class="mx-5" @click="clear">Reset</v-btn>
          <v-btn color="success" dark class="mx-5" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </ValidationObserver>
</template>

<script>
import axios from 'axios';
import { required, max, min } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";
import { mapActions } from 'vuex';

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});
extend("min", {
  ...min,
  message: "{_field_} may not be less than {length} characters"
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters"
});
export default {
  name: "CreateCourse",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
        imageURL:"",
        categories:[],
        courseCodes:[],
        durations:[],
        batchSize:[],
        courseFee:[],
        contents:[],
        skillLeval:["Basic" , "Inter Mediate" , "Professional"],

        course:{
          id:"",
          course_name:"",
          code:"",
          title:"",
          category:"",
          batch:"",
          duration:"",
          fee:"",
          duration:"",
          skill_level:"",
        },
        subject:[],   
        course_image:"",
        allerror:"",
    }
  },

  computed: {
      
  },

created() {
  this.initialize()
},
  methods: {

      ...mapActions({
          getCategory:'category/getCategory',
          getCourseCode:'master/getCourseCode',
          getDuration:'master/getDuration',
          getBatchSize:'master/getBatchSize',
          getCourseFee:'master/getCourseFee',
          getSubject:'content/getSubject',
          addNotification:'application/addNotification',
          updateCourse:'course/updateCourse',
          getCourseById:'course/getCourseById',
      }),

    initialize () {
        this.getCategory()
        .then((response) => {
          this.categories = response.data.data
        });

        this.getCourseCode()
        .then((response) => {
          this.courseCodes = response.data.data
        });

        this.getDuration()
        .then((response) => {
          this.durations = response.data.data
        });

        this.getBatchSize()
        .then((response) => {
          this.batchSize = response.data.data
        });

        this.getCourseFee()
        .then((response) => {
          this.courseFee = response.data.data
        });

        this.getSubject()
        .then((response) => {
          this.contents = response.data.data
        });

        this.getCourseById(this.$route.params.id)
        .then((response) => {
            this.course = response.data.data
            this.subject = response.data.data.subjects
        })
      },


        onpickFile(){
        this.$refs.fileInput.click();
    },

  onFilePicked(event){   
    const files = event.target.files;
        this.readFile(files);
        this.course_image = files[0];   
  },

    readFile(files){
        const fileName = files[0].name;  
        if (fileName.lastIndexOf(".") <= 0) {
            return alert("Please add a valid file");
        }
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
            this.imageURL = fileReader.result; 
        });
        fileReader.readAsDataURL(files[0]);
    },

    save(){
          this.$refs.courseForm.validate().then((success) => {
            if(!success){
              return;
            }
            let data = new FormData();
            data.append('id' ,   this.course.id);
            data.append('course_name' ,   this.course.course_name);
            data.append("code", this.course.code);
            data.append("title",  this.course.title);
            data.append("category", this.course.category);
            data.append("batch", this.course.batch);
            data.append("duration",  this.course.duration);
            data.append("fee",  this.course.fee);
            data.append("skill_level",  this.course.skill_level);
            data.append("subject", this.subject);
            data.append('course_image' , this.course_image);
            axios.post(`api/course/${this.$route.params.id}`, data)
            .then((response) => {
               this.$router.push({name: 'course-home'})
                this.addNotification({
                    show: true,
                    text : 'Course  Created Successfully'
                });
            })
            .catch((error) => {
              console.log(error)
              this.allerror = error.response.data.errors;
            })

          });
          this.allerror = "";
      },

    clear(){
        this.course.course_name = "",
        this.course.code = "",
        this.course.title = "",
        this.course.category= "",
        this.course.batch = "",
        this.course.duration = "",
        this.course.fee = "",
        this.course.duration = "",
        this.course_image = "",
        this.course.skill_level = "",
        this.subject = "",
        this.$refs.courseForm.reset()
    }
  },
};
</script>