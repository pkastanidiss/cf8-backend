import { Router } from "express";
import * as noteCtrl from "../controllers/note.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validateObjectId } from "../middlewares/validateObjectId.middleware";
import {validate} from '../middlewares/validate.middleware';
import { createNoteSchema, updateNoteSchema } from "../validators/note.validator";

const router = Router();

router.get("/", noteCtrl.list);
router.get("/:id", validateObjectId('id'), noteCtrl.getById);
router.post("/", authenticate, validate(createNoteSchema), noteCtrl.create);
router.put('/:id', authenticate, validateObjectId('id'), validate(updateNoteSchema), noteCtrl.update);
router.delete("/:id", authenticate, validateObjectId('id'), noteCtrl.remove);

export default router;
