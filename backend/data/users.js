import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },
  {
    name: "Sanjay Rishidev",
    email: "rishidevsanjay9@gmail.com",
    password: bcrypt.hashSync("12345", 10),
  },
  {
    name: "hari",
    email: "hari@gmail.com",
    password: bcrypt.hashSync("12345", 10),
  },
];

export default users;
