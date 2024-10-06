// import express from "express";
// import mongoose from "mongoose";
// import { RecipesModel } from "../models/recipe.model.js";
// import { UserModel } from "../models/user.model.js";
// import { verifyToken } from "./userRoutes.js";

// const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const result = await RecipesModel.find({});
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.post("/", verifyToken, async (req, res) => {
//   const recipe = new RecipesModel({
//     _id: new mongoose.Types.ObjectId(),
//     name: req.body.name,
//     image: req.body.image,
//     ingredients: req.body.ingredients,
//     instructions: req.body.instructions,
//     imageUrl: req.body.imageUrl,
//     cookingTime: req.body.cookingTime,
//     userOwner: req.body.userOwner,
//   });
//   console.log(recipe);

//   try {
//     const result = await recipe.save();
//     res.status(201).json({
//       createdRecipe: {
//         name: result.name,
//         image: result.image,
//         ingredients: result.ingredients,
//         instructions: result.instructions,
//         _id: result._id,
//       },
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/:recipeId", async (req, res) => {
//   try {
//     const result = await RecipesModel.findById(req.params.recipeId);
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.put("/", async (req, res) => {
//   const recipe = await RecipesModel.findById(req.body.recipeID);
//   const user = await UserModel.findById(req.body.userID);
//   try {
//     user.savedRecipes.push(recipe);
//     await user.save();
//     res.status(201).json({ savedRecipes: user.savedRecipes });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/savedRecipes/ids/:userId", async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.params.userId);
//     res.status(201).json({ savedRecipes: user?.savedRecipes });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// router.get("/savedRecipes/:userId", async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.params.userId);
//     const savedRecipes = await RecipesModel.find({
//       _id: { $in: user.savedRecipes },
//     });

//     console.log(savedRecipes);
//     res.status(201).json({ savedRecipes });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// export { router as recipesRouter };
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import { RecipesModel } from "../models/recipe.model.js";
import { UserModel } from "../models/user.model.js";
import { verifyToken } from "./userRoutes.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

import fs from 'fs';
const dir = './uploads';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

router.get("/", async (req, res) => {
  try {
    const result = await RecipesModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", verifyToken, upload.single('image'), async (req, res) => {
  const recipe = new RecipesModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    image: req.file.filename, 
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    imageUrl: req.file.path, 
    cookingTime: req.body.cookingTime,
    userOwner: req.body.userOwner,
  });
  
  console.log(recipe);

  try {
    const result = await recipe.save();
    res.status(201).json({
      createdRecipe: {
        name: result.name,
        image: result.image,
        ingredients: result.ingredients,
        instructions: result.instructions,
        _id: result._id,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:recipeId", async (req, res) => {
  try {
    const result = await RecipesModel.findById(req.params.recipeId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/", async (req, res) => {
  const recipe = await RecipesModel.findById(req.body.recipeID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(201).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/savedRecipes/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/savedRecipes/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedRecipes = await RecipesModel.find({
      _id: { $in: user.savedRecipes },
    });

    console.log(savedRecipes);
    res.status(201).json({ savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export { router as recipesRouter };

