import {BASE_URL, ENDPOINTS} from "./endpoints";

type ApiResult<T> = {
  ok: boolean;
  data: T;
};

const apiCall = async <T>(
  url: string,
  method: "GET" | "POST",
  body?: any,
  token?: string,
): Promise<ApiResult<T>> => {
  const headers: any = {
    "Content-Type": "application/json",
  };

  // send token in Authorization header
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options: any = {method, headers};

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(BASE_URL + url, options);
  const data = await res.json();

  return {ok: res.ok, data};
};

// API RESPONSE TYPES
export type LoginRes = {
  status: boolean;
  msg: string;
  userid: number;
};

export type VerifyOtpRes = {
  status: boolean;
  msg: string;
  token: string;
};

export type DashboardRes = {
  status: boolean;
  msg: string;
  user: {
    id: number;
    userid: string;
    name: string;
    mobile: string;
  };
  dashboard: {
    carousel: string[];
    student: {
      Boy: number;
      Girl: number;
    };
    amount: {
      Total: number;
      Paid: number;
      due: number;
    };
    color: {
      dynamic_color: string;
    };
  };
};

//API METHODS
export const login = (userid: string, password: string) => {
  return apiCall<LoginRes>(ENDPOINTS.LOGIN, "POST", {userid, password});
};

export const verifyOtp = (userid: string, otp: string) => {
  return apiCall<VerifyOtpRes>(ENDPOINTS.VERIFY_OTP, "POST", {userid, otp});
};

export const getDashboard = (token: string) => {
  return apiCall<DashboardRes>(ENDPOINTS.DASHBOARD, "GET", undefined, token);
};
