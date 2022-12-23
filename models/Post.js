import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  //en amen inchy inch vor petqa partadir unena
  [
    [
      {
        question: {
          type: String,
          required: false,
        },
      },
      {
        title: {
          type: String,
          required: false,
        },
        isRight: {
          type: Boolean,
          required: false,
        },
      },
      {
        title: {
          type: String,
          required: false,
        },
        isRight: {
          type: Boolean,
          required: false,
        },
      },
      {
        title: {
          type: String,
          required: false,
        },
        isRight: {
          type: Boolean,
          required: false,
        },
      },
      {
        title: {
          type: String,
          required: false,
        },
        isRight: {
          type: Boolean,
          required: false,
        },
      },
    ],
  ],
  {
    //asumenq inqy iranic inch partadir saxin avelacni
    timestamps: true, //xosqi es pahin asumenq vor saxin data sozdanya avelacni avtomat
  }
);

export default mongoose.model("Post", PostSchema);
