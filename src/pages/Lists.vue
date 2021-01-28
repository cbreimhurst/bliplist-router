<template>
    <div class="lists">
        <h2>Lists</h2>
        <pre>{{user_info}}</pre>
        
        {{error}}
         <ul>
            <li v-bind:key="list.uuid" :data-id="list.uuid" v-for="list in listsArr">
                <a :href="'/list/'+ list.uuid">{{list.name}}</a>
            </li>
        </ul>
    </div>
</template>

<script>

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ezobnhwtsnemtgajfsce.supabase.co'
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

export default {
    name: 'Lists',
    props: [
        "lists"
    ],
        data() {
        return {
            listsArr: [],
            user_info: null
        }
    },
  mounted() {
        if (localStorage.supabase.auth.token) {
            this.user = localStorage.supabase.auth.token.currentSession.user;
        }

  },
    async created() {

        if (this.user_info) {
            let { data: lists, error } = await supabase
            .from('lists')
            .select("*")
            .eq('user_uuid', this.user_info.id)

            this.listsArr = lists
            this.error = error
        }

    },
}
</script>

<style scoped>

li {
  width: 32%;
  height: 100px;
  justify-content: center;
  align-items: center;
  margin-right: 1%;
  margin-bottom: 10px;
  border-radius: 4px;
}

</style>