import http from "./http";

export const studentService = {
  async getStudents() {
    const { data } = await http.get("/students");
    return data.data;
  },
  async createStudent(payload) {
    const { data } = await http.post("/students", payload);
    return data.data;
  },
  async updateStudent(id, payload) {
    const { data } = await http.put(`/students/${id}`, payload);
    return data.data;
  },
  async deleteStudent(id) {
    await http.delete(`/students/${id}`);
  },
};
