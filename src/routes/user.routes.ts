import {Router} from "express";
import * as userCtrl from '../controllers/user.controller';


const router = Router();

router.get("/", userCtrl.list);
router.post("/", userCtrl.getOne);
router.get("/", userCtrl.list);
router.put('/:id', userCtrl.update);
router.delete('/:id', userCtrl.remove);

export default router;