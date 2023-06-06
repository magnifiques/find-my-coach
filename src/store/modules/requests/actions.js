export default {
  async registerRequest(context, payload) {
    const coachId = payload.coachId;

    const data = {
      email: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      `https://vue-coach-app-52c7f-default-rtdb.firebaseio.com/requests/${coachId}.json`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Failed to fetch data");
    }

    data.id = responseData.name;
    data.coachId = coachId;

    context.commit("registerRequest", data);
  },
  async fetchRequest(context) {
    const coachId = context.rootGetters.userId;

    const token = context.rootGetters.token;
    const response = await fetch(
      `https://vue-coach-app-52c7f-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`
    );

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Failed to fetch data");
    }

    const requests = [];

    for (let key in responseData) {
      const request = {
        id: key,
        coachId,
        email: responseData[key].email,
        message: responseData[key].message,
      };
      requests.push(request);
    }
    console.log(requests);

    context.commit("getRequests", requests);
  },
};
