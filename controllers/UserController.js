import db from '../db/db';


  export function getAllUsers(_req, res) {
    return res.status(200).send({
      ok: 'true',
      message: 'users retrieved successfully',
      result: db,
    });
  }

  export function getUser(req, res) {
    const id = parseInt(req.params.id, 10);
    db.users.map((user) => {
      if (user.id === id) {
        return res.status(200).send({
          ok: 'true',
          message: 'user retrieved successfully',
          result: user,
        });
      } 
  });
   return res.status(404).send({
     ok: 'false',
     message: 'user does not exist',
    });
  }

  export function createUser(req, res) {
    if(!req.body.firstName || !req.body.lastName) {
        return res.status(400).send({
          ok: 'false',
          error: [{
            field: 'firstName and lastName',
            message: 'firstName and lastName are mandatory'
          }]
        });
      } else if (req.body.firstName === " " || req.body.lastName === " "){
        return res.status(400).send({  
            ok: 'false',
            error: [{
              field: 'firstName and lastName',
              message: 'Must be a non-empty string'
            }]
        });
      } else if(!req.body.age || (isNaN(req.body.age) || req.body.age < 0)) {
        return res.status(400).send({
          ok: 'false',
          error: [{
            field: 'age',
            message: 'Must be a positive number or zero'
          }]
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
          ok: 'true',
          message: 'user added successfully',
          result: user
        })
      }
  }

  export function updateUser(req, res) {
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
        ok: 'false',
        message: 'user not found',
      });
    }
  
    if (!req.body.firstName) {
      return res.status(400).send({
        ok: 'false',
        message: 'firstName is required',
      });
    } else if (!req.body.lastName) {
      return res.status(400).send({
        ok: 'false',
        message: 'lastName is required',
      });
    } else if (!req.body.age) {
      return res.status(400).send({
        ok: 'false',
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
  
    return res.status(200).send({
      ok: 'true',
      message: 'user added successfully',
      result: updateduser,
    });
  }

  export function deleteUser(req, res) {
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
        ok: 'false',
        message: 'user not found',
      });
    }

    db.users.splice(itemIndex, 1);

    return res.status(200).send({
      ok: 'true',
      message: 'user deleted successfuly',
    });
  }


//const UserController = new UsersController();
// module.exports = UserController;