const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");


const { tokenAuth, sliceToken } = require("./utils");
const { createUser, getUserByToken, getUserByUsername } = require("../db/users");

router.get('/health', async (req, res, next) => {
    res.send({ message: "Healthy Users Route." })
  });

router.post("/register", async (req, res, next) => {
    next(error);
    try{
        const {username, password } = req.body
        
        
        const user = await createUser({ username, password })
        
        if (!user){
            res.send({
                error: "Username Taken",
                message: `User ${username} is already taken.`,
                name: "Username Taken"
            })
        }
        if (password.length<8){
            res.send({
                error: "Password Too Short!",
                message: "Password Too Short!",
                name: "Password Too Short!"
            })
        }
        const response = {
            message: "Registered",
            token: "TBD",
            user: {
                id: user.id,
                username: user.username
            }
        }
        
        res.send(response)
        
    } catch (error) {
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

router.post('/login', async(res, req, next) => {
    const {username, password} = req.body;

    if (!username || !password) {
        next({
            name: 'Missing Credentials Error',
            message: 'User not found'
        });
    }

    try {
        const user = await getUserByToken({username, password});

        if (username == username) {
            const token = jwt.sign(
              { id: user.id, username: user.username },
              process.env.JWT_SECRET
            );
      
            res.send({ 
              message: "You're logged in!",
              token: token,
              user: user,
          })
          } else {
            next ({
              name: "Incorrect Credetials Error",
              message: "Username or password is incorrect"
            })
          }
    } catch (error) {
        
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