<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-card-title>Create Event</v-card-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" class="mb-2" :to="{name:'event-home'}">Back</v-btn>
    </v-toolbar>

    <v-card-text>
      <ValidationObserver ref="eventForm" v-slot="{ validate, reset }">
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
                  <ValidationProvider v-slot="{ errors }" name="Event Title" >
                    <v-text-field
                      v-model="event.title"
                      label="Event Title"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Loction"
                    rules="required|alpha_spaces|min:3|max:30"
                  >
                    <v-text-field
                      v-model="event.loction"
                      name="loction"
                      label="Loction"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="6">
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
                     <ValidationProvider v-slot="{ errors }" name="Start Date" >
                      <v-text-field
                        v-model="event.start_date"
                        label="Start Date"
                        hint="YYYY/MM/DD"
                        persistent-hint
                        readonly
                        prepend-icon="event"
                        :error-messages="errors"
                        v-on="on"
                      ></v-text-field>
                     </ValidationProvider>
                    </template>
                    <v-date-picker v-model="event.start_date" no-title @input="menu1 = false" ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                                      <v-menu
                    ref="menu2"
                    v-model="menu2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                     <ValidationProvider v-slot="{ errors }" name="Last Date" >
                      <v-text-field
                        v-model="event.last_date"
                        label="Start Date"
                        hint="YYYY/MM/DD"
                        persistent-hint
                        readonly
                        prepend-icon="event"
                        :error-messages="errors"
                        v-on="on"
                      ></v-text-field>
                     </ValidationProvider>
                    </template>
                    <v-date-picker v-model="event.last_date" no-title @input="menu2 = false" ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="12">
                  <ValidationProvider v-slot="{ errors }" name="Description" >
                    <v-textarea
                      label="Description"
                      auto-grow
                      outlined
                      v-model="event.description"
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
                    name="Team Member Image"
                   
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
                  <v-btn color="success" @click="save">Save</v-btn>
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
import { required, max, min, alpha_spaces } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

setInteractionMode("eager");

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
  name: "CreateTeam",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => {
    return {
      imageURL: "",
      menu1: false,
      menu2: false,
      event: {
        title: "",
        description: "",
        loction: "",
        start_date: "",
        last_date: "",
      },
      event_image: "",
      allerror: ""
    };
  },

  methods: {
    ...mapActions({
        addNotification: "application/addNotification",
        saveEvent:'event/saveEvent',
    }),
    onpickFile() {
      this.$refs.fileInput.click();
    },

    onFilePicked(event) {
      const files = event.target.files;
      this.readFile(files);
      this.event_image = files[0];
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
      this.$refs.eventForm.validate().then(success => {
        if (!success) {
          return;
        }
        this.allerror = "";
        let data = new FormData();
        data.append('title' , this.event.title),
        data.append('loction' , this.event.loction),
        data.append('description' , this.event.description),
        data.append('start_date' , this.event.start_date),
        data.append('last_date' , this.event.last_date),
        data.append('event_image' , this.event_image),
        this.saveEvent(data)
          .then(response => {
            // this.$router.push({ name: "event-home" });
            this.addNotification({
              show: true,
              text: "Event Created Successfully"
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
      (this.team.name = ""),
        (this.event.title = ""),
        (this.event.description = ""),
        (this.event.loction = ""),
        (this.event.start_date = ""),
        (this.event.last_date = ""),
        (this.event_image = ""),
        this.$refs.eventForm.reset();
    }
  }
};
</script>