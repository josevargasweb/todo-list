<template>
  <div>
    <button :class="{ active: filter == 'all' }" @click="changeFilter('all')">
      Todos
    </button>
    <button :class="{ active: filter == 'active' }" @click="changeFilter('active')">
      Activos
    </button>
    <button
      :class="{ active: filter == 'completed' }"
      @click="changeFilter('completed')"
    >
      Completados
    </button>
  </div>
</template>

<script>
export default {
  name: "todo-filtered",
 data(){
   return{
     'filter':'all'
   }
 },
  methods: {
    changeFilter(filter) {
      this.filter = filter
      eventBus.$emit("filterChanged", filter);
    }
  }
};
</script>
