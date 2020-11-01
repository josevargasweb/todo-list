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
 computed:{
   filter(){
     return this.$store.state.filter
   }
 },
  methods: {
    changeFilter(filter) {
       this.$store.dispatch('updateFilter', filter)
    }
  }
};
</script>