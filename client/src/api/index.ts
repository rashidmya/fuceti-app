import axios, { AxiosResponse } from "axios";

class API {
  url: string;

  constructor() {
    this.url = process.env.CLIENT_URL || "/api/auth";
  }

  async post(route: string, body: any) {
    const res: AxiosResponse = await axios.post(this.url + route, body, {
      withCredentials: true,
    });
    const { data } = res;
    return data;
  }
}

export default new API();
