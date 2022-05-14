import jsCookie from "js-cookie";

export const loginStatus = {
  setLogin: (data) => {
    jsCookie.set("email", data);
  },

  setAuth: () => {
    if (jsCookie.get("email")) {
      return true;
    } else {
      return false;
    }
  },

  setLogout: (navigate) => {
    jsCookie.remove("email");
    navigate("/");
  },
};
