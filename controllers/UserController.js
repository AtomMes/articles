import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; //jwt ov zashifrovat enq
import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10); //im jogelov shifrovki tesaka stexcum
    const hash = await bcrypt.hash(password, salt); //u et tesakov shifrovka enq anum paroly

    const doc = new UserModel({
      //user enq stexcum
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save(); //qcum enq db userin, u rezultaty veragrum userin

    const token = jwt.sign(
      {
        //token enq stexcum ira masin danninery es tokenov nayelu hamar(irans sranov qtnelu eli)
        _id: user._id, //id es dzevov enq grum vortev mongodb- um id taki gcikova eli
      },
      "secret", //asumenq te inchova shfrovka anelu
      {
        expiresIn: "30d", //30 oric arden vaverakan chi exni
      }
    );

    const { passwordHash, ...userData } = user._doc; //passwordHashy arandznacnum enq mnacac exacic, vor chogtagorcenq

    res.json({
      ...userData, //u menaq userData-n ogtagorcum
      token,
    });
  } catch (err) {
    console.log(err); //vor mer mot kansolum ereva errory
    res.status(500).json({
      message: "registracian chstacvec",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId); //en vor checkauthum id einq avelacrel, hima userModelin asum enq vor et id-ov mard chari db-um

    if (!user) {
      return res.status(404).json({
        message: "User is not found",
      });
    }

    const { passwordHash, ...userData } = user._doc; //passwordHashy arandznacnum enq mnacac exacic, vor chogtagorcenq

    res.json(userData); //u menaq userData-n ogtagorcum
  } catch (err) {
    console.log(err); //vor mer mot kansolum ereva errory
    res.status(500).json({
      message: "qez chkarecanq qtnenq",
    });
  }
};

export const login = async (req, res) => {
  try {
    //userModelov voncor databazai het enq kapnvum
    const user = await UserModel.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).json({
        message: "chstacvec login exnel(tenc mard chka)",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    ); //asumenq requesti paroly hamemati db-i et useri paroli het

    if (!isValidPass) {
      return res.status(404).json({
        message: "loginy kam paroly sxal en",
      });
    }

    const token = jwt.sign(
      {
        //token enq stexcum ira masin danninery es tokenov nayelu hamar(irans sranov qtnelu eli)
        _id: user._id, //id es dzevov enq grum vortev mongodb- um id taki gcikova eli
      },
      "secret", //asumenq te inchova shfrovka anelu
      {
        expiresIn: "30d", //30 oric arden vaverakan chi exni
      }
    );

    const { passwordHash, ...userData } = user._doc; //passwordHashy arandznacnum enq mnacac exacic, vor chogtagorcenq

    res.json({
      ...userData, //u menaq userData-n ogtagorcum
      token,
    });
  } catch (err) {
    console.log(err); //vor mer mot kansolum ereva errory
    res.status(500).json({
      message: "loginy chstacvec",
    });
  }
};
