<template>
    <div>
        <h2 @click="loadTasks">{{title}}</h2>
        <ul>
            <li>Last updated: {{listUpdated}}</li>
            <li>Created on: {{listCreated}}</li>
        </ul>
        <AddTask v-on:add-task="addTask" />
        <ul class="list">
            <li v-bind:key="task.uuid" :data-id="task.uuid" v-for="task in tasksArr">
            <Task  v-bind:task="task" v-on:delete-task="deleteTask" v-on:bin-task="binTask" v-on:complete-task="markComplete" v-on:edit-task="editTask" />
            </li>
        </ul>
        <a href="/lists" class="all-lists"><button>← All Lists</button></a>


        <EditTask v-on:edit-task="editTask" />
    </div>
</template>

<script>
import Task from './../components/Task.vue';
import AddTask from './../components/AddTask.vue';
import EditTask from './../components/EditTask.vue';

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ezobnhwtsnemtgajfsce.supabase.co'
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

export default {
    name: 'List',
    components: {
        Task,
        AddTask,
        EditTask
    },
    props: [
        "tasks",
    ],
    data() {
        return {
            list_id: null,
            listUUID: null,
            listUpdated: null,
            listCreated: null,
            lists: null,
            tasksArr: [],
            error: null,
            title: null,
            // edit_task_id: null,
            // edit_title: null,
            // edit_text: null,
        }
    },
     methods: {
         async addTask(newTaskObj) {
            let d = new Date();
            let listUUID = this.$route.params.uuid;
            newTaskObj.list_id = this.list_id
            await supabase.from("tasks").insert([newTaskObj]);
            await supabase
                .from('lists')
                .update({ updated_at: d.toISOString() })
                .eq('uuid', listUUID)
        },
        async editTask(taskID) {
            console.log(taskID)
            // let taskArrItem = this.tasksArr.findIndex(x => x.uuid === taskID)
            // this.edit_task_id = taskArrItem
            // this.edit_title = this.tasksArr[taskArrItem].title
            // this.edit_text = this.tasksArr[taskArrItem].text

            let app = document.querySelector('#app');
            if (app.classList.contains('edit-open')) {
                app.classList.remove('edit-open')
            } else {
                app.classList.add('edit-open')
            }
        },
        async deleteTask(id) {
            await supabase
            .from('tasks')
            .delete()
            .eq('uuid', id)
        },
        async markComplete(taskID) {
            console.log(taskID)
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
        async binTask(taskID) {
            let taskObj = this.tasksArr;
            var taskItem = taskObj.find(function(task) {
                if(task.uuid == taskID)
                return true;
            });
            taskItem.in_trash = !taskItem.in_trash
            console.log(taskItem)
            let trashed = taskItem.in_trash
            await supabase
                .from('tasks')
                .update({ in_trash: trashed })
                .eq('uuid', taskID)
            this.loadTasks()
        },
        async loadTasks() {

            let { data: lists, error } = await supabase
            .from('lists')
            .select("*")
            .eq('uuid', this.listUUID)

            let listID = lists[0].id
            this.list_id = lists[0].id
            this.listUpdated = lists[0].updated_at
            this.listCreated = lists[0].inserted_at
            this.title = lists[0].name
            this.lists = lists

            this.error = error

            let { data: tasks, taskError } = await supabase
            .from("tasks")
            .select("*")
            .eq('list_id', listID)
            .neq('in_trash', true)
            .order('inserted_at', {ascending: false})

            this.error = taskError
            
            this.tasksArr = tasks;
        },
    },
    async created() {
        this.listUUID = this.$route.params.uuid;
        this.loadTasks();
    },
      mounted() {
        supabase
        .from('tasks')
        .on('INSERT', payload => {
            this.tasksArr.unshift(payload.new);
        })
        .on('UPDATE', payload => {
            let updatedUUID = payload.new.uuid
            let taskArrItem = this.tasksArr.findIndex(x => x.uuid === updatedUUID)
            Object.assign(this.tasksArr[taskArrItem], payload.new);
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
  min-height: 50px;
  display: flex;
  align-items: center;
}


.list > li {
  margin-bottom: 10px;
  min-height: 50px;
  display: flex;
  align-items: center;
}


.all-lists button {
  background-color: #181818;
  background-color: #181818;
  color: #fff;
  font-size: 1.3rem;
  padding: 10px 30px;
  border-radius: 4px;
  margin-top: 60px;
  transition: all ease .25s;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: 900;
  border: solid #fff 1px;
}

.all-lists button:hover {
  background: #282828;
  border: solid #66bb6a 1px;
}


</style>
