/* eslint-disable no-async-promise-executor */
import { BACKEND_URL } from "../../app/constant";

export function fetchProductById(id) {
  return new Promise(async (resolve, reject) => {
    try{
      const headers = new Headers();
      headers.append("authorization", localStorage.getItem("authorization"));
      const response = await fetch(`${BACKEND_URL}/product/one/${id}`, {
        headers: headers,
      });
      if (response.ok) {
        const data = await response.json();
        resolve({data});
      } else {
        reject(response);
      }
    }catch(error){
       reject(error);
    }
  });
}

export function createProduct(product) {
  return new Promise(async (resolve, reject) => {
    try{
      const headers = new Headers();
      headers.append("authorization", localStorage.getItem("authorization"));
      headers.append("content-type", "application/json");
      const response = await fetch(`${BACKEND_URL}/product/`, {
        method: "POST",
        body: JSON.stringify(product),
        headers: headers,
      });
      const data = await response.json();
      resolve({ data });
    }catch(error){
      reject(error)
    }
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve, reject) => {
    try{
      const headers = new Headers();
      headers.append("authorization", localStorage.getItem("authorization"));
      headers.append("content-type", "application/json");
      const response = await fetch(`${BACKEND_URL}/product/${update.id}`, {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: headers,
      });
      const data = await response.json();
      resolve({ data });
    }catch(error){
      reject(error)
    }
  });
}

export function fetchProductsByFilters(filter, sort, pagination, admin) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}

  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  if (admin) {
    queryString += `admin=true`;
  }

  return new Promise(async (resolve, reject) => {
    try {
      const headers = new Headers();
      headers.append("authorization", localStorage.getItem("authorization"));
      const response = await fetch(`${BACKEND_URL}/product?${queryString}`, {
        headers: headers,
      });
      if (response.ok) {
        const data = await response.json();
        const totalItems = response.headers.get("X-Total-Count");
        resolve({ data: { products: data, totalItems: +totalItems } });
      } else {
        reject(response);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchCategories() {
  return new Promise(async (resolve, reject) => {
    try {
      const headers = new Headers();
      headers.append("authorization", localStorage.getItem("authorization"));
      const response = await fetch(`${BACKEND_URL}/category`, {
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

export function fetchBrands() {
  return new Promise(async (resolve, reject) => {
    try {
      const headers = new Headers();
      headers.append("authorization", localStorage.getItem("authorization"));
      const response = await fetch(`${BACKEND_URL}/brand`, {
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
