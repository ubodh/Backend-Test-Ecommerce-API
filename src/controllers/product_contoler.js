// Import necessary modules
const Product = require("../models/products");
const Counter = require("../models/conter");

// Function to get the next sequence ID
async function getNextSequence(name) {
  var ret = await Counter.findOneAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    { new: true }
  );
  return ret.seq;
}
// Create a new product
module.exports.create = async function (req, res) {
  // console.log(req.body.name);
  try {
    // Check if the required fields are present in the request body
    if (!req.body.name || !req.body.quantity) {
      return res
        .status(400)
        .json({ message: "Name and Quantity are required" });
    }

    // Check if the product already exists
    const existingProduct = await Product.findOne({ name: req.body.name });

    if (existingProduct) {
      return res.status(409).json({ message: "Product already exists" });
    }

    // Create or increment the sequence
    const length = await Counter.countDocuments({});
    let id;

    if (length === 0) {
      await Counter.create({ _id: "userid", seq: 0 });
    }

    id = await getNextSequence("userid");

    // Create the product
    const newProduct = await Product.create({
      _id: id,
      name: req.body.name,
      quantity: req.body.quantity,
    });

    if (newProduct) {
      return res.status(201).json({ data: { product: newProduct } });
    }
  } catch (err) {
    console.error(`Error: ${err}`);
    return res.status(500).json({ message: "Internal error" });
  }
};

// Other controller functions for index, delete, and update
// Ensure they handle errors and requests properly

module.exports.index = async function (req, res) {
  try {
    //finding all the products
    let product = await Product.find({});

    //sending response
    return res.json(200, {
      data: {
        message: "list of post",
        products: product,
      },
    });
  } catch (err) {
    //if error occurs
    console.log(`error${err}`);
    return res.json(500, {
      message: "error in fetching post ",
    });
  }
};

// //function to increase seq by 1 whenever called which is further used as _id of roduct
// async function getNextSequence(name) {
//   var ret = await Counter.findOneAndUpdate(
//     { _id: name },
//     { $inc: { seq: 1 } },
//     { new: true }
//   );
//   console.log(ret);
//   return ret.seq;
// }

// module.exports.create = async function (req, res) {
//   try {
//     let ifExist = await Product.findOne({ name: req.body.name });

//     if (ifExist) {
//       return res.status(404).json({
//         message: "Product already exists",
//       });
//     }

//     let length = await Counter.countDocuments({});
//     let id;

//     if (length === 0) {
//       await Counter.create({
//         _id: "userid",
//         seq: 0,
//       });
//     }

//     id = await getNextSequence("userid");

//     await Product.create({
//       _id: id,
//       name: req.body.name,
//       quantity: req.body.quantity,
//     });

//     let product = await Product.findById(id).select("-_id");

//     if (product) {
//       return res.status(201).json({
//         data: {
//           product: product,
//         },
//       });
//     }
//   } catch (err) {
//     console.error(`Error: ${err}`);
//     return res.status(500).json({
//       message: "Internal error",
//     });
//   }
// };

// //to create a product
// module.exports.create = async function (req, res) {
//   try {
//     //if product of same name existed in list
//     let ifExist = await Product.findOne({ name: req.body.name });

//     if (ifExist != null) {
//       return await res.json(404, {
//         message: "product already exist",
//       });
//     }

//     let length = (await Counter.find({})).length;
//     let id;

//     //if length of Counter is 0 then creating counter
//     if (length == 0) {
//       await Counter.create({
//         _id: "userid",
//         seq: 0,
//       });
//     }

//     id = await getNextSequence("userid");

//     //creating product
//     await Product.create({
//       _id: id,
//       name: req.body.name,
//       quantity: req.body.quantity,
//     });

//     // removing id from product
//     let product = await Product.findById(id).select("-_id");

//     //responding if product creation is successfull
//     if (product) {
//       return res.json(201, {
//         data: {
//           product: product,
//         },
//       });
//     }
//   } catch (err) {
//     console.log(`err${err}`);
//     return res.json(500, {
//       message: "Internal error",
//     });
//   }
// };

//TO DELETE THE PRODUCT

module.exports.delete = async function (req, res) {
  try {
    let id = req.params.id;

    //finding product  by id
    let product = await Product.findById(id);
    //if product not fount then responding 401 not found
    if (product == null) {
      return res.json(401, {
        message: "post id not found",
      });
    }

    //removing product
    product.remove();

    return res.json(401, {
      message: "  post deleted Succesfully",
    });
  } catch (err) {
    console.log(`err${err}`);
    return res.json(500, {
      message: "Internal error in deleing post post",
    });
  }
};

// TO UPDATE THE QUANTITY OF PRODUCT
module.exports.update = async function (req, res) {
  try {
    //if quantity is -ve then returning
    if (req.query.number < 0) {
      return res.json(400, {
        message: "error quantity can't be negative",
      });
    }
    //finding and updating ther product if product not fornd it will return null

    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { quantity: req.query.number },
      { new: true }
    );
    if (product == null) {
      return res.json(404, {
        message: "post id not found",
      });
    }
    return res.json(200, {
      data: {
        product: product,
      },
    });
  } catch (err) {
    console.log(`error ${err}`);
    return res.json(500, {
      message: "Internal error in updating  post",
    });
  }
};
