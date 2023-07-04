<template>
  <div class="container">
    <Header title="Task Tracker"></Header>
    <AddTask @add-task="addTask"/>
    <Tasks
      @toggle-reminder="toggleReminder"
      @delete-task="deleteTask" 
      v-bind:tasks="tasks"
    />
  </div>
</template>

<script>
import AddTask from './components/AddTask.vue';
import Header from './components/Header.vue';
import Tasks from './components/Tasks.vue';


export default {
  name: 'App',
  components: {
    Header,
    Tasks,
    AddTask   
  },
  data() {
    return {
      tasks: []
    }
  },
  methods: {
    addTask(task) {
      task.id = this.tasks.slice(-1)[0].id + 1
      this.tasks = [...this.tasks, task]
      console.log(this.tasks)
    },
    deleteTask(id) {
      if (confirm('Are you sure?')) {
        this.tasks = this.tasks.filter((task) => task.id !== id)
      }
    },
    toggleReminder(id) {
      this.tasks = this.tasks.map((task) => 
        task.id === id ? {...task, reminder: !task.reminder} : task
      )
    }
  },
  created() {
    this.tasks = [
    {
    id: 1,
    text: 'Meeting with client',
    day: '1st Of July 2023 9:30am',
    reminder: true
    },
    {
    id: 2,
    text: 'Lunch break',
    day: '2nd Of July 2023 12:00pm',
    reminder: false
    },
    {
    id: 3,
    text: 'Team brainstorming session',
    day: '3rd Of July 2023 2:00pm',
    reminder: true
    },
    {
    id: 4,
    text: 'Conference call with stakeholders',
    day: '4th Of July 2023 10:00am',
    reminder: true
    },
    {
    id: 5,
    text: 'Project presentation',
    day: '5th Of July 2023 3:30pm',
    reminder: false
    },
    {
    id: 6,
    text: 'Networking event',
    day: '6th Of July 2023 6:00pm',
    reminder: true
    },
    {
    id: 7,
    text: 'Training session',
    day: '7th Of July 2023 11:00am',
    reminder: false
    }    
    ]

  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');

/* css reset */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', sans-serif;
}

.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}

.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%;
}
</style>
