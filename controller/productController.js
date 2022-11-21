import { Product } from "../models/productModal.js";
import ErrorHandler from "../utilis/errorHandler.js";
import asyncError from "../middleWare/catchAsyncErrors.js";
import ApiFeature from "../utilis/apiFeatures.js";
import cloudinary from "cloudinary";
import DatauriParser from 'datauri/parser.js'
import path from "path";
const parser = new DatauriParser();

//Create Products
export const createProduct = asyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.files.image === "string") {
    images.push(req.files.image);
  } else {
    images = req.files.image;
  }
  const imagesLinks = [];


  for (let i = 0; i < images.length; i++) {
    const extName = path.extname(images[i].originalname).toString();
    const file64 = parser.format(extName, images[i].buffer);
    console.log(file64)
    const result = await cloudinary.v2.uploader.upload(file64.content, {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;
  const product = await Product.create(req.body);   

  res.status(201).json({
    success: true,
    product,
  });
});

//Get All Products
export const getAllProducts = asyncError(async (req, res) => {
  const resultPerPage = 20;

  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeature(Product.find({}), req.query)
    .search()
    .filter() 
    .pagination(resultPerPage);

  const product = await apiFeature.query;
  res.status(200).json({ success: true, product, productCount });
});

//Get All Products(Admin)
export const getAdminProducts = asyncError(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({ success: true, products });
});

//update product
export const updateProduct = asyncError(async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("error", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindandModify: false,
    });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (e) {
    console.log(e);
  }
});

//delete Product
export const deleteProduct = asyncError(async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("error", 404));
    }
    await product.remove();
    res.status(200).json({
      success: true,
      message: "Product deleted Successfully",
    });
  } catch (error) {}
});

//Get Product Details
export const productDetails = asyncError(async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("error", 404));
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {}
});

//Create new review and update the review
// export const createProductReview = asyncError(async (req, res, next) => {
//   // console.log(req.user.id, "//////////////", req.body);
//   const { rating, comment, productId } = req.body;
//   const review = {
//     user: req.user._id,
//     name: req.user.name,
//     rating: Number(rating),
//     comment,
//   };
//   const product = await Product.findById(productId);
//   // console.log(product, "product");
//   const existingReview = product.reviews.find((rev) => {
//     console.log(rev, "item");
//     rev._id.toString() === req.user._id.toString();
//   });

//   console.log(existingReview, "exiting reviews");
//   if (existingReview) {
//     existingReview.rating = rating;
//     existingReview.comment = comment;
//     existingReview.save();

//     product.reviews.forEach((rev) => {
//       if ((rev) => rev.user.toString() === req.user._id.toString()) {
//         (rev.rating = rating), (rev.comment = comment);
//       }
//     });
//   } else {
//     console.log("coming here");
//     product.reviews.push(review);
//     product.numOfReviews = product.reviews.length;
//     const createProductReview = catchAsyncErrors(
//       async (req, res, next) => {
//         const { rating, comment, productId } = req.body;

//         const review = {
//           user: req.user._id,
//           name: req.user.name,
//           rating: Number(rating),
//           comment,
//         };

//         const product = await Product.findById(productId);

//         const isReviewed = product.reviews.find(
//           (rev) => rev.user.toString() === req.user._id.toString()
//         );

//         if (isReviewed) {
//           product.reviews.forEach((rev) => {
//             if (rev.user.toString() === req.user._id.toString())
//               (rev.rating = rating), (rev.comment = comment);
//           });
//         } else {
//           product.reviews.push(review);
//           product.numOfReviews = product.reviews.length;
//         }

//         let avg = 0;

//         product.reviews.forEach((rev) => {
//           avg += rev.rating;
//         });

//         product.ratings = avg / product.reviews.length;

//         await product.save({ validateBeforeSave: false });

//         res.status(200).json({
//           success: true,
//         });
//       }
//     );
//   }

//   let avg = 0;
//   product.reviews.forEach((rev) => (avg += rev.rating));
//   product.ratings = avg / product.reviews.length;
//   await product.save({ validateBeforeSave: false });

//   res.status(200).json({
//     success: true,
//   });
// });
export const createProductReview = asyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  // console.log(product, "product");

  const isReviewed = product.reviews.find((rev) => {
    rev._id.toString() === req.user._id.toString();
  });

  if (isReviewed) {
    console.log(isReviewed, "is reviewed in if");
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    console.log(isReviewed, "is reviewed in else", review);

    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  console.log(product, "product");

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//Get all Reviews of product
export const getProductReviews = asyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete Review
export const deleteReview = asyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => (avg += rev.rating));

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindandModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
