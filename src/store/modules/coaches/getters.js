export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoach(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some((coach) => coach.id === userId);
  },
  shouldUpdate(state) {
    if (!state.lastFetch) {
      return true;
    }

    const currentTime = new Date().getTime();
    return (currentTime - state.lastFetch) / 1000 > 60;
  },
};
