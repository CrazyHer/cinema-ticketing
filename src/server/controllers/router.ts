import Router from '@koa/router';
import login from './login';
import register from './register';
import editprofile from './user/editprofile';
import getfilminfo from './user/getfilminfo';
import gethotfilms from './user/gethotfilms';
import getmyorders from './user/getmyorders';
import getuserinfo from './user/getuserinfo';
import pay from './user/pay';
import refund from './user/refund';
// import getstats from './admin/getstats';

const router = new Router();
router.post('/login', login);
router.post('/register', register);

router.get('/user/getuserinfo', getuserinfo);
router.get('/user/gethotfilms', gethotfilms);
router.post('/user/editprofile', editprofile);
router.get('/user/getfilminfo', getfilminfo);
router.post('/user/pay', pay);
router.get('/user/getmyorders', getmyorders);
router.get('/user/refund', refund);

// router.get('/admin/getstats', getstats);

export default router;
