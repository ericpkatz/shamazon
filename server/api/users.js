const express = require("express");
const UserRouter = express.Router();

const jwt = require("jsonwebtoken");


const { tokenAuth, sliceToken } = require("./utils");
const { createUser, getUserByToken, getUserByUsername} = require("../db/users");

UserRouter.post("/register", async (req, res, next) => {
    const {username, password} = req.body;
    try {
        if (password.length <= 7) {
            next ({
               error: 'Short Password',
               message: 'Your password is too short!',
               name: username, 
               status: 400
            });
        }
    
    const newUser = await createUser(req.body);
    if (!newUser) {
        next ({
            error: 'Taken Username',
            message: `${username} is taken!`,
            name: username,
            status: 401
        });
    } else {
        const {id} = newUser;
        const token = jwt.sign (
            {id: id, username},
            process.env.jwt
        );
        res.send({
            message: 'You have succefully registered!',
            token: token,
            user: {id:id, username:username}
        })
    }
    } catch (error) {
        next(error);
    }
});

UserRouter.post('/login', async(res, req, next) => {
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

UserRouter.get('/me', tokenAuth, async (req, res, next) => {

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
   
   