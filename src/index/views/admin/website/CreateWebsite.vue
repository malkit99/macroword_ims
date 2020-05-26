<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-card-title>Create Website Detail</v-card-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" class="mb-2" :to="{name:'website-home'}">Back</v-btn>
    </v-toolbar>

    <v-card-text>
      <ValidationObserver ref="wesiteForm" v-slot="{ validate, reset }">
        <v-form @submit.prevent="save">
          <v-card-text>
            <v-alert type="primary" dense outlined v-if="allerror">
              <ul v-for="(error , index) in allerror" :key="index">
                <li>{{error[0]}}</li>
              </ul>
            </v-alert>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <ValidationProvider v-slot="{ errors }" name="Website Title" rules="required|alpha_spaces|min:3|max:50" >
                    <v-text-field
                      v-model="website.title"
                      label="Website Title"
                      hint=" * website Title is mandatory Field"
                      outlined
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>

              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider v-slot="{ errors }" name="Display Email" rules="required|email" >
                    <v-text-field
                      v-model="website.email"
                      label="Display Email"
                      hint=" * website Title is mandatory Field"
                      outlined
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>

                 <v-col cols="12" sm="12" md="4">
                  <ValidationProvider v-slot="{ errors }"  name="Mobile Number" rules="required|max:15">
                    <vue-tel-input v-model="website.mobile"  v-bind="bindProps" @onInput="onInput"></vue-tel-input>
                  <span v-if="errors" class="red--text caption ml-2 "> {{ errors[0] }}</span>
                  <span v-if="allerror.mobile" class="red--text  caption ">{{allerror.mobile[0]}}</span>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider v-slot="{ errors }"  name="Mobile Two" rules="max:15">
                  <vue-tel-input v-model="website.mobile_2"  v-bind="bindProps" @onInput="onInputTwo"></vue-tel-input>
                  <span v-if="errors" class="red--text caption ml-2 "> {{ errors[0] }}</span>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="6">
                  <ValidationProvider v-slot="{ errors }" name="Facebook" rules="required" >
                   <v-text-field
                      v-model="website.facebook"
                      label="Facebook"
                      outlined
                      hint=" * Social Media Link Mandatory Field"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                 <v-col cols="12" sm="12" md="6">
                  <ValidationProvider v-slot="{ errors }" name="Instgram" rules="" >
                   <v-text-field
                      v-model="website.insta"
                      label="Instagram Link"
                      outlined
                      hint="This Field is Optional "
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                 <v-col cols="12" sm="12" md="6">
                  <ValidationProvider v-slot="{ errors }" name="Twitter" rules="" >
                   <v-text-field
                      v-model="website.twitter"
                      label="Twitter Link"
                      outlined
                      hint="This Field is Optional "
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                 <v-col cols="12" sm="12" md="6">
                  <ValidationProvider v-slot="{ errors }" name="Linkedin" rules="" >
                   <v-text-field
                      v-model="website.linkedin"
                      label="Linkedin Link"
                      hint="This Field is Optional "
                      outlined
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                  <v-col cols="12" sm="12" md="12">
                  <ValidationProvider v-slot="{ errors }" name="Address" rules="required" >
                   <v-text-field
                      v-model="website.address_line_1"
                      label="Address Line 1"
                      outlined
                      hint="This Field is Mandatory Field"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                    <v-col cols="12" sm="12" md="12">
                  <ValidationProvider v-slot="{ errors }" name="Address" rules="" >
                   <v-text-field
                      v-model="website.address_line_2"
                      label="Address Line 1"
                      hint=" * Social Media Link Mandatory Field"
                      outlined
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Country" rules="required" >
                     <v-select
                        :items="countries"
                        label="Country"
                        item-text="country_name"
                        v-model="website.country"
                        :error-messages="errors"
                        return-object
                        @change="getStateById"
                        solo
                        ></v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="3" >
                  <ValidationProvider v-slot="{ errors }" name="State" rules="required" >
                     <v-select
                        :items="states"
                        label="State"
                        item-text="state_name"
                        v-model="website.state"
                        :error-messages="errors"
                        return-object
                        @change="getCityById"
                        solo
                        filter
                        ></v-select>
                  </ValidationProvider>
                </v-col>
                    <v-col cols="12" sm="12" md="3">
                  <ValidationProvider v-slot="{ errors }" name="District" rules="required" >
                     <v-select
                        :items="cities"
                        label="District"
                        item-text="city_name"
                        v-model="website.district"
                        :error-messages="errors"
                        item-value="city_name"
                        solo
                        ></v-select>
                  </ValidationProvider>
                </v-col>
                    <v-col cols="12" sm="12" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Pin Code" rules="" >
                     <v-text-field
                      v-model="website.city"
                      label="City"
                      :error-messages="errors"
                      solo
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Pin Code" rules="" >
                     <v-text-field
                      v-model="website.pin_code"
                      label="Pin Code"
                      :error-messages="errors"
                      solo
                    ></v-text-field>
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
                    name="Web Site Logo"
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
import { required, max, min, alpha_spaces , image , mimes , email} from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

setInteractionMode("eager");
extend("mimes", {
  ...mimes,
  message: "The File must be in jpg and png only"
});
extend("email", {
  ...email,
  message: "Email Must be in valid email Format"
});

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
  name: "CreateWebsite",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => {
    return {
      imageURL: "",
      countries:[],
      states:[],
      cities:[],
      logo: "",
      allerror: "",
      website: {
        title: "",
        email: "",
        mobile: "",
        mobile_2: "",
        facebook:"",
        insta:"",
        twitter:"",
        linkedin:"",
        address_line_1:"",
        address_line_2:"",
        state:"",
        country:"",
        district:"",
        city:"",
        pin_code:"",
      },
          bindProps:{
            mode: "international",
            defaultCountry: "IN",
            placeholder: "Enter a mobile number",
            onlyCountries: ["IN"],
            wrapperClasses: "heite",
            maxLen: 15,
            required:true,
          },
    };
  },
    created () {
      this.initialize()
    },

  methods: {
    ...mapActions({
        addNotification: "application/addNotification",
        getCountries:'country/getCountries',
        addLoading: "loading/addLoading",
        removeloading: "loading/removeloading",
        saveWebsiteDetail:'website/saveWebsiteDetail',
    }),

    initialize () {
        this.getCountries()
          .then((response) => {
            this.countries = response.data.data
        })
    },

    onInput({ number, isValid, country }) {
          this.website.mobile = number.e164
    },
     onInputTwo({ number, isValid, country }) {
          this.website.mobile_2 = number.e164
    },
    onpickFile() {
      this.$refs.fileInput.click();
    },

    onFilePicked(event) {
      const files = event.target.files;
      this.readFile(files);
      this.logo = files[0];
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

    getStateById(){
      const id = this.website.country.country_id
      axios.get(`api/state/state/${id}`)
      .then((response) => {
        console.log(response);
        this.states = response.data.data
      })
    },

    getCityById(){
      const id = this.website.state.id
      axios.get(`api/city/city/${id}`)
      .then((response) => {
        this.cities = response.data.data
      })
    },

    save() {
      this.$refs.wesiteForm.validate().then(success => {
        if (!success) {
          return;
        }
        this.allerror = "";
        this.addLoading({ show: true , text: "Please Wait Data Uploading ..." });
        let data = new FormData();
        data.append('title', this.website.title);
        data.append('email', this.website.email);
        data.append('mobile', this.website.mobile);
        data.append('mobile_2', this.website.mobile_2);
        data.append('facebook', this.website.facebook);
        data.append('insta', this.website.insta);
        data.append('twitter', this.website.twitter);
        data.append('linkedin', this.website.linkedin);
        data.append('address_line_1', this.website.address_line_1);
        data.append('address_line_2', this.website.address_line_2);
        data.append('country', this.website.country.country_name);
        data.append('state', this.website.state.state_name);
        data.append('district', this.website.district);
        data.append('city', this.website.city);
        data.append('pin_code', this.website.pin_code);
        data.append('logo', this.logo);
        this.saveWebsiteDetail(data)
        .then((response) => {
          if(response.status == 201){
            this.removeloading({ show: false});
            this.$router.push({name: 'website-home'});
             this.addNotification({
                show: true,
                text: "Website Detail Created Successfully"
              });
          }
        })
        .catch((error) => {
          if(error.response.status == 422){
            this.allerror = error.response.data.errors ;
            this.removeloading({ show: false});
          }
        })
      });
      this.allerror = "";
    },

    clear() {
        this.website.title = "",
        this.website.email = "",
        this.website.mobile = "",
        this.website.mobile_2 = "",
        this.website.facebook = "",
        this.website.insta = "",
        this.website.twitter = "",
        this.website.linkedin = "",
        this.website.address_line_1 = "",
        this.website.address_line_2 = "",
        this.website.state = "",
        this.website.country = "",
        this.website.district = "",
        this.website.city = "",
        this.website.pin_code = "",
        this.logo = "",
        this.$refs.wesiteForm.reset();
    }
  }
};
</script>
<style scoped >
    .heite{
        height: 56px;
    }
</style>