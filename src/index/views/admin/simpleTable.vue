<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        >
        </v-divider>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2"  >New Item</v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'S.No.',
          align: 'start',
          sortable: false,
          value: 'sno',
        },
        { text: 'Image', value: 'image' },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Join At', value: 'join' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [], 
    }),

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
         
            {
            sno: 1.,
            image: "Image",
            name: 'Malkit Singh',
            email: 'admin@gmail.com',
            join: '26-02-2020',
          },
        ]
      },  
    },
  }
</script>
