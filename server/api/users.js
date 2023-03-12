
const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");


const { tokenAuth, sliceToken } = require("./utils");
const { createUser, getUserByUsername, authenticate } = require("../db/users");


router.get('/health', async (req, res, next) => {
    res.send({ message: "Healthy Users Route." })
  });

router.post("/register", async (req, res, next) => {
    
    const {username, password} = req.body
    console.log(req.body)
    // // eslint-disable-next-line no-undef
    // res.send(error)

    try{
        
        
        const user = await getUserByUsername({username})
        
        if (user){
            res.send({
                error: "Username Taken",
                message: `User ${username} is already taken.`,
                name: "Username Taken"
            })
        }
        else if (password.length<8){
            res.send({
                error: "Password Too Short!",
                message: "Password Too Short!",
                name: "Password Too Short!"
            })
        } 
       
          const newUser = await createUser({username, password})
          const token = jwt.sign({id: newUser.id, username: newUser.username}, process.env.JWT_SECRET)
          res.send({
            newUser,
            message: "Username has been registered succesfully",
            token: token,
            user: {
              id: newUser.id,
              username: newUser.username
          }
          })
          
        
      
    } catch (error) {
      console.error(error);
    }
});

// Eric's Code

// const {username, password} = req.body;
// try {
//     if (password.length <= 7) {
//         res.send ({
//            error: 'Short Password',
//            message: 'Your password is too short!',
//            name: username, 
//            status: 400
//         });
//     }

// const newUser = await createUser({username, password});
// if (!newUser) {
//     res.send ({
//         error: 'Taken Username',
//         message: `${username} is taken!`,
//         name: username,
//         status: 401
//     });
// } else {
//     const {id} = newUser;
//     const token = jwt.sign (
//         {id: id, username},
//         process.env.jwt
//     );
//     res.send({
//         message: 'You have succefully registered!',
//         token: token,
//         user: {id:id, username:username}
//     })
// }

router.post('/login', async(req, res, next) => {
  const {username, password} = req.body;
  
  if (!username || !password) {
        next({ 
            name: 'Missing Credentials Error',
            message: 'User not found'
        });
      } else {

        
        try {
          const {username, password} = req.body;
          const token = await authenticate({username, password});
        
          if (token) {
              res.send({ 
                message: "You're logged in!",
              token: token,
              user: {
                username: username
              },
            })
          } else {
            next ({
              name: "Incorrect Credetials Error",
              message: "Username or password is incorrect"
            })
          }
        } catch (error) {
          console.error(error)
    }
        
    }

});

router.get('/me', tokenAuth, async (req, res, next) => {

    try{
     const userInfo = sliceToken(req);
    
     const user = await getUserByUsername(userInfo.username)
   
     if (user) {
       res.send({
         id: user.id, 
         username: user.username
       });
     }
     else {
         res.send('User unavailable');   
     }
   } catch (error) {
     next(error);
   }
   
   })
   
   module.exports = router