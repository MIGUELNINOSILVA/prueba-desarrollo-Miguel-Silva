<template>
  <div class="my-component">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  name: "My component",
  data() {
    return {
      message: "Hola"
      }
    }
}
</script>