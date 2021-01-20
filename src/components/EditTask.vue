<template>
  <div class="edit-task">
    <form @submit="editTask">
      <div class="input-wrap">
            <input 
            type="text" 
            v-model="title" 
            name="title" 
            spellcheck="false" 
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            >
            <textarea 
            v-model="text" 
            name="text" 
            spellcheck="false" 
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            ></textarea>
        </div>
      <button type="submit">confirm</button>
    </form>
    <!-- <button @click="deleteTask">delete task</button> -->
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';



export default {
  name: 'EditTask',
  props: {
  
  },
  data() {
    return {
      title: '',
      text: '',
    }
  },
  methods: {
    editTask(e) {
      e.preventDefault();      
      const newTaskObj = {
        uuid: uuidv4(),
        title: this.title,
        text: this.text,
        completed: false,
      }      
      this.$emit('edit-task', newTaskObj);
      this.title = this.text = '';
    },
  },
  mounted() {
    
  }
}
</script>

<style scoped>

.edit-task {
	position: fixed;
	bottom: 0;
	height: 40vh;
	background: #000;
	padding: 20px;
	box-sizing: border-box;
	transition: all ease .25s;
	transform: translate(0px,100%);
}

.edit-open .edit-task {
	transform: translate(0px,0%);
}

</style>