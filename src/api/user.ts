import request from "@/utils/request";

export const getUserList = (params: any) => {
  return request({
    params,
    url: "/api/user/getUserList",
  });
};

export const updateUserRecord = (data: any) => {
  return request({
    data,
    url: "/api/user/updateUser",
    method: "POST",
  });
};

export const createUserRecord = (data: any) => {
  return request({
    data,
    url: "/api/user/createUser",
    method: "PUT",
  });
};

export const handleDeleteUserRecordApi = (data: any) => {
  return request({
    data,
    url: "/api/user/delUser",
    method: "PUT",
  });
};
