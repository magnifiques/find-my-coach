let timer;

export default {
  async login(context, payload) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
        import.meta.env.VITE_FIREBASE_API_KEY
      }`,
      {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(response.message || "Something went Wrong");
    }

    const expiresIn = +responseData.expiresIn * 1000;

    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("tokenExpiration", expirationDate);

    timer = setTimeout(() => {
      context.dispatch("autoLogOut");
    }, expiresIn);

    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },
  isLogged(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expirationDate = localStorage.getItem("tokenExpiration");

    const expiresIn = +expirationDate - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch("autoLogOut");
    }, expiresIn);

    if (token && userId) {
      context.commit("setUser", {
        token,
        userId,
      });
    }
  },
  async signup(context, payload) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
        import.meta.env.VITE_FIREBASE_API_KEY
      }`,
      {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(response.message || "Something went Wrong");
    }

    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("tokenExpiration", expirationDate);

    timer = setTimeout(() => {
      context.dispatch("autoLogOut");
    }, expiresIn);

    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },
  logOut(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");

    clearTimeout(timer);

    context.commit("setUser", {
      token: null,
      userId: null,
      loggedOut: true,
    });
  },
  autoLogOut(context) {
    context.dispatch("logOut");
    context.commit("setIsLogged");
  },
};
