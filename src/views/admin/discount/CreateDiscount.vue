<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-card-title>Create Discount</v-card-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" class="mb-2" :to="{name:'discount-home'}">Back</v-btn>
    </v-toolbar>

    <v-card-text>
      <ValidationObserver ref="discountForm" v-slot="{ validate, reset }">
        <v-form @submit.prevent="save">
          <v-card-text>
            <v-alert type="primary" dense outlined v-if="allerror">
              <ul v-for="(error , index) in allerror" :key="index">
                <li>{{error[0]}}</li>
              </ul>
            </v-alert>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="6" >
                  <ValidationProvider v-slot="{ errors }" name="Discount Title" rules="required|alpha_spaces|min:3|max:50" >
                    <v-text-field
                      v-model="dist.discount_title"
                      label="Discount Title"
                      outlined
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                 <v-col cols="12" sm="12" md="6" >
                  <ValidationProvider v-slot="{ errors }" name="Discount" rules="required" >
                    <v-text-field
                      v-model="dist.discount"
                      label="Discount in Percentage"
                      outlined
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                  <v-col cols="12" sm="12" md="6" >
                    <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                     <ValidationProvider v-slot="{ errors }" name="Last Date" rules="required" >
                      <v-text-field
                        v-model="dist.last_date"
                        label="Last Date"
                        hint="YYYY/MM/DD"
                        persistent-hint
                        readonly
                        outlined
                        prepend-icon="event"
                        :error-messages="errors"
                        v-on="on"
                      ></v-text-field>
                     </ValidationProvider>
                    </template>
                    <v-date-picker v-model="dist.last_date" no-title @input="menu1 = false" ></v-date-picker>
                  </v-menu>
                </v-col>
                  <v-col cols="12" sm="12" md="6" >
                  <ValidationProvider v-slot="{ errors }" name="Course Name" rules="required" >
                      <v-select
                          :items="courses"
                          v-model="dist.course_id"
                          outlined
                          item-text="course_name"
                          item-value="course_id"
                          :error-messages="errors"
                          label="Course Name"
                      ></v-select>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12" >
                  <ValidationProvider v-slot="{ errors }" name="Description" rules="required|min:10|max:200" >
                    <v-textarea
                      label="Description"
                      auto-grow
                      outlined
                      v-model="dist.description"
                      rows="2"
                      :error-messages="errors"
                      row-height="15"
                      clearable
                    ></v-textarea>
                  </ValidationProvider>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-list-item-avatar tile size="200" color="grey">
                    <v-img :src="imageURL"></v-img>
                  </v-list-item-avatar>
                  <ValidationProvider
                    v-slot="{ errors , validate }"
                    name="Discount Image"
                    rules="required|image"
                  >
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
                <v-col cols="12" sm="6" md="6">
                <v-btn color="error" class="mr-2"  @click="onpickFile">Image Upload</v-btn>
                  <v-btn color="error" class="mr-2" @click="clear">Reset</v-btn>
                  <v-btn color="success" type="submit">Save</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-form>
      </ValidationObserver>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios';
import { mapActions } from "vuex";
import { required, max, min, alpha_spaces , image } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

setInteractionMode("eager");

extend("image", {
  ...image,
  message: "{_field_} field must be an image"
});
extend("alpha_spaces", {
  ...alpha_spaces,
  message: "{_field_} field may only contain alphabetic characters"
});
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
  name: "CreateDiscount",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => {
    return {
        imageURL: "",
        menu1: false,
        courses:[],
      dist: {
        discount_title: "",
        course_id: "",
        last_date:"",
        discount: "",
        discount_title: "",
        description: "",
      },
      discount_image: "",
      allerror: ""
    };
  },

created() {
    this.initialize();
  },

  methods: {
    ...mapActions({
        addNotification: "application/addNotification",
        getCourseName:'course/getCourseName',
        saveDiscount:'discount/saveDiscount',
        addLoading: "loading/addLoading",
        removeloading: "loading/removeloading",
    }),

initialize() {
      this.getCourseName()
        .then((response) => {
          this.courses = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onpickFile() {
      this.$refs.fileInput.click();
    },

    onFilePicked(event) {
      const files = event.target.files;
      this.readFile(files);
      this.discount_image = files[0];
    },

    readFile(files) {
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

    save() {
      this.$refs.discountForm.validate().then(success => {
        if (!success) {
          return;
        }
        this.allerror = "";
        let data = new FormData();
        data.append('discount_title' , this.dist.discount_title);
        data.append('discount' , this.dist.discount);
        data.append('description' , this.dist.description);
        data.append('last_date' , this.dist.last_date);
        data.append('course_id' , this.dist.course_id);
        data.append('discount_image' , this.discount_image);  
        this.addLoading({ show: true , text: "Please Wait Data Uploading ..." });
        this.saveDiscount(data)
          .then(response => {
            this.removeloading({ show: false });   
            this.$router.push({ name: "discount-home" });
            this.addNotification({
              show: true,
              text: "Course Discount Created Successfully"
            });
          })
          .catch(error => {
              if(error.response.status == 422){
                this.removeloading({ show: false });   
                this.allerror = error.response.data.errors;
              }
          });
      });
      this.allerror = "";
    },

    clear() {
        this.dist.discount_title = "",
        this.dist.discount = "",
        this.dist.description = "",
        this.dist.last_date = "",
        this.dist.course_id = "",
        this.discount_image = "",
        this.$refs.discountForm.reset();
    }
  }
};
</script>