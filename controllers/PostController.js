import PostModel from "../models/Post.js";

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find() //asumenq vor bolory gtni

      //es 2y hastat chen, bayc es tenc em jogel
      .limit(5) //prost asumenq amenashaty 5 haty veradardzru
      .exec(); //u et danninery hety veradardzni

    const tags = posts
      .map((obj) => obj.tags)
      .flat() //vor meji andamnerin sax mi masivi mej qci
      .slice(0, 5);
    console.log(tags, posts);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "chstacvec tegery qashel",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find(); //asumenq vor bolory gtni

    //es 2y hastat chen, bayc es tenc em jogel
    // .populate("user") //bolorin user i het kpcni(usery et modelneri meja eli,)
    //  .exec(); //u et danninery hety veradardzni

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "chstacvec posty stexcel",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id; //  /post/:id-i id-n enq stanum

    PostModel.findOneAndUpdate(
      {
        //meky qti u update ara
        _id: postId, //asumeqn et yst inchi qtni, asumenq vor dar id-n havasar exni postId-in
      },
      {
        //2rd parametrov asum enq te inchy update ani
        $inc: { viewsCount: 1 }, //asumeqn vor increment ani(avelacni) viewscounty 1ov
      },
      {
        returnDocument: "after", //asumenq vor voch te prost abnavit enq anum ayl abnavit enq anum u abnavit aracy het qcum db
      },
      (err, doc) => {
        if (err) {
          //ete error exni
          console.log(err);
          return res.status(500).json({
            message: "chstacvec posty veradardznel",
          });
        }

        if (!doc) {
          //ete dakument chexni tenc
          return res.status(404).json({
            message: "tenc post chka",
          });
        }

        res.json(doc);
      }
    ).populate("user");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "chstacvec post stexcel",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id; //  /post/:id-i id-n enq stanum

    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          //ete error exni
          console.log(err);
          return res.status(500).json({
            message: "chstacvec posty jnjel",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "tenc post chka",
          });
        }

        res.json({
          success: true,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "chstacvec post stexcel",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.findOneAndUpdate(
      {
        _id: postId, //asumeqn te vonc enq gtnelu
      },
      {
        //asumenq te inchn enq popoxelu
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags.split(","),
        user: req.userId,
      }
    );
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "chstacvec post popoxel",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(","),
      user: req.userId, //esmeky body-ic chenq qashum vorovhetev checkAuthica galis userId-n
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "chstacvec post stexcel",
    });
  }
};
