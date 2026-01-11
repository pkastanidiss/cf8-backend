import { Router } from "express";
import * as noteCtrl from "../controllers/note.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validateObjectId } from "../middlewares/validateObjectId.middleware";
import {validate} from '../middlewares/validate.middleware';
import { createNoteSchema, updateNoteSchema } from "../validators/note.validator";

const router = Router();

router.get("/", noteCtrl.list);
router.post("/", authenticate, validate(createNoteSchema), noteCtrl.create);
router.put('/:id', authenticate, validate(updateNoteSchema), validateObjectId('id'), noteCtrl.update);
router.delete("/:id", authenticate, validateObjectId('id'), noteCtrl.remove);

export default router;
