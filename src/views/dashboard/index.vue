<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{$t('HomePage.HomePageName')}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data(){
    return{
      data:''
    }
  },
  methods:{
  },
  created() {
   
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
