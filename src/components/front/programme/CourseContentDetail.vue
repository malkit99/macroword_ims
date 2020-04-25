<template>
  <div>
    <v-toolbar
      color="red"
      dark
      flat
    >
    <v-toolbar-title>Diploma In Office Automation & Publishing Training Content</v-toolbar-title>
      <template v-slot:extension>
        <v-tabs
          v-model="tab"
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-container>
            <v-row 
            align="center" 
            justify="center"   
            v-for="n in 3"
            :key="n"
            :class="n === 1 ? 'mb-6' : ''"
            >
                <v-col cols="12" sm="2" md="4"  v-for="k in 3" :key="k">
                    <h1>Training Programme</h1>
                </v-col>
            </v-row>
        </v-container>   
       
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
  export default {
      name:"CourseContentDetail",
    data () {
      return {
        tab: null,
        items: [
          'web', 'shopping', 'videos', 'images', 'news',
        ],
      }
    },
  }
</script>