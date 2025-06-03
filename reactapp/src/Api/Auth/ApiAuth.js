/* eslint-disable prettier/prettier */

export async function authHandler(action, user) {
  const response = await fetch(`http://localhost:3001/${action}`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  });

  const result = await response.json();
  if (response.ok) {
    return result;
  }
  throw new Error(result.message);
}

// export async function authHandler2(action, user) {
//   const response = await fetch(
// `http://localhost:3001/${action}`
//     `https://academyofdigitalindustriesbackend.onrender.com/api/v1/auth/${action}`,
//     {
//       method: "POST",
//       body: JSON.stringify(user),
//       headers: { "Content-Type": "application/json" },
//     }
//   );
//   const result = await response.json();
//   if (response.ok) {
//     return result;
//   }
//   throw new Error("ERROR ERROR");
// }
