import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  //en amen inchy inch vor petqa partadir unena
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: [],//aysinq ete tags chexni(qani vor optional parametra) uremn default array kexni
    },
    viewsCount:{
      type:Number,
      default:0// ete viewscount chexni default 0a 
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,//et useri id-n enq vercnum
      ref:'User',//asumeneq vor verevi id-ov gna user qtni
      required: true,
    },
    imageUrl: String,

  },
  {
    //asumenq inqy iranic inch partadir saxin avelacni
    timestamps: true, //xosqi es pahin asumenq vor saxin data sozdanya avelacni avtomat
  }
);

export default mongoose.model("Post", PostSchema);
