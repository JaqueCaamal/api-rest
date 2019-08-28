import express from 'express';
import db from '../db/db';
import UsersController from '../usersControllers/users';

const router = express.Router();
router.get('/api/v1/users', UsersController.getAllUsers);
router.get('/api/v1/users/:id', UsersController.getUser);
router.post('/api/v1/users', UsersController.createUser);
router.put('/api/v1/users/:id', UsersController.updateUser);
router.delete('/api/v1/users/:id', UsersController.deleteUser);

module.exports = router;