import {Router} from 'express'
import * as productCtrl from '../controllers/product.Controller'
import {authJwt} from '../middlewares/index'

const router = Router();

router.post('/', authJwt.verifyToken, productCtrl.createProduct);

router.get('/', authJwt.verifyToken, productCtrl.getProduct);

router.get('/:productId', authJwt.verifyToken, productCtrl.getProductById);

router.put('/:productId', authJwt.verifyToken, productCtrl.updateProductById);

router.delete('/:productId', authJwt.verifyToken, productCtrl.deleteProductById);

export default router;