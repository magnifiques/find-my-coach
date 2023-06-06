<template>
  <base-card>
    <coach-form @register-coach="registerCoach"></coach-form>
  </base-card>
</template>

<script>
import CoachForm from "../../components/coaches/CoachForm.vue";

export default {
  components: {
    CoachForm,
  },
  methods: {
    registerCoach(data) {
      console.log(data);
      this.$store.dispatch("coach/registerCoach", data);
      this.$router.replace("/coaches");
    },
  },
};
</script>
