const router = require("express").Router();
const verifyToken = require("../middleware/jwt");
const gigModels = require("../models/gigModels");
const orderModel = require("../models/orderModels");
const Stripe = require("stripe");
const orderModels = require("../models/orderModels");


router.post("/create-payment-intent/:id", verifyToken, async (req, res) => {
  try {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const gig = await gigModels.findById(req.params.id);

    const { items } = req.body;


    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    await orderModel.create({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: paymentIntent.id,
    });
    return res.status(201).json({ message: "success order", clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return res.send(error);
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const order = await orderModel.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    return res.status(201).json(order);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.put("/", verifyToken, async (req, res) => {
  try {
    const orders = await orderModels.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );


    return res.status(201).json(orders);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
