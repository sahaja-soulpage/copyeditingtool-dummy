// verify-site
import axios from "axios";
export default async (req, res) => {
  const { captcha_response } = req.body;
  if (!captcha_response) {
    res.json({ message: "Missing captcha Value" });
  }
  const secret = `${process.env.RECAPTCHA_SECRET_KEY}`;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captcha_response}`;
  const options = {
    method: "POST",
    url,
  };
  try {
    const resp = await axios.request(options);
    res.status(200).json(resp.data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
