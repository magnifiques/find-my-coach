<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ errors: !email.isValid }">
      <label for="email">Your Email</label>
      <input type="email" id="email" v-model="email.val" />
    </div>

    <div class="form-control" :class="{ errors: !email.isValid }">
      <label for="message">Your Message</label>
      <textarea rows="5" id="message" v-model="message.val"></textarea>
    </div>

    <p class="errors" v-if="!formIsValid">
      Make sure your email or message are typed correctly
    </p>

    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: {
        val: "",
        isValid: true,
      },
      message: {
        val: "",
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    submitForm() {
      this.formIsValid = true;

      if (this.email.val === "" || !this.email.val.includes("@")) {
        this.email.isValid = false;
        this.formIsValid = false;
        return;
      }
      if (this.message.val === "") {
        this.message.isValid = false;
        this.formIsValid = false;
        return;
      }

      const data = {
        coachId: this.$route.params.id,
        email: this.email.val,
        message: this.message.val,
      };

      this.$store.dispatch("request/registerRequest", data);
      this.$router.replace("/coaches");
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
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

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
