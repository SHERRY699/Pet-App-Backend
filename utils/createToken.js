import jwt from "jsonwebtoken";

export default function createToken(id) {
  let token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
  return token;
}
