<template>
  <div>
    <v-toolbar
      color="red"
      dark
      flat
    >

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
                    <v-card
                    min-width="250"
                    >
                    <v-img
                    height="200"
                    src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                    ></v-img>

                    <v-card-title>Cafe Badilico</v-card-title>

                    <v-card-text>
                    <v-row
                    align="center"
                    class="mx-0"
                    >
                    <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                    ></v-rating>

                    <div class="grey--text ml-4">4.5 (413)</div>
                    </v-row>
                    <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
                    </v-card-text>
                    <v-card-actions>
                    <v-btn
                    color="deep-purple lighten-2"
                    text
                    :to="{name:'course-detail'}"
                    >
                    Reserve
                    </v-btn>
                    </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>   
       
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
  export default {
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