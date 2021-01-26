<template>
  <ul v-bind:class="{ 'completed': task.completed }" class="task-item">
    <li class="check">
        <span>complete</span>
        <div class="round">
            <input type="checkbox" id="checkbox" />
            <label for="checkbox" @click="$emit('complete-task', task.uuid)"></label>
        </div>
    </li>
    <li class="title-and-text" @click="$emit('edit-task', task.uuid)">
        <h3>{{ task.title }}</h3>
        <p>{{task.text}}</p>
    </li>
    <li class="bin" @click="$emit('bin-task', task.uuid)">bin</li>
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



ul {
  display: flex;
  flex-flow: row wrap;
  list-style: none;
  margin: 0 auto;
  padding: 0;
}

li {
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
  display: flex;
  border-radius: 4px;
  background: #e6e4e0;
}

.dark li {
  background-color: #181818;
}

.dark li:hover {
  background-color: #282828;
}

li a {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	color: #2c3e50;
	text-decoration: none;
	font-weight: 900;
	font-size: 1.3rem;
}

.dark li a {
	color: #fff;
}

.task-item {
    cursor: pointer;
}
  .completed {
    color: #999;
  }
  p {
	padding: 0.4em;
	border: 1px solid #00d1b200;
	margin: 0;
	font-size: 16px;
}

ul.task-item .check ,
ul.task-item:hover .check {
	background: transparent;
}

ul.task-item {
  flex-flow: row nowrap;
  margin: 0;
  align-items: flex-start;
}
ul.task-item .check {
  width: 60px;
  height: 100%;
  display: block;
}

ul.task-item .check span {
  display: none;
}

ul.task-item .title-and-text {
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  background: transparent;
  padding: 0 0 0 10px;
  box-sizing: border-box;
}

ul.task-item .title-and-text h3, 
ul.task-item .title-and-text p {
  padding: 0;
  margin: 0;
  width: 100%;
display: block;
}

ul.task-item .title-and-text h3 {
  font-size: .88rem;
}

ul.task-item .title-and-text p {
  font-size: .8rem;
}

ul.task-item.completed  .title-and-text {
    text-decoration: line-through;
  }

.round {
	position: relative;
  transform: translate(0px,-1px);
}

.round input[type="checkbox"] {
	visibility: hidden;
}

.round label {
	background-color: #282828;
	border: 2px solid #ccc;
	border-radius: 50%;
	cursor: pointer;
	height: 20px;
	left: 0;
	position: absolute;
	top: 0;
	width: 20px;
	transition: all ease .25s;
}

.round label::after {
	border: 2px solid #111;
	border-top: none;
	border-right: none;
	content: "";
	height: 6px;
	left: 3px;
	opacity: 0;
	position: absolute;
	top: 5px;
	transform: rotate(-45deg);
	width: 12px;
}
ul.task-item .check {
	display: flex;
	flex-flow: row;
	justify-content: center;
	align-items: center;
}

.round:hover label {
	background-color: #668ebb;
	border-color: #668ebb;
}

.completed .round label {
	background-color: #6a6a6a;
	border-color: #6a6a6a;
}

.completed .round label::after,
.round:hover label::after {
	opacity: 1;
}

</style>