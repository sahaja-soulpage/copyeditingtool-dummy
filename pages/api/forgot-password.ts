import axios from "axios";
import React from "react";
import db from "lib/db.server";
const FormData = require("form-data");
import ReactDOMServer from "react-dom/server";
import { ApiRequest, ApiResponse } from "lib/utils";
import PasswordSetEmailTemplate from "./templates/password-set";

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "GET request not allowed" });
    return;
  }
  // console.log(req.body.email, "email");

  // check user exists or not in db
  const user: any = await db.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (user) {
    const data = {
      username: user.name,
      link: `${req.headers.origin}/resetpassword/${user.token}`,
      text: "Reset your password here",
    };
    const body = ReactDOMServer.renderToString(React.createElement(PasswordSetEmailTemplate, data));

    const form = new FormData();
    form.append("To", user.email);
    form.append("Subject", "Reset Password");
    form.append("Body", body);

    const url = `${process.env.APEX_SERVER}/api/EMail/SendEMail`;
    const headers = {
      Authorization: `Basic ${process.env.APEX_AUTH_TOKEN}`,
      "Content-Type": "application/form-data",
    };

    try {
      console.log("userrrr", user, url, form, headers);
      await axios.post(url, form, { headers });
      // Any logic with your data here
      // console.info('Email Sent successfully.');
      res.status(200).json({
        message: "password reset link send to your email address",
      });
    } catch (err) {
      // console.log(err, "kln error");/
      res.status(400).send(err);
    }
  } else {
    res.status(400).json({ email: "Email not found" });
  }
}
