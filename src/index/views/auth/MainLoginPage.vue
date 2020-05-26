<template>
   <v-container  fluid>
       <v-row align="center" justify="center" class="fill-height">
<v-col cols="12" md="3" sm="6">
<v-hover v-slot:default="{ hover }" open-delay="200">
                <v-card flat :elevation="hover ? 16 : 2">
                <v-img
                :aspect-ratio="16/9"
                src="https://cdn.vuetifyjs.com/images/cards/kitchen.png"
                >
                <v-expand-transition>
                <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-in orange darken-2 v-card--reveal display-2 white--text align-center justify-center "
                style="height: 100%;"
                >
                Home
                </div>
                </v-expand-transition>
                </v-img>
                <v-card-text
                class="pt-6"
                style="position: relative;"
                >
                <v-btn
                absolute
                color="orange"
                class="white--text"
                fab
                large  
                top
                right
                :to="{path:'/'}"
                >
                <v-icon>mdi-home</v-icon>
                </v-btn>
                <p class="text--center red--text font-weight-bold ">Macroword Computer Academy</p>
                </v-card-text>
                </v-card>
</v-hover>
</v-col>
<v-col cols="12" md="3" sm="6">
<v-hover v-slot:default="{ hover }" open-delay="200">
                <v-card flat :elevation="hover ? 16 : 2">
                <v-img
                :aspect-ratio="16/9"
                src="https://cdn.vuetifyjs.com/images/cards/kitchen.png"
                >
                <v-expand-transition>
                <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-in orange darken-2 v-card--reveal display-2 white--text align-center justify-center "
                style="height: 100%;"
                >
                Center login
                </div>
                </v-expand-transition>
                </v-img>
                <v-card-text
                class="pt-6"
                style="position: relative;"
                >
                <v-btn
                absolute
                color="orange"
                class="white--text align-center"
                fab
                large  
                top
                right
                @click="toAdmin"
                >
                <v-icon>mdi-home</v-icon>
                </v-btn>
                <p class="text--center red--text font-weight-bold ">Macroword Computer Academy</p>
                </v-card-text>
                </v-card>
</v-hover>
</v-col>
<v-col cols="12" md="3" sm="6">
<v-hover v-slot:default="{ hover }" open-delay="200">
                <v-card flat :elevation="hover ? 16 : 2">
                <v-img
                :aspect-ratio="16/9"
                src="https://cdn.vuetifyjs.com/images/cards/kitchen.png"
                >
                <v-expand-transition>
                <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-in orange darken-2 v-card--reveal display-2 white--text align-center justify-center "
                style="height: 100%;"
                >
                student login
                </div>
                </v-expand-transition>
                </v-img>
                <v-card-text
                class="pt-6"
                style="position: relative;"
                >
                <v-btn
                absolute
                color="orange"
                class="white--text align-center"
                fab
                large  
                top
                right
                :to="{path:'/signin'}"
                >
                <v-icon>mdi-home</v-icon>
                </v-btn>
                <p class="text--center red--text font-weight-bold ">Macroword Computer Academy</p>
                </v-card-text>
                </v-card>
</v-hover>
</v-col>
<v-col cols="12" md="3" sm="6">
    <v-hover v-slot:default="{ hover }" open-delay="200">
                <v-card flat  :elevation="hover ? 16 : 2"
          class="mx-auto">
                <v-img
                :aspect-ratio="16/9"
                src="https://cdn.vuetifyjs.com/images/cards/kitchen.png"
                >
                <v-expand-transition>
                <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-in orange darken-2 v-card--reveal display-2 white--text align-center justify-center "
                style="height: 100%;"
                >
                learn Online
                </div>
                </v-expand-transition>
                </v-img>
                <v-card-text
                class="pt-6"
                style="position: relative;"
                >
                <v-btn
                absolute
                color="orange"
                class="white--text align-center"
                fab
                large  
                top
                right
                :to="{path:'/signin'}"
                >
                <v-icon>mdi-home</v-icon>
                </v-btn>
                <p class="text--center red--text font-weight-bold ">Macroword Computer Academy</p>
                </v-card-text>
                </v-card>
</v-hover>
</v-col>
       </v-row>
   </v-container>
</template>
<script>
export default {
    name:"MainLoginPage",

    methods: {
        toAdmin(){
            this.$router.push({path:'/admin'})
            location.reload()
        }
    },
}
</script>