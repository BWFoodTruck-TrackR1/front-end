import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "http://localhost:5000/api/",
    headers: {
      Authorization: token,
    },
  });
};

//this is an example of axios with auth


// const submit = (event) => {
//     event.preventDefault();
//     axios
//       .post("http://localhost:5000/api/login", formValues)
//       .then((res) => {
//         console.log("API RESPONSE:", res);
//         localStorage.setItem("token", res.data.payload);
//         props.history.push("/protected");
//       })
//       .catch((err) => console.log("API ERROR:", { err }));
//   };



// this is an example of how to store the token in the localStorege