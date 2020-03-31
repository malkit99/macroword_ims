<template>
  <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
    <template v-slot:top>
    <v-toolbar flat color="white">
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" :to="{name:'create-user'}">New Item</v-btn>
    </v-toolbar>
</template>
    <template v-slot:item.image="{ item }">
      <v-avatar color="indigo" size="36">
        <img :src="item.image" :alt="item.name" />
      </v-avatar>
    </template>
    <template v-slot:item.roles="{ item }">
      <tr v-for=" role in item.roles " :key="role.id">{{ role }}</tr>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn icon :to="{name: 'edit-user',params: { id: item.id } }">
      <v-icon small class="mr-2">mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon @click="deleteItem(item)">
        <v-icon small>mdi-delete</v-icon>
      </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
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
      { text: "Role", value: "roles" },
      { text: "Join At", value: "join" },
      { text: "Actions", value: "actions", sortable: false }
    ]
  }),

  computed: {
    ...mapGetters({
      desserts: "register/getUsers"
    })
  },
  mounted() {
    this.$store.dispatch("register/getUsers");
  },

  methods: {
    ...mapActions({
      userDelete: "register/userDelete",
      addNotification:'application/addNotification'
    }),

    
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") && this.desserts.splice(index, 1);
      this.userDelete(item)
        .then(response => {
           this.addNotification({
                  show: true,
                  text : 'User Delete Succssfully'
              })
        })
        .catch(error => {
           this.addNotification({
                  show: true,
                  text : 'User not Deleted'
              })
        });
    }
  }
};
</script>
