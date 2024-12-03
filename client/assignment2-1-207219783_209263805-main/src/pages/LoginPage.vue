<template>
    <section>
      <div class="form-box">
        <div class="form-value">
        <form @submit.prevent="onLogin">
          <h2 class="title">Login</h2>

          <div class="inputbox">
            <ion-icon name="person-outline"></ion-icon>
              <input id="Username" v-model="$v.form.username.$model" type="text" :state="validateState('username')" required >
              <label>Username</label>
          </div>

          <div class="inputbox">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input id="Password" v-model="$v.form.password.$model" type="password" :state="validateState('password')" required>
            <label>Password</label>
          </div>

          <button type="submit" >Login</button>
          <div class="mt-2">
            Do not have an account yet?
            <router-link to="register"> Register in here</router-link>
          </div>
        </form>

      </div>
    </div>
  </section>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import {mockLogin} from "../services/auth.js"
import axios from 'axios';

export default {
  
  name: "Login",
  
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },

    async Login() {


      try {
        const response = await axios.post("http://localhost:3000/auth/Login", {
          username: this.form.username,
          password: this.form.password,
        }, { withCredentials: true });

        if (response.data.success) {
          this.$root.store.login(this.form.username);
          this.$toast.success("Login succeeded", {
            timeout: 4000,
          });

          this.$router.push("/");
        }
      } catch (err) {
        console.log(err.message);
        if (err.response && err.response.data && err.response.data.message) {
          this.form.submitError = err.response.data.message;
          this.$toast.error(err.response.data.message, {
            timeout: 4000,
          });

        } else {
          this.form.submitError = "An error occurred during login.";
          this.$toast.error("An error occurred during login.", {
            timeout: 4000,
          });
        }   
         }
    },

    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      this.Login();
    },
    async onLogout() {
      try {
        const response = await axios.post("http://localhost:3000/Logout");

        if (response.data.success) {
          this.$root.store.logout();
          this.$router.push("/login");
        } else {
          console.error("Logout failed: ", response.data.message);
        }
      } catch (err) {
        console.error("An error occurred during logout: ", err);
      }
    },
  }
};
</script>

<style lang="scss" scoped>

* {
  color: black;
  margin: 0;
  padding: 0;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.title {
  // color: black;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
 
}

.form-box {
  position: relative;
  width: 400px;
  height: auto; /* Adjust height based on content */
  background: rgba(255, 255, 255, 0.1); /* Slight transparency */
  border: none;
  border-radius: 20px;
  backdrop-filter: blur(15px) brightness(80%);
  padding: 20px;
  box-sizing: border-box; /* Include padding in width */
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
    font-size: 2.2em;
    color: #fff;
    text-align: center;
}

.mt-2 {
  font-size: 1em;
}

.inputbox {
    position: relative;
    margin: 30px 0;
    width: 310px;
    border-bottom: 2px solid #fff;
}

.inputbox label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    color: #fff;
    font-size: 1em;
    pointer-events: none;
    transition: 0.5s;
}

/* animations: start */
input:focus~label,
input:valid~label {
    top: -5px;
}

/* animation:end */
.inputbox input {
    width: 100%;
    height: 50px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    padding: 0 35px 0 5px;
    color: #0a0a0a ;
    font-weight: bold;
}

.inputbox ion-icon {
    position: absolute;
    right: 8px;
    color: #fff;
    font-size: 1.2em;
    top: 20px;
}

button {
    width: 100%;
    height: 40px;
    border-radius: 40px;
    background-color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 1em;
    font-weight: 600;
}

a {
    color: #0223f5;
    font-weight: bold;
    text-decoration: none;
    background-color: transparent;
}

a:hover {
  text-decoration: underline; /* Underline on hover */
  transform: translateY(-2px); /* Slight lift effect */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

a:focus {
  outline: none; /* Removes default focus outline */
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.5);
}


@media screen and (max-width: 480px) {
    .form-box {
        width: 100%;
        border-radius: 0px;
    }
}


</style>
