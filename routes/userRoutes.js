const router = require("express").Router();
const Users = require("../models/userModels");
const verifyToken = require("../middleware/jwt");
// delete
router.delete(`/deleteUser/:userId`, verifyToken, async (req, res) => {
  const user = await Users.findById(req.params.userId);
  if (req.userId !== user._id.toString()) {
    return res.send("You can only delete your account!");
  }
  await Users.findByIdAndDelete(req.params.userId);
  return res.send("User Has been deleted.");
});

router.get(`/:userId`, verifyToken, async (req, res) => {
  const user = await Users.findById(req.params.userId);

  return res.status(200).send(user);
});

module.exports = router;
