<template>
    <div class="footer">
        <div class="container">
            {{text}}
        </div>
    </div>  
</template>
<script>
    export default {
        props: {
          text: String
        }        
    }
</script>