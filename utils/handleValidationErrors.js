import { validationResult } from "express-validator"; //vor validatorsi meji validatornery ashibka en unenum cherez sran imanum enq vor ashibkaya exel u inch ashibkaya exel(en sobshenninery vor uxarkum ein)

export default (req, res, next) => {
  const errors = validationResult(req); //asumenq vor sax requesty stugi

  if (!errors.isEmpty()) {
    //ete errorner kan
    return res.status(400).json(
      errors.array() //et errornery arrayi mej qci u uxarki responsov
    );
  }

  next();
};
