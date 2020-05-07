const express = require('express');
const router = express.Router();
const userData = require('./userDb')
const postData = require('../posts/postDb')

router.post('/', validateUser, (req, res) => {
  // do your magic!
  userData.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      res.status(500).json({ message: 'an error as occured' })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  let newPost = {
    user_id: req.params.id,
    text: req.body.text
  }
  postData.insert(newPost)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(error => {
      res.status(500).json({ message: `[${error}] an error has occured` })
    })
});

router.get('/', (req, res) => {
  // do your magic!
  userData.get()
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: 'users not found' });
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

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  userData.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the users',
      });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  userData.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The post has been nuked' });
      } else {
        res.status(500).json({ message: 'Error removing the user' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the user',
      });
    });
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  userData.update(req.params.id, req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The post has been edited' });
      } else {
        res.status(500).json({ message: 'Error editing the user' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the user',
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  userData.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user
        next()
      } else {
        res.status(404).json({ message: 'user not found' });
      }
    })
    .catch(error => {
      res.status(400).json({ message: "invalid user id" })
    })
}

function validateUser(req, res, next) {
  // do your magic!
  // console.log(req.body)
  if (!req.body) {
    res.status(400).json({ message: 'missing user data' })
  } else if (!req.body.name) {
    res.status(400).json({ message: 'missing required name field' })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: 'missing post data' })
  } else if (!req.body.text) {
    res.status(400).json({ message: 'missing required text field' })
  } else {
    next()
  }
}

module.exports = router;
