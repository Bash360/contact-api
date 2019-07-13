import express from 'express';
const router = express.Router();



router.get('/', function(_req, _res,_next) {
  _res.send('home').status(200);
});
router.get('api/users', (_req, _res,_next) => {
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
