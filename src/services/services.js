const baseUri = "http://localhost:5000/api";

// place
const placeList = baseUri + "/places/user"; //  /${placeId}
const placeCreate = baseUri + "/places"; // POST
const placeUpdate = baseUri + "/places"; // PATCH /${placeId}
const placeDelete = baseUri + "/places"; // DELETE /${placeId}

// uath
const login = baseUri + "/users/login";
const signup = baseUri + "/users/signup";
const userList = baseUri + "/users/signup";
