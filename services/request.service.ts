import { Headers } from "@constants/headers";
import { HttpMethods } from "@constants/http-methods";
import { API_KEY } from "@constants/index";

export class RequestService {
  static async call({
    method = HttpMethods.GET,
    url = "/",
    data = {},
    params = {},
    additional = {},
  }: {
    method?: string;
    url?: string;
    data?: any;
    params?: any;
    additional?: any;
  }) {
    const object: any = {
      method,
      headers: additional?.headers || {},
    };

    object.headers.Authorization = `Bearer ${API_KEY}`;

    let fullUrl = url;

    if (method === HttpMethods.GET && params) {
      const queryParams = new URLSearchParams();

      Object.keys(params).forEach((key) => {
        const value = params[key];
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
      if (queryParams.toString()) {
        fullUrl += `?${queryParams.toString()}`;
      }
    } else {
      if (data) {
        if (data instanceof FormData) {
          additional = undefined;
          object.body = data;
        } else {
          object.headers["Content-Type"] =
            Headers.DEFAULT_HEADER["Content-Type"];
          object.body = JSON.stringify(data);
        }
      }
    }

    try {
      const requestOptions = Object.assign({}, object, additional);

      const res = await fetch(fullUrl, requestOptions);

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const resData = await res.json();

      if (resData?.detail && resData?.detail.length) {
        return {
          status: "FAILED",
          error: {
            loc: resData.detail.loc,
            type: resData.detail.type,
            message: resData.detail.msg,
          },
        };
      }

      return { status: "OK", data: resData };
    } catch (error: any) {
      return error?.response?.data;
    }
  }

  static get(url: string, data = {}, params = {}, additional = {}) {
    return RequestService.call({
      method: HttpMethods.GET,
      url,
      data,
      params,
      additional,
    });
  }

  static post(url: string, data = {}, params = {}, additional = {}) {
    return RequestService.call({
      method: HttpMethods.POST,
      url,
      data,
      params,
      additional,
    });
  }
}
