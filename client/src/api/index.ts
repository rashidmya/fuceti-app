class API {
  url: string;

  constructor() {
    this.url = process.env.CLIENT_URL || "http://localhost:3000";
  }

  async post(route: string, data: any) {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    
    const res = await fetch(this.url + route, options);
    const json = await res.json();
    return json
  }
}

export default new API