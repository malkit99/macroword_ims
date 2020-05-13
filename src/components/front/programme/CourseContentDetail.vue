<template>
  <div>
    <v-toolbar
      color="red"
      dark
      flat
    >
    <v-toolbar-title>{{ items.title}}</v-toolbar-title>
      <template v-slot:extension>
        <v-tabs
          v-model="tab"
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab v-for="(item , index) in items.subjects" :key="index" @click="getContent(item.slug)">
            {{ item.subject_name }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="(item , index) in items.subjects"
        :key="index"
      >
        <v-container>
            <v-row 
            align="center" 
            justify="center"   
            >
        <v-col cols="12" sm="12" md="12" >
            <v-expansion-panels>
                <v-expansion-panel
                  v-for="(content , index) in contents" 
                  :key="index"
                >
                <v-expansion-panel-header>{{ content.topic}}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card flat>
                    <v-card-text v-html="content.description">

                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
                </v-col>
            </v-row>
        </v-container>   
       
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
  export default {
      name:"CourseContentDetail",
      props:['items'],
    data () {
      return {
        tab: null,
      }
    },

      computed: {
      ...mapGetters({
          contents:'website_detail/getContentBySlug',
      }),
    },

    methods: {
      ...mapActions({
        getContentBySlug:'website_detail/getContentBySlug'
      }),
      getContent(item){
        this.getContentBySlug(item)
        .then((response) => {
          console.log(response);
        })
      }
    },
  }
</script>