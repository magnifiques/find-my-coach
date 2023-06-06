export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;

    const coachData = {
      firstName: data.first,
      lastName: data.last,
      areas: data.areas,
      description: data.desc,
      hourlyRate: data.rate,
    };

    const token = context.rootGetters.token;
    const response = await fetch(
      `https://vue-coach-app-52c7f-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
      {
        method: "PUT",
        body: JSON.stringify(coachData),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || "An Error has ocurred!");
      throw error;
    }
    context.commit("registerCoach", {
      ...coachData,
      id: userId,
    });
  },

  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const response = await fetch(
      "https://vue-coach-app-52c7f-default-rtdb.firebaseio.com/coaches.json"
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "An Error has ocurred!");
      throw error;
    }

    const coaches = [];
    for (let key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        areas: responseData[key].areas,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
      };

      coaches.push(coach);
    }

    context.commit("loadCoaches", coaches);
    context.commit("setFetchTimeStamp");
  },
};
