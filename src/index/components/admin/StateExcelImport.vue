<template>
<v-toolbar flat color="white">
    <v-toolbar-title>Import Excel</v-toolbar-title>
<v-spacer></v-spacer>    
<v-dialog v-model="dialog" max-width="500px" persistent >
     <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2 ml-2" v-on="on">Import Excel Data</v-btn>
    </template>
    <v-card>
        <v-card-title>
            <span class="headline">Import Excel For Country Data </span>
        </v-card-title>
        <ValidationObserver ref="excelForm" v-slot="{ validate, reset }">
            <v-form @submit.prevent="saveFile">
        <v-card-text>
            <v-col cols="12" sm="12" md="12">
                  <ValidationProvider
                    v-slot="{ errors , validate }"
                    name="Excel File"
                    rules="required|mimes:xlsx,xls"
                  >
                <p id="error" class="red--text">{{ errors[0] }}</p>
                <p v-if="allerror.select_file" class="red--text  caption ">{{allerror.select_file[0]}}</p>
                            <p
                            class="d-inline-block text-truncate"
                            style="max-width: 400px;"
                            v-if="imageURL"
                            >
                            {{ imageURL }}
                            </p>
                    <input
                      type="file"
                      ref="fileInput"
                      accept=".xlsx , .xls"
                      name="excel_file"
                      :error-messages="errors"
                      style="display:none"
                      @change="onFilePicked($event) || validate($event)"
                    />
                  </ValidationProvider>
                  <v-btn color="error" class="mr-2"  @click="onpickFile">Select Excel File</v-btn>
            </v-col>
        </v-card-text>    
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error"  @click="clear">Reset</v-btn>
              <v-btn color="primary"  @click="close">Cancel</v-btn>
              <v-btn color="success" type="submit" >Save</v-btn>
            </v-card-actions>
            </v-form>
            </ValidationObserver>
    </v-card>
</v-dialog> 
</v-toolbar>
</template>
<script>
import axios from 'axios';
import {mapActions} from 'vuex';
import { required, mimes } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

setInteractionMode("eager");
extend("mimes", {
  ...mimes,
  message: "The File must be in excel format"
});
extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});
export default {
    name:"StateExcelImport",
      components: {
    ValidationProvider,
    ValidationObserver,
  },

    data() {
        return {
            select_file:"",
            imageURL:"",
            dialog:false,
            allerror:"",
        }
    },

    methods: {
          ...mapActions({
                addNotification: "application/addNotification",
            }),

            onpickFile() {
                this.$refs.fileInput.click();
            },

            onFilePicked(event) {
                const files = event.target.files;
                this.readFile(files);
                this.select_file = files[0];
            },

            readFile(files) {
                const fileName = files[0].name;
                if (fileName.lastIndexOf(".") <= 0) {
                return alert("Please add a valid file");
                }
                this.imageURL = fileName;
            },
            saveFile(){
                this.$refs.excelForm.validate().then((success) => {
                    if(!success){
                        this.dialog = true ;
                    }
                    let data = new FormData();
                    data.append('select_file' , this.select_file);
                    axios.post('api/state-excel' , data)
                    .then((response) => {
                          if(response.status == 202){
                            const message = response.data.message
                              this.addNotification({
                                    show: true,
                                    text: message
                                });
                        }
                    })
                    .catch((error) => {
                         if(error.response.status == 422){
                            this.allerror = error.response.data.errors;
                            this.dialog = true ;
                        }
                    }) 
                });
                this.allerror =""
                this.close();
            },

        close () {
            this.allerror="";
            this.dialog = false
            setTimeout(() => {
            }, 300)
        },
        clear(){
            this.$refs.excelForm.reset()
        },

    },
}
</script>