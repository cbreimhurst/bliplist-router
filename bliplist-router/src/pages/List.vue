<template>
    <div>
 
        <ul>
            <li v-bind:key="todo.uuid" :data-id="todo.uuid" v-for="todo in routeTodos">{{todo.title}}</li>
        </ul>
       

    </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ezobnhwtsnemtgajfsce.supabase.co'
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

export default {
    data() {
        return {
            list_id: null,
            lists: null,
            routeTodos: [],
            error: null
        }
    },
    name: 'ListsRoute',
    async created() {

        let uuid = this.$route.params.uuid;

        let { data: lists, error } = await supabase
        .from('lists')
        .select("*")
        .eq('uuid', uuid)

        let listID = lists[0].id

        this.lists = lists

        this.error = error

        let { data: tasks, taskError } = await supabase
        .from("tasks")
        .select("*")
        .eq('list_id', listID)

        this.error = taskError
        
        this.routeTodos = tasks;
    },
}
</script>

<style scoped>

</style>
