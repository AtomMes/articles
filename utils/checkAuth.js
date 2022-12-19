import jwt from "jsonwebtoken";

export default async (req, res, next) => {
  const token = await (req.headers.authorization || "").replace(
    /Bearer\s?/,
    ""
  ); //asumenq vor bearer bary poxi datarkov tokeni meji

  if (token) {
    try {
      const decoded = jwt.verify(token, "secret"); //asumenq tokeny secret barod encode ani eli

      req.userId = decoded._id; //u requesti mej enq qcum et id-n vor heto inch vor mi tex ogtagorcenq ete petq ga
      return next() //nextov asum enq vor ste sax toshnia gna gordzerid es funkciaic hel
    } catch (err) {
      return res.status(403).json({
        message: "No access",
      });
    }
  } else {
    return res.status(403).json({
      message: "no access",
    });
  }
};
