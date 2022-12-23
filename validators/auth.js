import { body } from "express-validator"; //body-i meji uxarkac dannineri validator

export const loginValidation = [
  body(
    //body i meji
    "email", //emaily
    "sxala maily grac" //ete email chi exnum es sabshennina berelu
  ).isEmail(), //sranov stuguma emaila te che
  body("password", "paroly shat karch").isLength({ min: 5 }),
];

export const registerValidation = [
  body(
    //body i meji
    "email", //emaily
    "sxala maily grac" //ete email chi exnum es sabshennina berelu
  ).isEmail(), //sranov stuguma emaila te che
  body("password", "paroly shat karch").isLength({ min: 5 }),
  body("fullName", "anuny shata karch").isLength({ min: 3 }),
  body("avatarUrl", "ssilka chi(url petqa exni)").optional().isURL(),
];

export const postCreateValidation = [
  body("question", "harc tur").isLength({ min: 3 }).isString(),
  body("text", "text gri").isLength({ min: 10 }).isString(),
  body("tags", "massiv petqa exni").optional().isString(),
  body("imageUrl", "ssilkaya petq").optional().isString(),
];
