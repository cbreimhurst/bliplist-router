<template>
    <div>
        <h2>{{title}}</h2>
        <ul class="list">
            <li v-bind:key="task.uuid" :data-id="task.uuid" v-for="task in tasksArr">
            <Task  v-bind:task="task" v-on:delete-task="deleteTask" v-on:complete-todo="markComplete"/>
            </li>
        </ul>
        <a href="/lists"><button>All Lists</button></a>
    </div>
</template>

<script>
import Task from './../components/Task.vue';

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ezobnhwtsnemtgajfsce.supabase.co'
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

export default {
    name: 'List',
    components: {
        Task
    },
    props: [
        "tasks"
    ],
    data() {
        return {
            list_id: null,
            lists: null,
            tasksArr: [],
            error: null,
            title: null
        }
    },
     methods: {
        async deleteTask(id) {
            console.log(id)
            await supabase
            .from('tasks')
            .delete()
            .eq('uuid', id)
        },
        async markComplete(taskID) {
            let todosObj = this.todos;
            var todoItem = todosObj.find(function(todo) {
                if(todo.uuid == taskID)
                return true;
            });
            todoItem.completed = !todoItem.completed
            //console.log(todoItem.completed)
            let complete = todoItem.completed
            console.log(complete)

            //console.log(complete)
            await supabase
                .from('tasks')
                .update({ completed: complete })
                .eq('uuid', taskID)

        // localStorage.todos = JSON.stringify(this.todos);
        },
    },
    async created() {

        let uuid = this.$route.params.uuid;

        let { data: lists, error } = await supabase
        .from('lists')
        .select("*")
        .eq('uuid', uuid)

        let listID = lists[0].id
        this.title = lists[0].name
        this.lists = lists

        this.error = error

        let { data: tasks, taskError } = await supabase
        .from("tasks")
        .select("*")
        .eq('list_id', listID)

        this.error = taskError
        
        this.tasksArr = tasks;
    },
}
</script>

<style scoped>
h2 {
    font-size: 3rem;
    font-weight: 900;
}
ul.list {
	flex-flow: column;
}
li.task {
width: 100%;
min-height: 50px;
margin-bottom: 15px;
padding: 10px;
}

li {
  min-height: 100px;
  display: flex;
  align-items: center;
}


.list > li {
  margin-bottom: 10px;
  min-height: 100px;
  display: flex;
  align-items: center;
}

</style>
