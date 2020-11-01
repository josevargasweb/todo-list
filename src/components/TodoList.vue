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
     <todo-check-all ></todo-check-all>
      <todo-items-remaining></todo-items-remaining>
    </div>

    <div class="extra-container">
     <todo-filtered></todo-filtered>

      <div>
        <transition name="fade">
          <todo-clear-completed 
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
    };
  },
  computed: {
    //verifica que la funcion remaining sea distinto de 0
    anyRemaining() {
    return this.$store.getters.anyRemaining; 
    },
    // aplica filtros segun la etiqueta seleccionada
    todosFiltered() {
    return this.$store.getters.todosFiltered; 
    }
  },
  methods: {
    //agrega una tarea verifica que no este vacia luego de ingresasrla limpia los datos para nuevos ingresos
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }

      this.$store.dispatch('addTodo',{
        id: this.idForTodo,
        title: this.newTodo
      });

      // this.$store.state.todos.push({
      //   id: this.idForTodo,
      //   title: this.newTodo,
      //   completed: false
      // });
      this.newTodo = "";
      this.idForTodo++;
    },
  
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