import http from "./http";

export const authService = {
  async login(payload) {
    const { data } = await http.post("/auth/login", payload);
    return { token: data.token, user: data.user };
  },
  async register(payload) {
    const { data } = await http.post("/auth/register", payload);
    return { token: data.token, user: data.user };
  },
};
