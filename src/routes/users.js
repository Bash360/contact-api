import express from 'express';
const router = express.Router();



router.get('/', function(_req, _res,_next) {
  _res.send('home').status(200);
});
router.get('api/users', (_req, _res,_next) => {
  _res.send(201)
});
router.get('api/users?id');
router.get('api/users/blocked');
router.post('api/users');
router.put('api/users');
router.delete('api/users');


export default router ;
