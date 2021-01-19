<template>
    <div>
        <h2>{{title}}</h2>
        <ul class="list">
            <li v-bind:key="task.uuid" :data-id="task.uuid" v-for="task in tasksArr">
            <Task  v-bind:task="task" v-on:delete-task="deleteTask" v-on:complete-task="markComplete"/>
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
            await supabase
            .from('tasks')
            .delete()
            .eq('uuid', id)
        },
        async markComplete(taskID) {
            let taskObj = this.tasksArr;
            var taskItem = taskObj.find(function(task) {
                if(task.uuid == taskID)
                return true;
            });
            taskItem.completed = !taskItem.completed
            let complete = taskItem.completed
            await supabase
                .from('tasks')
                .update({ completed: complete })
                .eq('uuid', taskID)
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
      mounted() {
        supabase
        .from('tasks')
        .on('INSERT', payload => {
        console.log('Change received!', payload)
        this.tasksArr.push(payload.new);
        })
        .on('UPDATE', payload => {
        console.log('Change received!', payload)
        })
        .on("DELETE", payload => {
            const id = payload.old.id;
            const index = this.tasksArr.map(x => x.id).indexOf(id);
            this.tasksArr.splice(index, 1)
        })
        .subscribe();

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
