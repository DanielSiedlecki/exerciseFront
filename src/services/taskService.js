import { http } from "./http-common";

class taskService {
  get(data) {
    return http.get(`api/task`, { params: data });
  }

  post(data) {
    return http.post("api/task", data);
  }
}
export { taskService };
