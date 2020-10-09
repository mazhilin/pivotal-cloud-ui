<template>
  <div class="dashboard-container">
    <component :is="currentRole"/>
  </div>
</template>

<script>
  // import {mapGetters} from 'vuex'
  // import adminDashboard from './admin'
  // import editorDashboard from './editor'
  import dashboardHome from './home'

  export default {
    name: 'Dashboard',
    components: {dashboardHome},
    data() {
      return {
        currentRole: 'dashboardHome'
      }
    },
    computed: {
      // ...mapGetters([
      //   'roles'
      // ])
    },
    created() {
      // if (!this.roles.includes('admin')) {
      //   this.currentRole = 'editorDashboard'
      // }
    }
  }
</script>
