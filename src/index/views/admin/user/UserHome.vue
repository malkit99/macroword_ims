<template>
  <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <template>
          <v-btn color="primary" dark class="mx-2" :to="{name:'create-user'}" v-if="$can('All')">Create User</v-btn>
          <v-btn
            color="primary"
            dark
            class="mx-2"
            :to="{name:'create-permission'}"
            v-if="$can('All')"
          >Manage Permission</v-btn>
          <v-btn color="primary" dark class="mx-2" :to="{name:'create-user-role'}" v-if="$can('All')" >Manage Role</v-btn>
        </template>
        <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card
            class="mx-auto"
            max-width="600"
            outlined
            >
            <v-list-item>
            <v-list-item-content>
            <v-list-item-title class="headline mb-1">{{ editedItem.name}}</v-list-item-title>
            <v-list-item-subtitle>Created At  : {{ editedItem.created_at}} </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey">
                      <img :src="editedItem.profile_image"/>
            </v-list-item-avatar>
            </v-list-item>
            <v-list-item>
             <v-chip color="pink" dark > Email -: {{ editedItem.email}}</v-chip>
             <v-spacer></v-spacer>
             <v-chip color="pink" dark > Mobile -: {{ editedItem.mobile}}</v-chip>
            </v-list-item>
            <v-list-item>
                <v-chip color="orange" dark   outlined label >Role : {{ editedItem.role.name}}</v-chip>
            </v-list-item>
            <v-list-item>
                <div v-for="(permission , index) in editedItem.role.permissions" :key="index">
                   <v-chip color="success" class="ml-2" dark outlined label>{{ permission.name}}</v-chip>
                </div>
            </v-list-item>

            <v-card-actions>
              <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Close</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.image="{ item }">
      <v-avatar color="indigo" size="64">
        <img :src="item.profile_image" :alt="item.name" />
      </v-avatar>
    </template>
    <template v-slot:item.name="{ item }">
      <v-btn :to="{ name: 'show-user' , params:{id:item.id}}" text color="success">{{item.name}}</v-btn>
    </template>
    <template v-slot:item.email="{ item }">{{ item.email }}</template>
    <template v-slot:item.actions="{ item }">
      <tr>
    <td style="border:none;">

      <v-btn icon>
      <v-icon small color="warning" @click="showItem(item)" class="mr-2">mdi-eye</v-icon>
      </v-btn>

      <v-btn icon :to="{ name: 'edit-user' , params:{id:item.id}}" >
      <v-icon color="primary" small class="mr-2">mdi-pencil</v-icon>
      </v-btn>
        
      <v-btn icon>
      <v-icon color="error" small @click="deleteItem(item)">mdi-delete</v-icon>
      </v-btn>    
        </td>
      </tr>  
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import axios from "axios";
import { required, email, max, min } from "vee-validate/dist/rules";
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
extend("min", {
  ...min,
  message: "{_field_} may not be less than {length} characters"
});
extend("email", {
  ...email,
  message: "{_field_}  must be valid"
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters"
});

export default {
  name: "UserHome",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    dialog: false,
    valid: true,
    headers: [
      {
        text: "S.No.",
        align: "start",
        sortable: false,
        value: "sno"
      },
      { text: "Image", value: "image" },
      { text: "Name", value: "name" },
      { text: "Email", value: "email" },
      { text: "Roles", value: "roles" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    desserts: [],
    allRoles: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      email: "",
      mobile: "",
      role: "",
      profile_image:"",
    },
  
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
      saveUser: "register/saveUser",
      addNotification: "application/addNotification",
      userDelete: "register/userDelete",
      getUsers: "register/getUsers",
      addLoading: "loading/addLoading",
      removeloading: "loading/removeloading",
    }),

    initialize() {
      this.addLoading({ show: true , text: "Please Wait User Data Upadated ..." });
      this.getUsers("api/register")
      .then(response => {
        this.removeloading({ show: false });
        this.desserts = response.data.data;
      })
    },

    showItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      if (
        confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1)
      ) {
        this.userDelete(item)
          .then(response => {
            this.addNotification({
              show: true,
              text: "User Delete Succssfully"
            });
          })
          .catch(error => {
            this.addNotification({
              show: true,
              text: "User not Deleted"
            });
          });
      }
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
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        this.editUser(this.editedItem)
          .then(response => {})
          .catch(error => {});
      } else {
        this.$refs.userForm.validate().then(success => {
          if (!success) {
            return;
          }
          this.saveUser(this.item)
            .then(response => {
              this.addNotification({
                show: true,
                text: "User Registration Successfully Submited"
              });
            })
            .catch(error => {
              this.addNotification({
                show: true,
                text: "User Registration not Submited"
              });
            });
        });
      }
      this.close();
    }
  }
};
</script>
