<template>
  <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mx-2" :to="{ name: 'create-content'}">Create Content</v-btn>
        <v-btn color="primary" dark class="mx-2" :to="{name: 'course-home'}">Back</v-btn>
      </v-toolbar>
    </template>

    <template v-slot:item.subject_name="{ item }">
      <v-btn
        text
        color="success"
        :to="{ name: 'show-content' , params:{slug: item.slug}}"
      >{{ item.subject_name}}</v-btn>
    </template>
    <template v-slot:item.actions="{ item }">
      <td>
        <v-btn icon  :to="{ name: 'edit-content' , params:{id: item.id}}">
        <v-icon small class="mr-2">mdi-pencil</v-icon>
        </v-btn>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </td>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CourseContent",
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "S.No.",
        align: "start",
        sortable: false,
        value: "item.id"
      },
      { text: "Subject Name", value: "subject_name", align: "center" },
      { text: "Course", value: "course" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    desserts: []
  }),

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions({
      getSubject: "content/getSubject"
    }),
    initialize() {
      this.getSubject().then(response => {
        this.desserts = response.data.data;
      });
    }
  }
};
</script>
