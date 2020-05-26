export default {
    data() {
        return {
            requiredRules:[
                v => !!v || 'This Field is Required',
              ],
            passwordRules:[
            v => (v && v.length >= 8) || 'Password to Short',
            ],

            emailRules: [
      
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
              ],
        }
    },

    
}