<template>
    <div>
        <v-container>
            <v-col cols="12" sm="6" md="12" v-for=" k in 3" :key="k">
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
                    </v-card-text>
                    <v-card-actions>
                    <v-btn
                    color="deep-purple lighten-2"
                    text
                    @click="reserve"
                    >
                    Reserve
                    </v-btn>
                    </v-card-actions>
                    </v-card>
            </v-col>
        </v-container>
     
    </div>
</template>
<script>
export default {
    name:"PopularCourse",
}
</script>