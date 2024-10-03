import User from "../models/User.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import createToken from "../utils/createToken.js";

// async function Mail(otp, email) {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587, // or 465 if using secure
//     secure: false,
//     auth: {
//       user: process.env.username,
//       pass: process.env.password,
//     },
//   });

//   try {
//     const info = await transporter.sendMail({
//       from: `${process.env.username} 💥`,
//       to: email, // Send to the user's email
//       subject: "OTP Verification",
//       text: `Your OTP is: ${otp}`, // Send the OTP in the email body
//     });
//     console.log("Mail sent: ", info.messageId);
//   } catch (error) {
//     console.error("Email sending error: ", error);
//     throw new Error("Email Not Sent");
//   }
// }

export default async function userRegister(req, res) {
  const { email, username, password } = req.body;

  try {
    const userName = await User.findOne({ email });
    if (userName) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashed_password,
    });

    // const otp = Math.floor(Math.random() * 90000).toString();

    // Send the OTP via email
    // await Mail(otp, user.email); // Use 'email', not '_email'

    const token = createToken(user._id);

    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
      message: "User is created",
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error during registration", error: error.message });
  }
}
