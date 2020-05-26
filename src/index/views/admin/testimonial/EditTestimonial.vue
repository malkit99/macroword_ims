<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-card-title>Edit Testimonial</v-card-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" class="mb-2" :to="{name:'testimonial-home'}">Back</v-btn>
    </v-toolbar>

    <v-card-text>
      <ValidationObserver ref="testimonialForm" v-slot="{ validate, reset }">
        <v-form @submit.prevent="save">
          <v-card-text>
            <v-alert type="primary" dense outlined v-if="allerror">
              <ul v-for="(error , index) in allerror" :key="index">
                <li>{{error[0]}}</li>
              </ul>
            </v-alert>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <ValidationProvider v-slot="{ errors }" name="Name" rules="required|alpha_spaces|min:3|max:30" >
                    <v-text-field
                      v-model="testi.student"
                      label="Name"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Designation"
                    rules="required|alpha_spaces|min:3|max:30"
                  >
                    <v-text-field
                      v-model="testi.designation"
                      name="designation"
                      label="Designation"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="12">
                  <ValidationProvider v-slot="{ errors }" name="Description" rules="required|min:30|max:200" >
                    <v-textarea
                      label="Description"
                      auto-grow
                      outlined
                      v-model="testi.description"
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
                    <v-img :src="imageURL ? imageURL : testi.testi_image"></v-img>
                  </v-list-item-avatar>
                  <ValidationProvider
                    v-slot="{ errors , validate }"
                    name="Team Member Image"
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
  name: "EditTestimonial",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => {
    return {
      imageURL: "",
      testi: {
        student: "",
        description: "",
        designation: "",
      },
      testi_image: "",
      allerror: ""
    };
  },

    created() {
        this.initialize();
    },

  methods: {
    ...mapActions({
        addNotification: "application/addNotification",
        saveTestimonial:'testimonial/saveTestimonial',
        getByIdTestimonial:'testimonial/getByIdTestimonial',
    }),

        initialize() {
            this.getByIdTestimonial(this.$route.params.id)
            .then(response => {
                this.testi = response.data.data;
            })
            .catch(error => {
                console.log(error);
            });
        },
    onpickFile() {
      this.$refs.fileInput.click();
    },

    onFilePicked(event) {
      const files = event.target.files;
      this.readFile(files);
      this.testi_image = files[0];
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
      this.$refs.testimonialForm.validate().then(success => {
        if (!success) {
          return;
        }
        this.allerror = "";
        let data = new FormData();
        data.append('student' , this.testi.student);
        data.append('designation' , this.testi.designation);
        data.append('description' , this.testi.description);
        data.append('testi_image' , this.testi_image);  
        axios.post(`api/testimonial/update/${this.$route.params.id}`, data)
          .then(response => {
            this.$router.push({ name: "testimonial-home" });
            this.addNotification({
              show: true,
              text: "Testimonial Created Successfully"
            });
          })
          .catch(error => {
            console.log(error);
            this.allerror = error.response.data.errors;
          });
      });
      this.allerror = "";
    },

    clear() {
        (this.testi.student = ""),
        (this.testi.description = ""),
        (this.testi.designation = ""),
        (this.event_image = ""),
        this.$refs.testimonialForm.reset();
    }
  }
};
</script>