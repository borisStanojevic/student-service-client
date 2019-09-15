import * as JWT from "jwt-decode";

export function getAuthToken() {
  return localStorage.getItem("token");
}

export function getAuthenticatedUser() {
  if (!localStorage.getItem("token")) return;

  const id = parseInt(localStorage.getItem("id"));
  const role = localStorage.getItem("role");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");

  return { id, firstName, lastName, role };
}

export function setAuthenticatedUser(token) {
  const decodedJwt: any = JWT(token);
  const {
    sub: id,
    first_name: firstName,
    last_name: lastName,
    role
  } = decodedJwt;

  localStorage.setItem("token", token);
  localStorage.setItem("id", id);
  localStorage.setItem("role", role);
  localStorage.setItem("firstName", firstName);
  localStorage.setItem("lastName", lastName);
}

export function unauthenticateUser() {
  localStorage.clear();
  window.location.replace("/auth/login");
}
