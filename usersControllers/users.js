import db from '../db/db';

class UsersController {
  getAllUsers(_req, res) {
    return res.status(200).send({
      success: 'true',
      message: 'users retrieved successfully',
      users: db,
    });
  }

  getUser(req, res) {
    const id = parseInt(req.params.id, 10);
    db.users.map((user) => {
      if (user.id === id) {
        return res.status(200).send({
          success: 'true',
          message: 'user retrieved successfully',
          user,
        });
      } 
  });
   return res.status(404).send({
     success: 'false',
     message: 'user does not exist',
    });
  }

  createUser(req, res) {
    if(!req.body.firstName || !req.body.lastName) {
        return res.status(400).send({
          success: 'false',
          message: 'firstName and lastName are mandatory'
        });
      } else if (req.body.firstName === " " || req.body.lastName === " "){
        return res.status(400).send({  
            success: 'false',
            message: 'firstName and lastName must be a non-empty string'
        });
      } else if(!req.body.age || (isNaN(req.body.age) || req.body.age < 0)) {
        return res.status(400).send({
          success: 'false',
          message: 'Age is required and must be a positive number or zero'
        });
      } else {
        const user = {
          id:  db.users.length + 1,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          age: req.body.age
        }
        db.users.push(user);
        return res.status(201).send({
          success: 'true',
          message: 'user added successfully',
          user
        })
      }
  }

  updateUser(req, res) {
    const id = parseInt(req.params.id, 10);
    let userFound;
    let itemIndex;
    db.users.map((user, index) => {
      if (user.id === id) {
        userFound = user;
        itemIndex = index;
      }
    });
  
    if (!userFound) {
      return res.status(404).send({
        success: 'false',
        message: 'user not found',
      });
    }
  
    if (!req.body.firstName) {
      return res.status(400).send({
        success: 'false',
        message: 'firstName is required',
      });
    } else if (!req.body.lastName) {
      return res.status(400).send({
        success: 'false',
        message: 'lastName is required',
      });
    } else if (!req.body.age) {
      return res.status(400).send({
        success: 'false',
        message: 'age is required',
      });
    }
  
    const updateduser = {
      id: userFound.id,
      firstName: req.body.firstName || userFound.firstName,
      lastName: req.body.lastName || userFound.lastName,
      age: req.body.age || userFound.age,
    };
  
    db.users.splice(itemIndex, 1, updateduser);
  
    return res.status(201).send({
      success: 'true',
      message: 'user added successfully',
      updateduser,
    });
  }

  deleteUser(req, res) {
    const id = parseInt(req.params.id, 10);
    let userFound;
    let itemIndex;
    db.users.map((user, index) => {
      if (user.id === id) {
        userFound = user;
        itemIndex = index;
      }
    });
  
    if (!userFound) {
      return res.status(204).send({
        success: 'false',
        message: 'user not found',
      });
    }

    db.users.splice(itemIndex, 1);

    return res.status(200).send({
      success: 'true',
      message: 'user deleted successfuly',
    });
  }
}

const UserController = new UsersController();
module.exports = UserController;