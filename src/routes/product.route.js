import {Router} from 'express'
import * as productCtrl from '../controllers/product.Controller'
import {authJwt} from '../middlewares/index'

const router = Router();

router.post('/', [authJwt.verifyToken, authJwt.isModerate], productCtrl.createProduct);

router.get('/',  productCtrl.getProduct);

router.get('/:productId', authJwt.verifyToken, productCtrl.getProductById);

router.put('/:productId', authJwt.verifyToken, productCtrl.updateProductById);

router.delete('/:productId', [authJwt.verifyToken, authJwt.isModerate], productCtrl.deleteProductById);

export default router;