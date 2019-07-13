import express  from 'express';

const router = express();
/* GET home page. */
router.get('/', function (_req, _res, _next) {
  _res.render('index', { title: 'Express' });
});

export default router ;
