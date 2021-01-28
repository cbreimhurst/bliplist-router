<template>
    <div class="log-in">
        <h2>Log In</h2>
        <pre>
            {{error}}
        </pre>
       <form @submit="send">
           <div class="input-wrap">
               <label for="email">
                   <input 
                   type="email" 
                   v-model="logIn.email" 
                   name="email"
                   spellcheck="false" 
                    autocomplete="off"
                    autocorrect="off"
                    autocapitalize="off"
                    >
                   </label>
           </div>
           <div class="input-wrap">
               <label for="password">
                   <input 
                   type="password" 
                   v-model="logIn.password" 
                   name="password" 
                   spellcheck="false" 
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      >
                   </label>
           </div>

           <input type="submit" value="Log In">
       </form>
    </div>
</template>

<script>

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ezobnhwtsnemtgajfsce.supabase.co'
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

export default {
    name: 'LogIn',
    props: [
        "login"
    ],
    data() {
        return {
            logIn: {
                email: null,
                password: null
            },
            error: null,
            user: null
        }
    },
    async created() {



    },
      mounted() {
        // if (localStorage.supabase.auth.token) {
        //     this.user = localStorage.supabase.auth.token.currentSession.user;
        // }
        this.user = supabase.auth.session()

  },
    methods: {
        async send(e) {
            e.preventDefault();      
            let { user, error } = await supabase.auth.signIn(this.logIn)
            this.error = error
            this.user = user
            this.logIn.email = this.logIn.password = ""
        }
},
}
</script>

<style scoped>

</style>