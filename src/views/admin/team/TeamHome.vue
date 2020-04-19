<template>
  <v-data-table :headers="headers" :items="teams" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <template>
          <v-btn color="primary" dark class="mb-2" :to="{name:'create-team'}">New Item</v-btn>
        </template>
      </v-toolbar>
    </template>
    <template v-slot:item.image="{ item }">
      <v-avatar color="indigo" size="64">
        <img :src="item.team_image" :alt="item.name" />
      </v-avatar>
    </template>
    <template v-slot:item.name="{ item }">
      <v-btn text color="success" >{{ item.name }}</v-btn>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn icon :to="{name: 'edit-team' , params:{id: item.id}}">
      <v-icon small class="mr-2" color="primary">mdi-pencil</v-icon>
      </v-btn>
      <v-icon small color="error" @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "TeamHome",

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
      { text: "Type", value: "post" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    teams: []
  }),

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions({
      getTeams: "team/getTeams",
      deleteTeam: "team/deleteTeam"
    }),

    initialize() {
      this.getTeams().then(response => {
        this.teams = response.data.data;
      });
    },

    deleteItem(item) {
      const index = this.teams.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.teams.splice(index, 1);
      this.deleteTeam(item)
        .then(response => {
          this.addNotification({
            show: true,
            text: "Team Member Deleted Successfully"
          });
        })
        .catch(error => {
          console.log(error);
          this.addNotification({
            show: true,
            text: "Team Member Not Deleted"
          });
        });
    }
  }
};
</script>
