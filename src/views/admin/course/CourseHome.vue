<template>
  <v-data-table
    :headers="headers"
    :items="courses"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Course List</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
          <template>
            <v-btn color="primary" dark class="mx-2" :to="{name: 'create-course'}">Create Course </v-btn>
            <v-btn color="primary" dark class="mx-2" :to="{name: 'category-home'}">Manage Category</v-btn>
            <v-btn color="primary" dark class="mx-2" :to="{name: 'course-content'}">Manage Course Content</v-btn>
          </template>
      </v-toolbar>
    </template>

<template v-slot:item.sno="{ item }">
    {{ 1 }}
</template>

<template v-slot:item.image="{ item }">
     <v-avatar color="indigo" size="64">
        <img :src="item.course_image" :alt="item.name" />
      </v-avatar>
</template>

<template v-slot:item.course_name="{ item }">
    <v-btn text color="success" :to="{ name: 'show-course' , params:{slug: item.slug }}">{{ item.course_name }}</v-btn>   
</template>

<template v-slot:item.category="{ item }">
<v-btn text color="success">{{item.category.name}}</v-btn>
     
</template>
<template v-slot:item.status="{ item }">
  <v-switch value  color="red" v-model="item.status" @change="changeStatus(item)" :input-value="item.status == 1 ? true : false "></v-switch>
</template>
<template v-slot:item.popular_course="{ item }">
  <v-switch value  color="success" v-model="item.popular_course" @change="changePopular(item)" :input-value="item.popular_course == 1 ? true : false "></v-switch>
</template>
    <template v-slot:item.actions="{ item }">
      
      <v-btn icon color="primary" :to="{name: 'edit-course' , params:{id : item.id}}">    
        <v-icon small class="mr-2"> mdi-pencil</v-icon>
      </v-btn>
      
      <v-btn @click="deleteItem(item)" icon color="error" >    
      <v-icon small> mdi-delete </v-icon>
      </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" >Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';
  export default {
    data: () => ({

      headers: [
        {
          text: 'S.No.',
          align: 'start',
          sortable: false,
          value: 'sno',
        },
        { text: 'Image', value: 'image' , align: 'center'},
        { text: ' Course Name', value: 'course_name' , align: 'center' },
        { text: 'Course Category', value: 'category' , align: 'center'},
        { text: 'Status', value: 'status' , align: 'center' },
        { text: 'Popular', value: 'popular_course' , align: 'center' },
        { text: 'Start', value: 'create', align: 'center' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],

      courses:[],
    }),

  

    created () {
      this.initialize()
    },
  
    methods: {
      ...mapActions({
        addNotification:'application/addNotification',
        addLoading: "loading/addLoading",
        removeloading: "loading/removeloading",
        getCourse:'course/getCourse',
        removeCourse:'course/removeCourse',
        updateStatus:'course/updateStatus',
        popularStatus:'course/popularStatus',
      }),
      
      initialize () {
         this.addLoading({ show: true , text: "Please Wait Data Uploading ..." });
        this.getCourse()
        .then((response) => {
          this.removeloading({ show: false });
          this.courses = response.data.data
        })
        .catch((error) => {
          this.removeloading({ show: false });
        });
      },

      deleteItem(item) {
        const index = this.courses.indexOf(item);
        confirm('Are you sure you want to delete this item?') && this.courses.splice(index, 1);
        this.removeCourse(item)
        .then((response) => {
           this.addNotification({
                show: true,
                text : 'Course  Deleted SuccessFully'
            });
        })
        .catch((error) => {
           this.addNotification({
                show: true,
                text : 'Course Not Deleted'
              });
        })
      },

    changeStatus(item){
      const data = {id: item.id , status: item.status}
      this.updateStatus(data)
      .then((response) => {
        this.addNotification({
          show: true,
          text : 'Course Status Updated Successfully'
        });
      })
      .catch((error) => {
          this.addNotification({
            show: true,
            text : 'Course Status Not Updated'
        });
      })
    },

    changePopular(item){
      const data = {id: item.id , popular_course: item.popular_course}
      this.popularStatus(data)
      .then((response) => {
        this.addNotification({
          show: true,
          text : 'Course Status Popular Updated Successfully'
        });
      })
      .catch((error) => {
          this.addNotification({
            show: true,
            text : 'Course Status Popular Not Updated'
        });
      })
    },

    
    },
  }
</script>
