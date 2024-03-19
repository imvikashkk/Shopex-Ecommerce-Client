/* eslint-disable no-async-promise-executor */
import { BACKEND_URL } from "../../app/constant";

export function fetchLoggedInUser() {
  return new Promise(async (resolve, reject) => {
    const headers = new Headers();
    headers.append("authorization", localStorage.getItem("authorization"));
    const response = await fetch(`${BACKEND_URL}/user/own`, {
      headers: headers,
    });
    if (response.ok) {
      const data = await response.json();
      resolve({ data });
    } else {
      reject(response);
    }
  });
}

export function updateUser(data) {
  return new Promise(async (resolve, reject) => {
    const headers = new Headers();
    headers.append("authorization", localStorage.getItem("authorization"));
    headers.append("content-type", "application/json");
    const response = await fetch(`${BACKEND_URL}/user/updateuser`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: headers,
    });
    if (response.ok) {
      const resData = await response.json();
      resolve({ data: resData });
    } else {
      reject(response);
    }
  });
}

export function changePassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const headers = new Headers();
      headers.append("authorization", localStorage.getItem("authorization"));
      headers.append("content-type", "application/json");
      const response = await fetch(`${BACKEND_URL}/user/changepassword`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: headers,
      });
      if (response.ok) {
        const resData = await response.json();
        resolve({ data: resData });
      } else {
        reject(response);
      }
    } catch (error) {
      reject({ error: error.message });
    }
  });
}

export function addAddress(address) {
  return new Promise(async (resolve, reject) => {
    const headers = new Headers();
    headers.append("authorization", localStorage.getItem("authorization"));
    headers.append("content-type", "application/json");
    const response = fetch(`${BACKEND_URL}/address`, {
      method: "POST",
      body: JSON.stringify(address),
      headers: headers,
    });
    if (response.ok) {
      console.log("response");
      const data = await response.json();
      resolve({ data });
    } else {
      reject(response);
    }
  });
}

export function updateAddress(data) {
  return new Promise(async (resolve, reject) => {
    const headers = new Headers();
    headers.append("authorization", localStorage.getItem("authorization"));
    headers.append("content-type", "application/json");
    const response = fetch(`${BACKEND_URL}/address`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: headers,
    });
    if (response.ok) {
      console.log("response");
      const data = await response.json();
      resolve({ data });
    } else {
      reject(response);
    }
  });
}

export function removeAddress(data) {
  return new Promise(async (resolve, reject) => {
    const headers = new Headers();
    headers.append("authorization", localStorage.getItem("authorization"));
    headers.append("content-type", "application/json");
    const response = fetch(`${BACKEND_URL}/address`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: headers,
    });
    if (response.ok) {
      console.log("response");
      const data = await response.json();
      resolve({ data });
    } else {
      reject(response);
    }
  });
}
