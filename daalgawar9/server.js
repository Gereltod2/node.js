const express = require("express");
const { body, validationResult } = require("express-validator");

const app = express();
app.use(express.json()); 

const PORT = 3000;

app.post(
  "/login",
  [
    body("email").isEmail().withMessage("Зөв и-мэйл хаяг оруулна уу"),
    body("password").isLength({ min: 6 }).withMessage("Нууц үг 6 тэмдэгтээс урт байх ёстой"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.json({ message: "Амжилттай нэвтэрлээ" });
  }
);

app.use((req, res, next) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.status === 401) {
    return res.status(401).json({ error: "401 Unauthorized" });
  }

  res.status(500).json({ error: "Дотоод серверийн алдаа" });
});

app.listen(PORT, () => {
  console.log(`ервер ${PORT} дээр аслаа...`);
});
