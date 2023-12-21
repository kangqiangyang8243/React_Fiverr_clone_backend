const router = require("express").Router();
const Category = require("../models/CategoryModels");

// post new category
router.post("/", async (req, res) => {
  const { name, img, desc } = req.body;
  try {
    const category = await Category.create({ name, img, desc });
    return res.json(category);
  } catch (error) {
    return res.json({ message: error.message });
  }
});

// post new category
router.get("/", async (req, res) => {
  try {
    const category = await Category.find();
    return res.json(category);
  } catch (error) {
    return res.json({ message: error.message });
  }
});

module.exports = router;
