<template>
  <div>
    <section>
      <base-card>
        <h3>{{ fullName }}</h3>
        <h4>${{ rate }}/hour</h4>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach Out to me!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge v-for="area in areas" :type="area" :key="area"></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + " " + this.selectedCoach.lastName;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    description() {
      return this.selectedCoach.description;
    },
    contactLink() {
      return this.$route.path + "/contact";
    },
  },
  created() {
    this.selectedCoach = this.$store.getters["coach/coaches"].find(
      (coach) => coach.id === this.id
    );
  },
};
</script>
