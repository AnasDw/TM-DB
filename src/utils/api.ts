import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
export const MEETING_SERVICE_ENDPOINT =
  process.env.NEXT_PUBLIC_MEETING_SERVICE_BASE_URL;

const MEET_ANSWER_REQUEST_TIMEOUT_SECONDS =
  Number(process.env.NEXT_PUBLIC_MEET_ANSWER_REQUEST_TIMEOUT_SECONDS) || 12;
export const MEET_ANSWER_REQUEST_TIMEOUT_MS =
  MEET_ANSWER_REQUEST_TIMEOUT_SECONDS * 1000;
export const REQUESTS_RETRY_NUMBER =
  Number(process.env.NEXT_PUBLIC_REQUESTS_RETRY_NUMBER) || 3;

export const WORKSPACE_SERVICE_ENDPOINT =
  process.env.NEXT_PUBLIC_WORKSPACE_SERVICE_BASE_URL;

const apiInstance = axios.create({
  withCredentials: true,
  baseURL: API_ENDPOINT,
});

const setAuthInterceptor = (
  instance: AxiosInstance,
  getAccessTokenSilently: () => Promise<string>,
  isAuthenticated: boolean
) => {
  instance.interceptors.request.use(async (config) => {
    const cloneConfig = { ...config };

    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      cloneConfig.headers.Authorization = `Bearer ${token}`;
    }
    return cloneConfig;
  });
};

export const setParamsInterceptor = (
  instance: AxiosInstance,
  params: AxiosRequestConfig["headers"]
) => {
  instance.interceptors.request.use(async (config) => {
    const cloneConfig = { ...config };

    Object.assign(cloneConfig.headers, params);

    return cloneConfig;
  });
};

export const meetingServiceInstance = axios.create({
  withCredentials: true,
  baseURL: MEETING_SERVICE_ENDPOINT,
});

export const workspaceServiceInstance = axios.create({
  withCredentials: true,
  baseURL: WORKSPACE_SERVICE_ENDPOINT,
});

// adds access tokens in all api requests - mock commit
// this interceptor is only added when the auth0 instance is ready and exports the getAccessTokenSilently method
export const addAccessTokenInterceptor = (
  getAccessTokenSilently: () => Promise<string>,
  isAuthenticated: boolean
) => {
  setAuthInterceptor(
    meetingServiceInstance,
    getAccessTokenSilently,
    isAuthenticated
  );
  setAuthInterceptor(apiInstance, getAccessTokenSilently, isAuthenticated);
  setAuthInterceptor(
    workspaceServiceInstance,
    getAccessTokenSilently,
    isAuthenticated
  );
};

export default apiInstance;
