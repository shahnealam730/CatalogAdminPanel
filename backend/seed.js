const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const sample = [
  {
    name: "Sample Chair",
    price: 1999,
    image:
      "https://www.idfdesign.com/images/leather-chairs/jacqueline-upholstered-modern-chair-3.jpg",
    modelUrl: "",
  },
  {
    name: "Sample Table",
    price: 2999,
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ3OQHggbrsHOWBHlUL84TJCvq_xodcoG9ZJv_gFfnaO24aGjC-jqqrRYoyKiOrKNJZ1h4aym7cGO1ShbtsG93mJrhkN4kCgXaiWZP7Rt-zdXZskay2BYC88g",
    modelUrl: "",
  },
  {
    name: "Sample Lamp",
    price: 799,
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT024ItAdDbPORQzgqme_Z8rVOihXtTxUbAV9Z5e9y9tTWGILQW-Bs_6wmSEm4RQfXuRsfv4feMwiuzvOgOhhcb9DVYGTrvIF4XIqws912ICRzkhBLVjspolA",
    modelUrl: "",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(sample);
    console.log("Seed complete");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
