<template>
    <div class="sign-up">
        <h2>Sign Up</h2>
        <pre>
            {{user}}
        </pre>
        <pre>
            {{error}}
        </pre>
       <form @submit="send">
           <div class="input-wrap">
               <label for="email">
                   <input 
                   type="email" 
                   v-model="signUp.email" 
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
                   v-model="signUp.password" 
                   name="password" 
                   spellcheck="false" 
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      >
                   </label>
           </div>

           <input type="submit" value="Sign Up">
       </form>
    </div>
</template>

<script>

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ezobnhwtsnemtgajfsce.supabase.co'
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

export default {
    name: 'SignUp',
    props: [
        "signup"
    ],
    data() {
        return {
            signUp: {
                email: null,
                password: null
            },
            error: null,
            user: null
        }
    },
    async created() {



    },
    methods: {
        async send(e) {
        e.preventDefault();      
        let { user, error } = await supabase.auth.signUp(this.signUp)
        this.error = error
        this.user = user
        this.signUp.email = this.signUp.password = ""
    }
},
}
</script>

<style scoped>

</style>