const HTTPCodes = require("../utils/HTTPCodes");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const { isEmail } = require("../utils/validator");
const { registerUser, getCredentials } = require("../services/user.service");

async function register(req, res) {
  try{
    const { email, password } = req.body;
    const errorMessages = [];
    if (!isEmail(email)) {
      errorMessages.push("Email is not valid");
    }

    if (errorMessages.length) {
      res.status(HTTPCodes.BAD_REQUEST).send({ error: errorMessages });
    } else {
      const salt = crypto.randomBytes(128).toString("base64");
      const encryptedPassword = crypto
        .pbkdf2Sync(password, salt, 30000, 64, "sha256")
        .toString("base64");
      const [newUserId] = await registerUser({
        ...req.body,
        encryptedPassword,
        salt,
      });

      res.send({
        success: true,
        newUserId,
      });
    }
  }catch(e){
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      message: "Internal server error",
      detail: e.toString(),
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try{
    const errorMessages = [];
    if (!isEmail(email)) {
      errorMessages.push("Email is not valid");
    }

    if (errorMessages.length) {
      res.status(HTTPCodes.BAD_REQUEST).send({ error: errorMessages });
    } else {
      const [credentials] = await getCredentials(email);
      const encryptedPassword = crypto
        .pbkdf2Sync(password, credentials.salt_user, 30000, 64, "sha256")
        .toString("base64");
      if (encryptedPassword == credentials.password_user) {
        const accessToken = jwt.sign({ email }, process.env.TOKEN_KEY || "1AS9812OQPY2",{
          expiresIn: "1d",
        });
        //refrescar sesion a medida el usuario use la aplicacion
        const refreshToken = jwt.sign({ email }, process.env.TOKEN_KEY || "1AS9812OQPY2",{
          expiresIn: "1m",
        });
        res.send({
          success: true,
          data: {
            accessToken,
            refreshToken,
          }
        });
      } else {
        res.status(HTTPCodes.UNAUTHORIZED).send({
          message: "Contrasena incorrecta",
        });
      }
    }
  }catch(e){
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      message:"Try again later",
    })
  }
}

module.exports = {
  register,
  login,
};