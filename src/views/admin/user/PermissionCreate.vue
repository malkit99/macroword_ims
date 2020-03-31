<template>
  <div>
    <v-toolbar flat color="grey-lighten">
      <v-toolbar-title>Permissions</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="700px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mx-2" v-on="on">Create Permission</v-btn>
          <v-btn color="primary" dark class="mx-2" :to="{name: 'users'}">Back</v-btn>
        </template>

        <ValidationObserver ref="userForm">
            <v-form @submit.prevent="save">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-row>
               <v-col cols="12" sm="6" md="12">
                    <ValidationProvider v-slot="{ errors }" name="Name" rules="required">
                    <v-text-field v-model="editedItem.name" label="Name" :error-messages="errors" >
                    <v-icon slot="prepend" color="primary" >mdi-account-circle</v-icon>
                    </v-text-field>
                    </ValidationProvider>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" type="submit" >Save</v-btn>
          </v-card-actions>
        </v-card>
        </v-form>
        </ValidationObserver>   
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="tableData" class="elevation-1">
      <template v-slot:item.name="{ item }">
        <v-chip class="ma-1" outlined color="error" label>{{ item.name }}</v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <td class="justify-center layout px-0" style="border:none;">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
import {mapActions,} from 'vuex';
import {required} from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});
export default {
  
    components: {
    ValidationProvider,
    ValidationObserver
  }, 
  data: () => ({
    dialog: false,
    headers: [
      { text: "Username", value: "name" },
      { text: "Actions", value: "actions", sortable: false ,  align:'center'}
    ],
    tableData: [],
    editedIndex: -1,
    allPermissions: [],
    editedItem: {
      name: "",
      created_at: ""
    },
    defaultItem: {
      name: "",
      created_at: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {

    ...mapActions({
      addNotification:'application/addNotification',
      permissionSave:'permission/permissionSave',
      removePermission:'permission/removePermission',
      permissionEdit:'permission/permissionEdit',
    }),
    initialize() {
      axios.get("api/permissions").then(response => {
        this.tableData = response.data.data;
        this.allPermissions = this.tableData;
      });
    },

    editItem(item) {
      this.editedIndex = this.tableData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.tableData.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.tableData.splice(index, 1);
      axios
        this.removePermission(item)
        .then((response) => {
             this.addNotification({
                show: true,
                text : 'Permission Deleted SuccessFully'
              });
        })
        .catch((error) => {
           this.addNotification({
                show: true,
                text : 'Permission Not Deleted'
            });
        })
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.tableData[this.editedIndex], this.editedItem);
          this.permissionEdit( this.editedItem)
          .then((response) => {
                this.addNotification({
                show: true,
                text : 'Permission Updated Successfully'
                });
          })
          .catch((error) => {
                this.addNotification({
                show: true,
                text : 'Permission Not Updated'
                });
          })
      } else {
        this.$refs.userForm.validate().then((success) => {
          if(!success){
            return this.dialog = true;
          }
        this.tableData.push(this.editedItem);
        this.permissionSave(this.editedItem)
          .then(response => {
            this.addNotification({
                show: true,
                text : 'Permission Create Successfully'
                });
              this.$refs.userForm.reset();
          })
          .catch((error) => {
              this.addNotification({
                show: true,
                text : 'Permission Not Created'
                });
          })
        })
      }
      this.close();
    }
  }
};
</script>