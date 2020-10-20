<template>
  <div>{{ remaining }} elementos restantes</div>
</template>

<script>
export default {
    name:'todo-remaining',
    props:{
        remaining:{
            type:Number,
            required:true
        }
    }
}
</script>