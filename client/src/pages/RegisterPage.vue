<template>
  <section>
    <div class="form-box">
      <form @submit.prevent="onRegister">
        <h2 class="title">Register</h2>

        <!-- Username Input -->
        <div class="inputbox">
          <ion-icon name="person-outline"></ion-icon>
          <input id="username" v-model="$v.form.username.$model" type="text" :state="validateState('username')" required>
          <label>Username</label>
          <b-form-invalid-feedback :state="validateState('username')">
            <span v-if="!$v.form.username.required">Username is required.</span>
            <span v-if="!$v.form.username.minLength">Username must be at least 3 characters long.</span>
            <span v-if="!$v.form.username.maxLength">Username must be less than 8 characters.</span>
            <span v-if="!$v.form.username.alpha">Username must contain only letters.</span>
          </b-form-invalid-feedback>
        </div>

        <!-- First name Input -->
        <div class="inputbox">
          <input id="firstName" v-model="$v.form.firstName.$model" type="text" :state="validateState('firstName')" required>
          <label>First Name</label>
          <b-form-invalid-feedback :state="validateState('firstName')">
            <span v-if="!$v.form.firstName.required">FirstName is required.</span>
            <span v-if="!$v.form.firstName.minLength">FirstName must be at least 3 characters long.</span>
            <span v-if="!$v.form.firstName.maxLength">FirstName must be less than 8 characters.</span>
            <span v-if="!$v.form.firstName.alpha">FirstName must contain only letters.</span>
          </b-form-invalid-feedback>
        </div>

        <!-- Last name Input -->
        <div class="inputbox">
          <input id="lastName" v-model="$v.form.lastName.$model" type="text" :state="validateState('lastName')" required>
          <label>last Name</label>
          <b-form-invalid-feedback :state="validateState('lastName')">
            <span v-if="!$v.form.lastName.required">LastName is required.</span>
            <span v-if="!$v.form.lastName.minLength">LastName must be at least 3 characters long.</span>
            <span v-if="!$v.form.lastName.maxLength">LastName must be less than 8 characters.</span>
            <span v-if="!$v.form.lastName.alpha">LastName must contain only letters.</span>
          </b-form-invalid-feedback>
        </div>

        <!-- Country Input -->
        <div  class="inputbox">
          <label style="color: white;" v-if="!form.country" for="country">Country</label> 
          <div>
              <b-form-select id="country" v-model="$v.form.country.$model" :options="countries" :state="validateState('country')" required class="custom-select"></b-form-select>
              <b-form-invalid-feedback :state="validateState('country')">
                <span v-if="!$v.form.country.required">Country is required.</span>
              </b-form-invalid-feedback>
          </div>
        </div>

        <!-- Password Input -->
        <div class="inputbox">
          <ion-icon name="lock-closed-outline"></ion-icon>
          <input id="password" type="password" v-model="$v.form.password.$model" :state="validateState('password')" required>
          <label>Password</label>
          <b-form-invalid-feedback :state="validateState('password')">
            <span v-if="!$v.form.password.required">Password is required.</span>
            <span v-if="!$v.form.password.minLength">Password must be at least 5 characters long.</span>
            <span v-if="!$v.form.password.maxLength">Password must be less than 10 characters.</span>
          </b-form-invalid-feedback>
        </div>

        <!-- Confirm Password Input -->
        <div class="inputbox">
          <ion-icon name="lock-closed-outline"></ion-icon>
          <input id="confirmedPassword" @input="checkFields" type="password" v-model="$v.form.confirmedPassword.$model" :state="validateState('confirmedPassword')" required>
          <label>Confirm Password</label>
          <b-form-invalid-feedback :state="validateState('confirmedPassword')">
            <span v-if="!$v.form.confirmedPassword.required">Confirming the password is required.</span>
            <span v-if="!$v.form.confirmedPassword.sameAsPassword">Passwords must match.</span>
          </b-form-invalid-feedback>
        </div>

        <!-- Email Input -->
        <div class="inputbox">
          <ion-icon name="mail-outline"></ion-icon>
          <input id="email" v-model="$v.form.email.$model" type="email" :state="validateState('email')" required>
          <label>Email</label>
          <b-form-invalid-feedback :state="validateState('email')">
            <span v-if="!$v.form.email.required">Email is required.</span>
            <span v-if="!$v.form.email.email">Email must be valid.</span>
          </b-form-invalid-feedback>
        </div>
        
        <button type="submit" >Register</button>
        <div class="mt-2">
          Already have an account?
          <router-link to="login"> Log in here</router-link>
        </div>
      </form>
    </div>
  </section>
</template>


<script>
import countries from "../assets/countries";
import axios from 'axios';

import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";
import { mockRegister } from "../services/auth.js";
export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined
      },
      buttonStyle: {
        position: 'absolute',
        top: '100px', // Initial position
        left: '100px' // Initial position
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      firstName: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      lastName: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      country: {
        required
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p)
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      email: {
        required,
        email
      }
    }
  },
  computed: {
    allFieldsFilled() {
      return this.form.username && this.form.firstName && this.form.lastName && this.form.email && this.form.password && this.form.confirmedPassword;
    }
    },
  mounted() {
    // console.log("mounted");
    this.countries.push(...countries);
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    handleMouseOver() {
      if (!this.allFieldsFilled) {
        const newX = Math.random() * (300 - 50); // Container width - button width
        const newY = Math.random() * (200 - 20); // Container height - button height
        this.buttonStyle.top = `${newY}px`;
        this.buttonStyle.left = `${newX}px`;
      }
    },
    checkFields() {
      // Check if all fields are filled
      this.allFieldsFilled =  this.form.password;
      if (this.allFieldsFilled) {
        // Return button to its original position
        this.buttonStyle.top = '100px';
        this.buttonStyle.left = '100px';
      }
    },


    async Register() {
    try {
      const userDetails = {
        username: this.form.username,
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        country: this.form.country,
        password: this.form.password,
        email: this.form.email
      };

      const api = axios.create({
        baseURL: 'http://localhost:3000', // Ensure this is your backend base URL
        withCredentials: true, // Include this to enable sending cookies with requests
      });

      const response = await api.post('auth/Register', userDetails);
      this.$router.push("/login");
    } catch (err) {
      console.log(err.response);
      this.form.submitError = err.response.data.message;
    }
  },

    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};


</script>


<style lang="scss" scoped>

/* General Styles for the Section */
section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 110vh;
  width: 100%;
}

/* Container and Form Styling */
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

.custom-select-wrapper select option {
  color: black !important; /* Force the color to black */
}
/* Heading Style */
h2 {
  font-size: 2em;
  color: #fff;
  text-align: center;
}

/* Input Box Styling */
.inputbox {
  position: relative;
  margin: 10px 0 22px;
  width: 100%;
  border-bottom: 2px solid #fff;
}

/* Input Label Animation and Style */
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

input:focus ~ label,
input:valid ~ label {
  top: -5px; 
}

/* Input Field Styling */
.inputbox input, .inputbox select {
  width: 100%;
  height: 50px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1em;
  padding: 0 35px 0 5px;
  color: #0a0a0a ;
  font-weight: bold
}

.custom-select {
  color: black !important; /* Important to override any existing styles */
}


/* Icon Styling */
.inputbox ion-icon {
  position: absolute;
  right: 8px;
  color: #fff;
  font-size: 1.2em;
  top: 15px;
}

/* Button Styling */
button {
  width: 100%;
  height: 40px;
  border-radius: 20px;
  background-color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1em;
  font-weight: 600;
  margin-top: 20px;
}

/* Invalid Feedback Styling */
.b-form-invalid-feedback {
  color: red; /* Make error messages stand out */
  font-size: 0.8em;
  visibility: visible;
  display: block; /* Ensure it's always visible when errors are present */
}

/* Media Query for Responsive Adjustment */
@media screen and (max-width: 480px) {
  .form-box {
    width: 90%;
    border-radius: 0px;
  }
}


.custom-select-wrapper select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc; /* Gray border */
  border-radius: 4px; /* Rounded corners */
  background-color: white;
  appearance: none; /* Removes default system styling */
  -moz-appearance: none;
  -webkit-appearance: none;
  font-size: 16px; /* Text size */
  color: #444; /* Text color for the select element itself */
}

.custom-select-wrapper option {
  color: black; /* Ensures dropdown options are black */
}

.opt{
  color: black;
}
.button-reg {
  overflow: hidden; /* Prevents overflow of child elements */
  position: relative; /* Needed for absolute positioning of the ripple */
}

.button-reg::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(1);
  transition: opacity 0.6s, transform 0.6s;
}
.button-reg {
  background: linear-gradient(45deg, #6a11cb 0%, #030d1f 100%);
  background-size: 200% 200%; /* Larger background size for animation */
  color: white; /* White text color */
  transition: background-position 0.5s, color 0.5s, transform 0.2s; /* Smooth transitions */
}

.button-reg:hover {
  background-position: right center; /* Move background on hover */
  color: #fff; /* Change text color if needed */
}
.button-reg:focus {
  outline: none; /* Remove default focus outline */
  box-shadow: 0 0 0 3px rgba(255,255,255,0.5); /* Custom focus style with outer glow */
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

</style>

