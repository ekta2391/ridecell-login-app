<template>
  <div class="app" id="loginPage">
    <div class="welcome-msg">
        <h1>Welcome!</h1>
        <h1>Please login to continue.</h1>
      </div>
    <div class="login-section">
      <div class="login-box">
        <input placeholder="Email *" v-model="emailEntered"/>
        <input placeholder="Password *" v-model="passwordEntered" :type="passwordType"/>
        <span class="forgot-password" role="button" @click="authenticateUser">Forgot Password?</span><br/>
        <div class="login-btn" @click="loginCheck"><span role="button" >LOGIN</span></div>
        <div class="sign-up-btn" ><router-link :to="{name: 'Sign Up'}">SIGN UP</router-link></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import userStore from '../store/userStore'

export default {
  name: 'Login',
  data () {
    return {
      hidePassword: true,
      emailEntered: '',
      passwordEntered: '',
      userAuthenticated: false,
      userStore: userStore.get()
    }
  },
  computed: {
    passwordType () {
      return this.hidePassword ? 'password' : 'text'
    }
  },
  methods: {
    authenticateUser () {
      const headers = {
          'Content-Type':'application/json'
      }
      if (this.emailEntered != '' && this.emailEntered.includes('@') && this.emailEntered.includes('.')) {
        let requestData = {
          "email": this.emailEntered
        }
        axios.post('https://evening-plateau-93775.herokuapp.com/api/v2/people/reset_password', requestData, {headers: headers})
          .then(response => {
            alert(response.data.message)
          })
          .catch(error => {
            alert('There was an error resetting your password')
          })
      } else {
        alert('Please enter a valid email address!')
      }
    },
    loginCheck (e) {
      if (this.emailEntered && this.emailEntered.includes('@') && this.emailEntered.includes('.') && this.passwordEntered) {

        const headers = {
          'Content-Type':'application/json'
        }
        const requestData = {
          "email": this.emailEntered,
          "password": this.passwordEntered
        }
        axios.post('https://evening-plateau-93775.herokuapp.com/api/v2/people/authenticate', requestData, {headers: headers})
        .then(response => {
          console.log(response)
          Object.keys(response.data).forEach(key => this.userStore.user[key] = response.data[key])
          if(response.data.person.role.key === 'user') {
            this.$router.replace('/user')
          }
          this.emailEntered = ''
          this.passwordEntered = ''
        })
      } else {
        alert('Please enter a valid email address and a password!')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

#loginPage {
    display: flex;
    flex-direction: column;
    background-color: #12749b;
}

.login-section {
  width: 30%;
  margin: 40px 0;
  align-self: center;
  min-width: 500px;
  min-height: 400px;
}

.welcome-msg {
  color: white;
  margin: 40px 0; 
}

.login-box {
  background-color: #d6dadb;
  padding: 4%;
  text-align: left;
  border-radius: 20px;
  height: 100%;

  input {
    width: 90%;
    margin: 20px;
    height: 60px;
    border: gray 1px solid;
    border-radius: 10px;
    font-size: 20px;
    padding: 10px;
  }

  ::placeholder {
    font-size: 20px;
    padding: 10px;
  }

}

.forgot-password {
  margin-left: 18px;
  cursor: pointer;
}

.login-btn {
  display: inline-block;
  width: 40%;
  height: 30px;
  background-color: green;
  text-align: center;
  margin: 10px;
  padding: 15px 5px;
  text-decoration: none;
  color: white;
  cursor: pointer;
}
.sign-up-btn {
  color: white;
  display: inline-block;
  margin: 10px;
  width: 40%;
  height: 30px;
  text-align: center;
  padding: 15px 5px;
  background-color: #62abc1;
  a {
    text-decoration: none;
    color: white;
  }
}
</style>
