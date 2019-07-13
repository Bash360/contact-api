import express from 'express';
const router = express.Router();
import joi from '@hapi/joi';
import {createUser} from '../../db/connect-db';

const schema: object = {
  firstName: joi.string().min(5).required(),
  lastName: joi.string().min(5).required(),
  email: joi.string().email().required(),
  phone: joi.string().max(11).required,
  gender: joi.string().max(6).min(4).required,
  blocked:joi.number().min(0).max(1).optional

}
router.get('/', function (_req, _res) {
  _res.send('home').status(200);
});
router.get('api/users', (_req, _res) => {
  _res.send(201)
});
router.get('api/users?id', (_req, _res, _next) => {
  
});
router.get('api/users/blocked',(_req, _res) => {
  
});
router.post('api/users', (_req, _res) => {
  
});
router.put('api/users',(_req, _res) => {
  
});
router.delete('api/users',(_req, _res) => {
  
});


export default router ;
