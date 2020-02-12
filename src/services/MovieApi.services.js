import Axios from 'axios';
import qs from 'qs';
import async from 'async';

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

    this.client.interceptors.request.use(request => {
      const d = Date.now();
      console.log(d, request.method, request.url, request.params);
      return request;
    });
  }

  async get(url, options) {
    console.log('GET Options', options);
    const response = await this.client.get(url, options);
    console.log('GET Options', options);
    return response.data;
  }

  async getAllPages(url, options) {
    const result = await this.get(url, options);
    // eslint-disable-next-line camelcase
    const { total_pages, results } = result;

    // eslint-disable-next-line camelcase
    const resultPages = Array(total_pages - 1)
      .fill()
      .map((e, i) => i + 2);

    const promiseResults = await async.mapSeries(resultPages, async index => {
      const newOptions = { ...options };
      newOptions.params.page = index;
      const data = await this.get(url, newOptions);
      return data.results;
    });

    const allResults = promiseResults.map(promiseResult => {
      return promiseResult[0];
    });

    const final = [...results, ...allResults];
    return final;
  }
}

export default new MovieApiServices();
