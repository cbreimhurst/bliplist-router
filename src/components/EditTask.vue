<template>
  <div class="edit-task">
    {{edit_title}}
    <form @submit="editTask">
      <div class="input-wrap">
            <input 
            type="text" 
            v-model="edit_title" 
            name="title" 
            spellcheck="false" 
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            >
            <textarea 
            v-model="edit_text" 
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



export default {
  name: 'EditTask',
  props: {
    task: {
        type: String
    },
      edit_title: {
        type: String
    },
      edit_text: {
        type: String
    }
  },
  data() {
    return {
    }
  },
  methods: {
    editTask(e) {
      e.preventDefault();      
      const newTaskObj = {
       // uuid: uuidv4(),
        title: this.title,
        text: this.text,
        completed: false,
      }      
      this.$emit('edit-task', newTaskObj);
      this.title = this.text = '';
    },
  },
  mounted() {
   // console.log(this.task)
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