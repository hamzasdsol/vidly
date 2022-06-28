const express = require("express");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const router = express.Router();
const { Rental, validate } = require("../models/rental");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
Fawn.init(mongoose);
// GET REQUEST HANDLER
router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort({ dateOut: -1 }).lean();
  res.send(rentals);
});

// GET SPECIFIC ID REQUEST HANDLER
router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(404).send("ID Not found");
  res.send(rental);
});

// POST REQUEST HANDLER
router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    // Bad Request = 400
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(404).send("Customer not found");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).send("Movie not found");

  if (movie.numberInStock === 0)
    return res.status(404).send("Movie is not in stock");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
      .run();

    res.send(rental);
  } catch (ex) {
    res.status(500).send(err);
  }
});

// // UPDATE REQUEST HANDLER
// router.post('/', async (req, res) => {
//     const result = validate(req.body);
//     if (result.error) {
//         // Bad Request = 400
//         res.status(400).send(result.error.details[0].message);
//         return;
//     }

//     const customer = await Customer.findById(req.body.customerId);
//     if(!customer) return res.status(404).send('Customer not found');

//     const movie = await Movie.findById(req.body.movieId);
//     if(!movie) return res.status(404).send('Movie not found');

//     if(movie.numberInStock === 0) return res.status(404).send('Movie is not in stock');

//     rental = await Rental.findByIdAndUpdate(req.params.id , {
//         customer : {
//             _id : customer._id,
//             name: customer.name,
//             isGold: customer.isGold,
//             phone: customer.phone
//         },
//         movie : {
//             _id : movie._id,
//             title: movie.title,
//             dailyRentalRate: movie.dailyRentalRate
//         }

//     },{new: true});

//     res.send(rental);
// });

// // DELETE REQUEST HANDLER
// router.delete('/:id', async (req, res) => {
//     const rental = await Rental.findByIdAndRemove(req.params.id);
//     if (!rental) return res.status(404).send('ID Not found');
//     res.send('Deleted')
// });

module.exports = router;
