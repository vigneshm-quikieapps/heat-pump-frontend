import axiosInstance from "../../src/services/axios-instance";
import { useMutation, useQuery } from "react-query";
// import { queryClient } from "../App";
// import axios from "axios";
export async function getFabric() {
  try {
    const api = `https://heat-pump-backend-test.herokuapp.com/api/v1/services/fabric-details?page=1&perPage=2&type=1`;
    const response = await axiosInstance.get(api);
    return response;
  } catch (error) {
    throw error;
  }
}
// export async function getFabric() {
//   try {
//     const api = `v1/services/fabric-details?page=1&perPage=2&type=1`;
//     const response = await axiosInstance.get(api);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// }

const addQuote = (data) =>
  axiosInstance.post(
    `https://heat-pump-backend-test.herokuapp.com/api/v1/services/quote?page=1&perPage=2&type=1`,
    data
  );
export const useAddQuote = (options) =>
  useMutation((data) => addQuote(data), options);

export async function getAllQuotes1(page) {
  try {
    const api = `https://heat-pump-backend-test.herokuapp.com/api/v1/services/all-quote?cst=true&page=${page}&perPage=10`;
    const response = await axiosInstance.get(api);
    return response;
  } catch (error) {
    throw error;
  }
}
const getAllQuotes = () =>
  axiosInstance
    .get(
      `https://heat-pump-backend-test.herokuapp.com/api/v1/services/all-quote?status=1&cst=true`
    )
    .then(({ data }) => data, {
      keepPreviousData: false,
    });

export const useGetAllQuotes = (data, options) =>
  useQuery(["data", data], () => getAllQuotes(), {
    enabled: true,
    keepPreviousData: false,
    ...options,
  });

export async function getFabricDetails(type, page) {
  try {
    const api = `https://heat-pump-backend-test.herokuapp.com/api/v1/services/fabric-details?page=${page}&perPage=3&type=${type}`;
    const response = await axiosInstance.get(api);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function getCustomer() {
  try {
    const api = `https://heat-pump-backend-test.herokuapp.com/api/v1/services/user-id`;
    const response = await axiosInstance.get(api);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function updateCustomer(_id, payload) {
  try {
    const api = `http://heat-pump-backend.herokuapp.com/api/v1/services/users?id=${_id}`;
    const response = await axiosInstance.patch(api, payload);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getQuote(qid) {
  try {
    const api = `https://heat-pump-backend-test.herokuapp.com/api/v1/services/quote?qid=${qid}`;
    const response = await axiosInstance.get(api);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function UpdateJob(qid, payload) {
  try {
    const api = `https://heat-pump-backend-test.herokuapp.com/api/v1/services/quote/${qid}`;
    const response = await axiosInstance.patch(api, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
const getExternalType = () =>
  axiosInstance
    .get(
      `https://heat-pump-backend-test.herokuapp.com/api/v1/services/fabric-details?page=1&perPage=2&type=1`
    )
    .then(({ data }) => data, {
      keepPreviousData: false,
    });

export const useGetExternalType = (data, options) =>
  useQuery(["data", data], () => getExternalType(), {
    enabled: true,
    keepPreviousData: false,
    ...options,
  });

//mutation

const deleteExternalId = (id) =>
  axiosInstance.delete(
    `https://heat-pump-backend-test.herokuapp.com/api/v1/services/fabric-details?fid=${id}`
  );
export const useDeleteExternalId = () =>
  useMutation((id) => deleteExternalId(id), {});

// const createFabric = (data) =>
//   axiosInstance.post(
//     `https://heat-pump-backend.herokuapp.com/api//v1/services/fabric-details`,
//     data
//   );
// export const useCreateFabric = (options) =>
//   useMutation((data) => createFabric(data), options);

// const getFabricType = (id) =>
//   axiosInstance.get(
//     `https://heat-pump-backend.herokuapp.com/api//v1/services/fabric-details?fid=${id}`
//   );
// export const useGetFabricType = () =>
//   useMutation((id) => getFabricType(id), {});
export async function getFabricType(id) {
  try {
    const api = `https://heat-pump-backend-test.herokuapp.com/api/v1/services/fabric-details-single?fid=${id}`;
    const response = await axiosInstance.get(api);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function updateFabricType(id, payload) {
  try {
    const api = `https://heat-pump-backend-test.herokuapp.com/api/v1/services/fabric-details?fid=${id}`;
    const response = await axiosInstance.patch(api, payload);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function createFabricType(payload) {
  try {
    const api = `https://heat-pump-backend-test.herokuapp.com/api/v1/services/fabric-details`;
    const response = await axiosInstance.post(api, payload);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function delFabric(id) {
  try {
    const api = `https://heat-pump-backend-test.herokuapp.com/api/v1/services/fabric-details?fid=${id}`;
    const response = await axiosInstance.delete(api);
    return response;
  } catch (error) {
    throw error;
  }
}
