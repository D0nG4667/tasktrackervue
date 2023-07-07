<template>
    <AddTask 
    v-show="showAddTask"
    @add-task="addTask"        
    />

    <Tasks
      @toggle-reminder="toggleReminder"
      @delete-task="deleteTask" 
      v-bind:tasks="tasks"
    />
</template>
<script>
import AddTask from '../components/AddTask.vue';
import Tasks from '../components/Tasks.vue';

const apiJsonDb = 'https://json-server-render-2d8x.onrender.com/tasks'

export default {
    name: 'Home',
    props: {
        title: String,
        showAddTask: Boolean,
    },
    components: {
        Tasks,
        AddTask
    },
    data() {
        return {
            tasks: [],
        }
    },
    methods: {
    async addTask(task) {      
      try {
        const res = await fetch(apiJsonDb, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',          
        },
        body: JSON.stringify(task),
      })

      const data = await res.json()
      
      this.tasks = [...this.tasks, data]

      } catch (error) {
        // console.log(error)        
      }      
    },
    async deleteTask(id) {      
      if (confirm('Are you sure?')) {
        try {
          const res = await fetch(`${apiJsonDb}/${id}`, {
            method: 'DELETE',            
          }) 

          res.status === 200 ?
            this.tasks = this.tasks.filter((task) => task.id !== id)
            :
            alert('Error deleting task')
        
        } catch (error) {
        // console.log(error)        
        }        
      }
    },
    async toggleReminder(id) {
      try {
        const taskToToggle = await this.fetchTask(id)
        const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}
        
        const res = await fetch(`${apiJsonDb}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(updateTask), 
        })

        const data = await res.json()

        this.tasks = this.tasks.map((task) => 
        task.id === id ? {...task, reminder: data.reminder} : task
      )
        
      } catch (error) {
        console.log(error);        
      }
    },
    async fetchTasks() {
      try {
        const res = await fetch(apiJsonDb)

        const data = await res.json()

        return data

      } catch (error) {
        // console.log(error)
      }

    },
    async fetchTask(id) {
      try {
        const res = await fetch(`${apiJsonDb}/${id}`)
        const data = await res.json()
        return data

      } catch (error) {
        // console.log(error)
      }      
      
    },
  },
  async created() {
    this.tasks = await this.fetchTasks()
  },
}


</script>