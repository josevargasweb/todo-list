import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
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
  },
  getters: {
    // muetra la cantidad de tareas no seleccionadas o restantes
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length;
    },
    //verifica que la funcion remaining sea distinto de 0
    anyRemaining(state, getters) {
      return getters.remaining != 0;
    },
    // aplica filtros segun la etiqueta seleccionada
    todosFiltered(state) {
      if (state.filter == "all") {
        //cuando se selecciona todos
        return state.todos;
      } else if (state.filter == "active") {
        //cuando se selecciona activo muestra solo las tareas activas
        return state.todos.filter(todo => !todo.completed);
      } else if (state.filter == "completed") {
        // cuando se selecciona completado se selecciona solo las tareas completadas
        return state.todos.filter(todo => todo.completed);
      }

      return state.todos;
    },
    showClearCompletedButton(state) {
      //mostrara el boton si esque la cantidad de tareas completadas es mayor a 0
      return state.todos.filter(todo => todo.completed).length > 0;
    }
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        editing: false
      });
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id == todo.id);
      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: todo.editing
      });
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id == id)
      state.todos.splice(index, 1)
    },
    checkAll(state, checked) {
      state.todos.forEach(todo => (todo.completed = checked));
    },
    updateFilter(state, filter) {
      state.filter = filter
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed);
    }
  },
  actions: {
    addTodo(context, todo) {
      setTimeout(()=>{
        context.commit('addTodo', todo);
      },1000)
    },
    updateTodo(context, todo) {
      setTimeout(()=>{
        context.commit('updateTodo', todo);
      },1000)
    },
    deleteTodo(context, id) {
      setTimeout(()=>{
        context.commit('deleteTodo', id);
      },1000)
    },
    checkAll(context, checked) {
      setTimeout(()=>{
        context.commit('checkAll', checked);
      },1000)
    },
    updateFilter(context, filter) {
      setTimeout(()=>{
        context.commit('updateFilter', filter);
      },1000)
    },
    clearCompleted(context) {
      setTimeout(()=>{
        context.commit('clearCompleted');
      },1000)
    }
  }
})
