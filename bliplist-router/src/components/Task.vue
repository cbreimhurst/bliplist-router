<template>
  <ul v-bind:class="{ 'completed': task.completed }" class="task-item">
    <li @click="$emit('complete-task', task.uuid)">{{ task.title }}</li>
    <li class="edit">edit</li>
    <li class="delete" @click="$emit('delete-task', task.uuid)">delete</li>    
  </ul>
</template>
<script>
export default {
  name: 'Task',
  props: [
    "task"
  ],
  methods: {
  }
}
</script>
<style scoped>
.task-item {
    cursor: pointer;
}
  .completed {
    text-decoration: line-through;
    color: #999;
  }
  p {
	padding: 0.4em;
	border: 1px solid #00d1b200;
	margin: 0;
	font-size: 16px;
}
</style>