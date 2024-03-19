/* eslint-disable no-async-promise-executor */
import { BACKEND_URL } from "../../app/constant";

export function createOrder(order) {
  return new Promise(async (resolve, reject) => {
    try {
      const headers = new Headers();
      headers.append("authorization", localStorage.getItem("authorization"));
      headers.append("content-type", "application/json");
      const response = await fetch(`${BACKEND_URL}/order`, {
        method: "POST",
        body: JSON.stringify(order),
        headers: headers,
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        reject(response);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve, reject) => {
    try {
      const headers = new Headers();
      headers.append("authorization", localStorage.getItem("authorization"));
      headers.append("content-type", "application/json");
      const response = await fetch(`${BACKEND_URL}/order/${order.id}`, {
        method: "PATCH",
        body: JSON.stringify(order),
        headers: headers,
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        reject(response);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve, reject) => {
    try {
      const headers = new Headers();
      headers.append("authorization", localStorage.getItem("authorization"));
      const response = await fetch(`${BACKEND_URL}/order/own`, {
        headers: headers,
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        reject(response);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchAllOrders(sort, pagination) {
  let queryString = "";
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise((resolve, reject) => {
    const headers = new Headers();
    headers.append("authorization", localStorage.getItem("authorization"));
    headers.append("content-type", "application/json");
    fetch(`${BACKEND_URL}/order/all/?${queryString}`, {headers: headers})
      .then(async (response) => {
        const res = await response.json();
        const totalOrders = await response.headers.get("X-Total-Count");
        return { res, totalOrders };
      })
      .then(({ res, totalOrders }) => {
        resolve({ data: { orders: res, totalOrders: +totalOrders } });
      })
      .catch((error) => {
        reject(error);
      });
  });
}
