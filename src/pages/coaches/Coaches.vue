<template>
  <div>
    <base-modal :show="!!error" title="ERROR!" @close="closeModal">
      <p>{{ error }}</p>
    </base-modal>
    <section>
      <coach-filter @change-filter="setFilter"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >REFRESH</base-button
          >
          <base-button link to="/auth?redirect=register" v-if="!isAuthenticated"
            >Login to Register as a coach</base-button
          >
          <base-button
            link
            to="/register"
            v-if="isAuthenticated && !isCoach && !isLoading"
            >Register as a coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-loader></base-loader>
        </div>
        <ul v-else-if="hasCoach">
          <coach-items
            v-for="coach in coaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></coach-items>
        </ul>
        <h3 v-else>No Coaches Found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItems from "../../components/coaches/CoachItems.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";

export default {
  data() {
    return {
      activeFilter: {
        frontend: true,
        backend: true,
        career: true,
      },
      isLoading: false,
      error: null,
    };
  },
  components: {
    CoachItems,
    CoachFilter,
  },
  computed: {
    coaches() {
      const coaches = this.$store.getters["coach/coaches"];
      return coaches.filter((coach) => {
        if (this.activeFilter.frontend && coach.areas.includes("frontend")) {
          return true;
        }

        if (this.activeFilter.backend && coach.areas.includes("backend")) {
          return true;
        }

        if (this.activeFilter.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
    hasCoach() {
      return !this.isLoading && this.$store.getters["coach/hasCoach"];
    },
    isCoach() {
      return this.$store.getters["coach/isCoach"];
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    setFilter(updatedFilter) {
      this.activeFilter = updatedFilter;
    },

    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coach/loadCoaches", {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || "Something Went Wrong";
      }
      this.isLoading = false;
    },
    closeModal() {
      this.error = null;
    },
  },
  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
