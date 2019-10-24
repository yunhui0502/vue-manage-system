
<template>

<!-- 表格 -->


</template>

<script>
  import axios from 'axios';
  import api from '@/apis/user-api.js';

 export default {
     data() {
       return {
        formInline: {
               user: '',
               region: ''
               }


       }
     },
     methods: {
        onSubmit() {
        console.log('submit!');
      }
     }
   }
</script>










<style>
</style>
