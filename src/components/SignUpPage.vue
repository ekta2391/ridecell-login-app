<template>
  <div class="app" id="signupPage">
    <div class="welcome-msg">
        <h1>Please tell us a little about you!</h1>
        <div class="errors">
            <p>Password Requirements:</p>
            <ul>
                <li>*Must be atleast 8 characters long</li>
                <li >*Must contain atleast 1 uppercase letter</li>
                <li>*Must contain atleast 1 lowercase letter</li>
                <li>*Must contain atleast 1 number</li>
                <li>*Must contain atleast 1 special character</li>
            </ul>
        </div>
      </div>
    <div class="signup-section">
      <div class="signup-box">
        <input placeholder="Display Name" v-model="displayName"/>
        <input placeholder="Email *" v-model="emailEntered"/>
        <input placeholder="Password *" v-model="passwordEntered" :type="passwordType"/>
        <input placeholder="Password Again *" v-model="passwordAgain" :type="passwordType"/>
        <div class="sign-up-btn" @click="createUser">SIGN UP</div>
        <div class="login-btn"><router-link :to="{name: 'Login'}"><span role="button" >LOGIN</span></router-link></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import userStore from '../store/userStore'

export default {
  name: 'SignUpPage',
  data () {
    return {
      hidePassword: true,
      displayName: '',
      emailEntered: '',
      passwordEntered: '',
      passwordAgain: '',
      userAuthenticated: false,
      userStore: userStore.get(),
      passwordReqs: {}
    }
  },
  created () {
      axios.get('https://evening-plateau-93775.herokuapp.com/api/v2/people/password_requirements')
        .then(response => {
            console.log(response)
            Object.keys(response.data).forEach(key => this.passwordReqs[key] = response.data[key])
        })
  },
  computed: {
    passwordType () {
      return this.hidePassword ? 'password' : 'text'
    },
    passwordsMatch () {
        return this.passwordEntered === this.passwordAgain
    }
  },
  methods: {
    authenticateUser () {
      if (this.emailEntered != '' && this.emailEntered.includes('@') && this.emailEntered.includes('.')) {
        alert('go ahead')
      } else {
        alert('Please enter a valid email address!')
      }
    },
    createUser () {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

        let matchFound = this.passwordEntered.match(regex)
        
        if(!matchFound) {
            alert('Password does not match criteria')
        }  else if (this.emailEntered && this.emailEntered.includes('@') && this.emailEntered.includes('.') && this.passwordsMatch && matchFound) {
          let requestData = {
              "display_name": this.displayName,
              "email": this.emailEntered,
              "password": this.passwordEntered
          }
            axios.post('https://evening-plateau-93775.herokuapp.com/api/v2/people/create', requestData)
                .then(response => {
                    alert(`Yay! User created successfully! Welcome to the app ${response.data.person.display_name}!`)
                    this.displayName = ''
                    this.emailEntered = ''
                    this.passwordEntered = ''
                    this.passwordAgain = ''
                })
      } else {
        alert('Please enter a valid email address and a password!')
      }
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

#signupPage {
    display: flex;
    flex-direction: column;
    background-color: #17a881;
}

.signup-section {
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

.signup-box {
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
  cursor: pointer;
  a {
    text-decoration: none;
    color: white;
  }
}

.errors {
    font-size: 10px;
    text-align: center;
    li {
        list-style: none;
    }
}
</style>
