<template>
  <div>
    <base-modal :show="!!error" title="Error!" @close="closeModal">
      <p>{{ error }}</p>
    </base-modal>
    <base-modal :show="isLoading" title="Authenticating" fixed>
      <base-loader></base-loader>
    </base-modal>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input id="email" type="email" v-model.trim="email" />
        </div>

        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>

        <p v-if="!formIsValid">
          Please enter the valid values in the specified fields (password must
          be greater than 6 character long)
        </p>
        <base-button>{{ changeAuthCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuth">{{
          switchAuthCaption
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    changeAuthCaption() {
      if (this.mode === "login") {
        return "Login";
      } else return "Signup";
    },
    switchAuthCaption() {
      if (this.mode === "login") return "Signup Instead";
      else return "Login Instead";
    },
  },
  methods: {
    async submitForm() {
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password === "" ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      try {
        if (this.mode === "signup") {
          await this.$store.dispatch("signup", {
            email: this.email,
            password: this.password,
          });
        } else {
          await this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          });
        }
        const redirect = this.$route.query.redirect || "coaches";
        this.$router.replace(`/${redirect}`);
      } catch (error) {
        this.error = error.message || "Something went wrong";
      }
      this.isLoading = false;
    },
    switchAuth() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    closeModal() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
