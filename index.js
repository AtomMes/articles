import express from "express";
import mongoose from "mongoose";
import multer from "multer"; //nkarneri xranilishya-i hamara
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validators/auth.js";
import { UserController, PostController } from "./controllers/index.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
mongoose
  .connect(
    "mongodb+srv://atom:atom@cluster0.g2amee1.mongodb.net/blog?retryWrites=true&w=majority" //.net/ ic heto grum enq blog, vor menq stexan xosqi user porcenq saxranit anenq db-um inqy miangamic jogi vor uzerneri hmar petqa papka sarqi senc asac
  )
  .then(() => console.log("DB is ready"))
  .catch((err) => console.log("DB Error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    //inqy yndex tarber parametrera spasum vor chenq ogtagorcelu, prost taki gic enq dnum vor chuxarkenq
    cb(null, "uploads"); //asumenq vor voch mi ashibka chi stanalu, u qcelua uploads papka
  },
  filename: (_, file, cb) => {
    //ste uje faylnelenq qashum
    cb(null, file.originalname); //fayli original namen veragri filenamein eli yani
  },
});

const upload = multer({ storage }); //senvel voncor asumenq vor multeri storagen ogtagorcelu enq

app.use(express.json());
app.use("/uploads", express.static("uploads")); //asum enq ete uploadsin mi ban gna tes ete uploads papkum et fayly unenq et cuyc tu(vor brauzerum cuyc ta nkary)

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  //asumenq vor uploady mi hat image a spasum
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
); //mihat checkAuthov tenum enq ete register exaca, userId poxancum enq reqi mej vor heto ogtagorcenq
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
