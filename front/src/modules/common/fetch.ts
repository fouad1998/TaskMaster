import { getToken } from "../auth/common/token";

const domain = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");

type Options = Omit<RequestInit, "body"> & {
  body?: Record<string, unknown>;
};
export async function fetchWrap(endpoint: string, options: Options = {}) {
  const { body, ...customConfig } = options;

  // Set the default content type to JSON.
  const headers: HeadersInit = {
    "content-type": "application/json",
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  const config: RequestInit = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await window.fetch(`${domain}/${endpoint}`, config);
  return handleResponse(response);
}

function parse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function handleResponse(response: Response) {
  return response.text().then((text: string) => {
    const data = text && parse(text);
    if (!response.ok) {
      const error = data || response.statusText;

      return Promise.reject(error);
    }

    return data;
  });
}
