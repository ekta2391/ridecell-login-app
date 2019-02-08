<template>
  <div class="app" id="userPage">
      <h1>User Home Page</h1>
      <div>
          <div>
            <h1><button @click="toggleInfo">{{initials}}</button></h1>
          </div>
          <transition name="slide-fade">
            <div v-show="showInfo" class="user-info">
                <h1>Display Name: {{userStore.user.person.display_name}}</h1>
            </div>
          </transition>
      </div>
  </div>
</template>

<script>
import userStore from '../store/userStore'

export default {
  name: 'UserPage',
  data () {
    return {
        userStore: userStore.get(),
        showInfo: false
    }
  },
  computed: {
      initials () {
          const regex = /[A-Z]/g
          let ini = this.userStore.user.person.display_name.match(regex)
          return ini.join('')
      }
  },
  methods: {
      toggleInfo () {
          this.showInfo = !this.showInfo
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  color: white
}
#userPage {
    background-color: green;
}
button {
    width: 200px;
    height: 200px;
    border-radius: 100px;
    cursor: pointer;
}

.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.8s ease;
}

.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(90%);
  opacity: 0;
}


</style>