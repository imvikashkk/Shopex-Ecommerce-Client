import { BACKEND_URL } from "../../app/constant";

export const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    fetch(`${BACKEND_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    })
      .then(async (response) => {
        const res = await response.json();
        if (response.ok) {
          const authorization = response.headers.get("authorization");
          localStorage.setItem("authorization", authorization);
          resolve(res);
        } else {
          reject(res);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const loginUser = (loginInfo) => {
  return new Promise((resolve, reject) => {
    fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: { "content-type": "application/json" },
    })
      .then(async (response) => {
        const res = await response.json();
        if (response.ok) {
          const authorization = response.headers.get("authorization");
          localStorage.setItem("authorization", authorization);
          resolve(res);
        } else {
          reject(res);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const signOut = () => {
  return new Promise((resolve, reject) => {
    fetch(`${BACKEND_URL}/auth/logout`)
      .then(() => {
        resolve({ status: "OK" });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const resetPasswordRequest = (email) => {
  return new Promise((resolve, reject) => {
    fetch(`${BACKEND_URL}/auth/reset-password-request`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "content-type": "application/json" },
    })
      .then(async (response) => {
        const res = await response.json();
        if (res.status === "OK") {
          resolve(res);
        } else {
          reject(res);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const resetPassword = (data) => {
  return new Promise((resolve, reject) => {
    fetch(`${BACKEND_URL}/auth/reset-password`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    })
      .then(async (response) => {
        const res = await response.json();
        if (res.status === "OK") {
          resolve(res);
        } else {
          reject(res);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
