<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="Que hay que hacer"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <transition-group
      name="fade"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >  animacion para cuando se agrega o elimina una tarea 

      <todo-item
        v-for="(todo, index) in todosFiltered"
        :key="todo.id"
        :todo="todo"
        :index="index"
        :checkAll="!anyRemaining"
         
      >
       <!-- desde el hijo recibe la funcion removedTodo -->

      </todo-item>

    </transition-group>

    <div class="extra-container">
     <todo-check-all :anyRemaining="anyRemaining"  ></todo-check-all>
      <todo-items-remaining :remaining="remaining"></todo-items-remaining>
    </div>

    <div class="extra-container">
     <todo-filtered></todo-filtered>

      <div>
        <transition name="fade">
          <todo-clear-completed 
          :showClearCompletedButton="showClearCompletedButton"
          ></todo-clear-completed>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem'
import TodoItemsRemaining from './TodoItemsRemaining'
import TodoCheckAll from './TodoCheckAll'
import TodoFiltered from './TodoFiltered'
import TodoClearCompleted from './TodoClearCompleted'

export default {
  name: "todo-list",
  components:{
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFiltered,
    TodoClearCompleted,
  },
  data() {
    return {
      newTodo: "", // el dato que tendra title  
      idForTodo: 3, //id en que comienza a contar para ingresar nuevos datos
      beforeEditCache: "", // es el dato que se guarda previamente en el caso de que el usuario guarde un dato que no cumpla con lo deseado
      filter: "all", // filtro marcado
      todos: [
        //datos del array por default
        {
          id: 1,
          title: "Terminar de la pantalla vue",
          completed: false, //estado enque se encuentra la tarea
          editing: false // estado en que se encuetra el modo
        },
        {
          id: 2,
          title: "Toma el control del mundo",
          completed: false,
          editing: false
        }
      ]
    };
  },
  created(){
    eventBus.$on('removedTodo',(index) => this.removeTodo(index))
    eventBus.$on('finishedEdit',(data) => this.finishedEdit(data))
    eventBus.$on('checkAllChanged',(checked) => this.checkAllTodos(checked))
    eventBus.$on('filterChanged',(filter) => this.filter = filter)
    eventBus.$on('clearCompletedTodos',() => this.clearCompleted())
  },
  beforeDestroy(){
   eventBus.$off('removedTodo',(index) => this.removeTodo(index))
    eventBus.$off('finishedEdit',(data) => this.finishedEdit(data))
    eventBus.$off('checkAllChanged',(checked) => this.checkAllTodos(checked))
    eventBus.$off('filterChanged',(filter) => this.filter = filter)
    eventBus.$off('clearCompletedTodos',() => this.clearCompleted())
  },
  computed: {
    // muetra la cantidad de tareas no seleccionadas o restantes
    remaining() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    //verifica que la funcion remaining sea distinto de 0
    anyRemaining() {
      return this.remaining != 0;
    },
    // aplica filtros segun la etiqueta seleccionada
    todosFiltered() {
      if (this.filter == "all") {
        //cuando se selecciona todos
        return this.todos;
      } else if (this.filter == "active") {
        //cuando se selecciona activo muestra solo las tareas activas
        return this.todos.filter(todo => !todo.completed);
      } else if (this.filter == "completed") {
        // cuando se selecciona completado se selecciona solo las tareas completadas
        return this.todos.filter(todo => todo.completed);
      }

      return this.todos;
    },
    showClearCompletedButton() {
      //mostrara el boton si esque la cantidad de tareas completadas es mayor a 0
      return this.todos.filter(todo => todo.completed).length > 0;
    }
  },

  methods: {
    //agrega una tarea verifica que no este vacia luego de ingresasrla limpia los datos para nuevos ingresos
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }

      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false
      });

      this.newTodo = "";
      this.idForTodo++;
    },
    // quita un elemento del array todos (tareas)
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    // muestra todos las tareas
    checkAllTodos() {
      this.todos.forEach(todo => (todo.completed = event.target.checked));
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    },
    finishedEdit(data){
        this.todos.splice(data.index, 1, data.todo)
    }
  }
};
</script>

<!-- Css del componente TodoList desarrollado en scss -->
<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");


.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
  &:focus {
    outline: 0;
  }
}

.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
    animation-duration: 0.3s;
}

.remove-item {
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    color: black;
  }
}

.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
}

.todo-item-left {
  // later
  display: flex;
  align-items: center;
}
.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}
.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc; //override defaults
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  &:focus {
    outline: none;
  }
}

.completed {
  text-decoration: line-through;
  color: grey;
}

.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgray;
  padding-top: 14px;
  margin-top: 14px;
}

button {
  font-size: 14px;
  background-color: white;
  appearance: none;

  &:hover {
    background: lightgreen;
  }

  &:focus {
    outline: none;
  }
}

.active {
  background: lightgreen;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
