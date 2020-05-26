<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-card-title>Edit Slider Image</v-card-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" class="mb-2" :to="{name:'slider-home'}">Back</v-btn>
    </v-toolbar>

    <v-card-text>
      <ValidationObserver ref="sliderForm" v-slot="{ validate, reset }">
        <v-form @submit.prevent="save">
          <v-card-text>
            <v-alert type="primary" dense outlined v-if="allerror">
              <ul v-for="(error , index) in allerror" :key="index">
                <li>{{error[0]}}</li>
              </ul>
            </v-alert>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="8" offset-md="2">
                  <ValidationProvider v-slot="{ errors }" name="Slider Title" rules="required|alpha_spaces|min:3|max:50" >
                    <v-text-field
                      v-model="slider.title"
                      label="Slider Title"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-list-item-avatar tile size="200" color="grey">
                    <v-img :src="imageURL ? imageURL :slider.slider_image"></v-img>
                  </v-list-item-avatar>
                  <ValidationProvider
                    v-slot="{ errors , validate }"
                    name="Slider Image"
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
import { mapActions } from "vuex";
import axios from 'axios';
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
  name: "EditSlider",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => {
    return {
        imageURL: "",
        allerror: "",
        slider_image: "",
        slider:{
        title:"",
        }
    };
  },

   created() {
    this.initialize();
  },

  methods: {
    ...mapActions({
        addNotification: "application/addNotification",
        saveSlider:'slider/saveSlider',
        addLoading: "loading/addLoading",
        removeloading: "loading/removeloading",
    }),

    initialize() {
      axios.get(`api/slider/${this.$route.params.id}`)
        .then(response => {
          this.removeloading({ show: false });  
          this.slider = response.data.data;
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
      this.slider_image = files[0];
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
      this.$refs.sliderForm.validate().then(success => {
        if (!success) {
          return;
        }
        this.allerror = "";
        let data = new FormData();
        data.append('title' , this.slider.title),
        data.append('slider_image' , this.slider_image),
        this.addLoading({ show: true , text: "Please Wait Data Uploading ..." });
        axios.post(`api/slider/update/${this.$route.params.id}`, data)
          .then(response => {
            this.removeloading({ show: false });   
            this.$router.push({ name: "slider-home" });
            this.addNotification({
              show: true,
              text: "SLider Image Updated Successfully"
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
        this.title = "",
        this.slider_image = "",
        this.$refs.sliderForm.reset();
    }
  }
};
</script>