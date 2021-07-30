export default function authHeader() {
    const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));
    if (token) {
      return { 'x-access-token': token, 'Content-Type': 'application/json', "data":null };
    } else {
      return {error: "Couldnt set x access token"};
    }
  }