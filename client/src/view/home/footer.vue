<template>
    <div class="footer">
        <div class="container" v-html="text">
        </div>
    </div>  
</template>
<script>
export default {
  props: {
    text: String
  }
};
</script>