
import requests from "./httpService";

const filterCourse = {
  getCourse(body) {
    return requests.get(`/courses`, body)
  },
  getFilterCourse(body, params, value) {
    return requests.get(`/courses?${params}=${value}`, body)
  },
  getCategory(body) {
    return requests.get(`/category`, body)
  },
  getCourseWithPaginate(body, page, limit) {
    return requests.get(`/courses?_page=${page}&_limit=${limit}`, body)
  },
  getMyCourse(body, userId) {
    return requests.get(`/userCourse?userId=${userId}`, body)
  },
  getMyClass(body) {
    return requests.get(`/myClass`, body)
  }
}

export default filterCourse;