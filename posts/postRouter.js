const express = require('express');
const postData = require('../posts/postDb')
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  postData.get()
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'post not found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the users',
      });
    });
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.post)
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  postData.update(req.params.id, req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The post has been deleted' });
      } else {
        res.status(500).json({ message: 'Error removing the post' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the post',
      });
    });
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  postData.update(req.params.id, req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The post has been edited' });
      } else {
        res.status(500).json({ message: 'Error editing the post' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the post',
      });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  postData.getById(req.params.id)
    .then(post => {
      if (post) {
        req.post = post
        next()
      } else {
        res.status(404).json({ message: 'post not found' });
      }
    })
    .catch(error => {
      res.status(400).json({ message: "invalid post id" })
    })
}

module.exports = router;
