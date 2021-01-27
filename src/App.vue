<template>
  <div id="app" v-on:mode="toggle" :class="mode">
 <Header :mode="mode" @toggle="toggle" />
 <pre>{{session}}</pre>
 <pre>{{user}}</pre>
 <main>
 <router-view/>
 </main>
  </div>
</template>

<script>
import Header from './components/Header.vue'

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ezobnhwtsnemtgajfsce.supabase.co'
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

export default {
  name: 'App',
  components: {
   Header,
  },
  data() {
    return {
      mode: 'light',
      session: null,
      user: null
    }
  },
  methods: {
    toggle() {
      if (this.mode === "dark") {
        this.mode = "light"
      } else {
        this.mode = "dark"
      }
    }
  },
  mounted() {
    if (localStorage.mode) {
      this.mode = localStorage.mode;
    }
  },
      async created() {

   
    this.session = supabase.auth.session()
    this.user = supabase.auth.user()

    },
  watch: {
    mode(newMode) {
      localStorage.mode = newMode;
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f4f3f0;
  color: #2c3e50;
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
  padding: 15px;
  min-height: 100vh;
}

#app.dark {
  background: #121212;
  color: #f4f3f0;
}

body{
  margin: 0 ;
}

body,
input[type="text"],
textarea {
  font-size: 16px;
}

main {
    max-width: 500px;
    margin: 0 auto;
}

</style>
