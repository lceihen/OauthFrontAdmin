import request from "@/utils/request";
export const getToken = (params: any) => {
  return request({
    params,
    url: "/api/auth/token",
  });
};

export const getClientList = (params: any) => {
  return request({
    params,
    url: "/api/auth/getClient",
  });
};
export const createOrUpdateClientRecord = (data: any) => {
  return request({
    data,
    url: "/api/auth/createOrUpdate",
    method: "POST",
  });
};

export const handleDeleteClientRecordApi = (data: any) => {
  return request({
    data,
    url: "/api/auth/delClient",
    method: "PUT",
  });
};
