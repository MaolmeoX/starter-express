import Axios from 'axios';
import qs from 'qs';

class MovieApiServices {
  constructor() {
    this.client = Axios.create({
      baseURL: 'https://api.themoviedb.org/3/',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      paramsSerializer(params) {
        return qs.stringify(params, { encode: false });
      },
    });

    this.client.interceptors.request.use(config => {
      const newParams = {
        ...config.params,
        api_key: process.env.API_KEY,
        language: 'fr-FR',
      };
      // eslint-disable-next-line no-param-reassign
      config.params = newParams;
      return config;
    });
  }

  async get(url, options) {
    const response = await this.client.get(url, options);
    return response.data;
  }
}

export default new MovieApiServices();
