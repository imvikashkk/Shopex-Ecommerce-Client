/* eslint-disable no-async-promise-executor */
import { BACKEND_URL } from "../../app/constant";

export function addToCart(itemId) {
  return new Promise(async (resolve, reject) => {
    try {
      const headers = new Headers();
      headers.append("authorization", localStorage.getItem("authorization"));
      headers.append("content-type", "application/json");
      const response = await fetch(`${BACKEND_URL}/cart`, {
        method: "POST",
        body: JSON.stringify(itemId),
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

export function fetchItemsByUserId() {
  return new Promise(async (resolve, reject) => {
    try {
      const headers = new Headers();
      headers.append("authorization", localStorage.getItem("authorization"));
      headers.append("content-type", "application/json");
      const response = await fetch(`${BACKEND_URL}/cart`, {
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

export function fetchItemsDetails() {
  return new Promise(async (resolve, reject) => {
    const headers = new Headers();
    headers.append("authorization", localStorage.getItem("authorization"));
    headers.append("content-type", "application/json");
    const response = await fetch(`${BACKEND_URL}/cart/items`, {
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

export function updateCart(update) {
  return new Promise(async (resolve, reject) => {
    try {
      const headers = new Headers();
      headers.append("authorization", localStorage.getItem("authorization"));
      headers.append("content-type", "application/json");
      const response = await fetch(`${BACKEND_URL}/cart/${update.id}`, {
        method: "PATCH",
        body: JSON.stringify(update),
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

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve, reject) => {
    try {
      const headers = new Headers();
      headers.append("authorization", localStorage.getItem("authorization"));
      headers.append("content-type", "application/json");
      const response = await fetch(`${BACKEND_URL}/cart/${itemId}`, {
        method: "DELETE",
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

export function resetCart() {
  return new Promise(async (resolve, reject) => {
    try {
      const headers = new Headers();
      headers.append("authorization", localStorage.getItem("authorization"));
      headers.append("content-type", "application/json");
      const response = await fetch(`${BACKEND_URL}/cart/clear`, {
        method: "DELETE",
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
