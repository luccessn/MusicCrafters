/* eslint-disable prettier/prettier */
import { jwtDecode } from "jwt-decode";

function isTokenValid(token) {
  const currentTime = Date.now() / 1000;
  const Decode = jwtDecode(token);
  return Decode.exp > currentTime;
}

function toggleLocalStorage(token) {
  if (token) {
    localStorage.setItem("accessToken", token);
  } else {
    localStorage.removeItem("accessToken");
  }
}

export { isTokenValid, toggleLocalStorage };

// function isTokenValid2(token) {
//   const currentTime = Date.now() / 1000;
//   const Decode = jwtDecode(token);
//   return Decode.exp > currentTime;
// }

// function toggleLocalStorage2(token) {
//   if (token) {
//     localStorage.setItem("accessToken", token);
//   } else {
//     localStorage.removeItem("accessToken");
//   }
// }
