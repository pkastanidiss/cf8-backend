import { Router } from "express";
import * as noteCtrl from "../controllers/note.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validateObjectId } from "../middlewares/validateObjectId.middleware";
import {validate} from '../middlewares/validate.middleware';
import { createNoteSchema, updateNoteSchema } from "../validators/note.validator";

const router = Router();

/**
 * @openapi
 * /notes:
 *   get:
 *     summary: List all notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: List of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 */
router.get("/", noteCtrl.list);

/**
 * @openapi
 * /notes/{id}:
 *   get:
 *     summary: Get note by ID
 *     tags: [Notes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Note found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Note not found
 */
router.get("/:id", validateObjectId('id'), noteCtrl.getById);

/**
 * @openapi
 * /notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNote'
 *     responses:
 *       201:
 *         description: Note created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticate, validate(createNoteSchema), noteCtrl.create);

/**
 * @openapi
 * /notes/{id}:
 *   put:
 *     summary: Update note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateNote'
 *     responses:
 *       200:
 *         description: Note updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
 */
router.put('/:id', authenticate, validateObjectId('id'), validate(updateNoteSchema), noteCtrl.update);

/**
 * @openapi
 * /notes/{id}:
 *   delete:
 *     summary: Delete note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Note deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
 */
router.delete("/:id", authenticate, validateObjectId('id'), noteCtrl.remove);

export default router;
