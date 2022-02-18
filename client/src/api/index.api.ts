import axios, { AxiosResponse } from "axios";

class API {
  url: string;

  constructor() {
    this.url = process.env.SERVER_URL || "/api/auth";
  }

  async post(route: string, body: any) {
    try {
      const res: AxiosResponse = await axios.post(this.url + route, body, {
        withCredentials: true,
      });
      return res;
    } catch (e: any) {
      if (e.response) {
        return e.response;
      }
    }
  }
  async get(route: string, config: object) {
    try {
      const res: AxiosResponse = await axios.get(this.url + route, {
        ...config,
        withCredentials: true,
      });
      return res;
    } catch (e: any) {
      if (e.response) {
        return e.response;
      }
    }
  }
}

export default new API();
