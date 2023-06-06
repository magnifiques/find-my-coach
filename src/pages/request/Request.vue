<template>
  <div>
    <base-modal :show="!!error" title="ERROR!" @close="closeModal">
      <p>{{ error }}</p>
    </base-modal>
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>

        <base-loader v-if="isLoading"> </base-loader>
        <ul v-else-if="hasRequests && !isLoading">
          <request-items
            v-for="request in requests"
            :key="request.coachId"
            :email="request.email"
            :message="request.message"
          ></request-items>
        </ul>
        <!-- <h3 v-else>No Requests Received</h3> -->
      </base-card>
    </section>
  </div>
</template>

<script>
import RequestItems from "../../components/requests/RequestItems.vue";
export default {
  components: {
    RequestItems,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    requests() {
      return this.$store.getters["request/requests"];
    },
    hasRequests() {
      return !this.isLoading && this.$store.getters["request/hasRequests"];
    },
  },
  created() {
    this.loadRequests();
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("request/fetchRequest");
      } catch (error) {
        this.error = error.message || "Something went wrong";
      }
      this.isLoading = false;
    },
    closeModal() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
