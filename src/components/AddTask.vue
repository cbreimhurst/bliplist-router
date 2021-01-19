<template>
  <div class="add-task">
    <form @submit="addTask">
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
      <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="12" y1="5" x2="12" y2="19" />
  <line x1="5" y1="12" x2="19" y2="12" />
</svg></button>
    </form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';



export default {
  name: 'AddTask',
  props: {
  
  },
  data() {
    return {
      title: '',
      text: '',
    }
  },
  methods: {
    addTask(e) {
      e.preventDefault();      
      const newTaskObj = {
        uuid: uuidv4(),
        title: this.title,
        text: this.text,
        completed: false,
      }      
      this.$emit('add-task', newTaskObj);
      this.title = this.text = '';
    },
  },
  mounted() {
    
  }
}
</script>

<style scoped>


.add-task form .input-wrap {
  
  padding-right: 30px;
}

.add-task form .input-wrap input[type="text"] {

  width: 100%;
  background: #000;
  border: none;
  color: #fff;
  padding: 5px;
  font-size: 1.5rem;
  font-weight: 900;
}
.add-task form .input-wrap textarea {
  width: 100%;
  background: #000;
  border: none;
  height: 80px;
  box-sizing: border-box;
}
.add-task form {
  display: flex;
  flex-flow: row nowrap;
  border-radius: 4px;
  background: #181818;
  padding: 10px;
  margin-bottom: 10px;
  align-items: center;
}
.add-task form button {
  background-color: #333333;
  border: none;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  line-height: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  box-sizing: border-box;
}
.add-task form button line {
  color: #f4f3f0;
}
.add-task form button svg {
  height: 30px;
  width: 30px;
}

</style>