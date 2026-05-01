import http from "./http";

export const enrollmentService = {
  async getEnrollments() {
    const { data } = await http.get("/enrollments");
    return data.data;
  },
  async getMyEnrollments() {
    const { data } = await http.get("/enrollments/me");
    return data.data;
  },
  async createEnrollment(payload) {
    const { data } = await http.post("/enrollments", payload);
    return data.data;
  },
  async deleteEnrollment(id) {
    await http.delete(`/enrollments/${id}`);
  },
};
