import http from "./http";

export const courseService = {
  async getCourses() {
    const { data } = await http.get("/courses");
    return data.data;
  },
  async createCourse(payload) {
    const { data } = await http.post("/courses", payload);
    return data.data;
  },
  async updateCourse(id, payload) {
    const { data } = await http.put(`/courses/${id}`, payload);
    return data.data;
  },
  async deleteCourse(id) {
    await http.delete(`/courses/${id}`);
  },
};
