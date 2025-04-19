import config from "../config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: config.NODE_ENV === "development" ? false : true,
  auth: {
    user: config.transporterEmail,
    pass: config.transporterPassword,
  },
});

export default transporter;
