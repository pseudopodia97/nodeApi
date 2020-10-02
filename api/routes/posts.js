var express = require("express");
var router = express.Router();
let Post = require("../model/post");
let mongoose = require("../model/post");

/* GET users listing. */
router.get("/", function (req, res, next) {
  Post.find().then((documents) => {
    console.log(documents);
    res.status(200).json(documents);
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Post.findByIdAndRemove(id, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.patch("/:id", (req, res) => {
    const id = req.params.id;
    const post = {
        
    }
    Post.findByIdAndUpdate(id, post, (err,res) => {
        
    })
} )


module.exports = router;
