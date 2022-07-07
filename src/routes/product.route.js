import {Router} from 'express'
import * as productCtrl from '../controllers/product.Controller'
const router = Router();

router.post('/', productCtrl.createProduct);

router.get('/', productCtrl.getProduct);

router.get('/:productId', productCtrl.getProductById);

router.put('/:productId', productCtrl.updateProductById);

router.delete('/:productId', productCtrl.deleteProductById);

export default router;