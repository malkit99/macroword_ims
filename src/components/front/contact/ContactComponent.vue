<template>
    <div>
        <v-card flat >
            <v-toolbar dark color="red" class="d-flex d-sm-none mt-2">

             <v-toolbar-title >
                    Get A Call Back
            </v-toolbar-title>
            </v-toolbar>
                <v-form>
                    <v-card-text>
                        <p class="headline text-center">Get a call Back </p>
                        <v-col cols="12" offset-md="2" md="8" offset-sm="3" sm="6">
                            <v-text-field
                                name=""
                                label="Enter Your Name"
                                outlined
                            >
                            </v-text-field>
                             <v-text-field
                                name=""
                                label="Enter Your Mobile Number"
                                outlined
                            >
                            </v-text-field>

                            <v-text-field
                                name=""
                                label="Enter Your Email"
                                outlined
                            >
                            </v-text-field>
                           <v-textarea
                            outlined
                            name="message"
                            label="Some Message"
                            value="The Woodman set to work at once, and so"
                            ></v-textarea>
                        <v-btn block color="success">Get A Call Back</v-btn>
                        </v-col>
                    </v-card-text>
                </v-form>
        </v-card>
    </div>
</template>
<script>
export default {
    name:"ContactPage",
}
</script>