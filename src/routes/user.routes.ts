import {Router} from "express";
import * as userCtrl from '../controllers/user.controller';
import {validate} from '../middlewares/validate.middleware';
import { createUserSchema, updateUserSchema } from '../validators/user.validator';
import { validateObjectId } from "../middlewares/validateObjectId.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { hasAdminRole } from "../middlewares/user.middleware";

const router = Router();

/**
 * @openapi
 * /users:
 *  get:
 *    summary: list of all users
 *    tags: [Users]
 *    security: 
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Response list of users
 */
router.get("/", authenticate, hasAdminRole, userCtrl.list);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: User not found
 */
router.get('/:id', validateObjectId('id'), userCtrl.getOne);

/**
 * @openapi
 * /users:
 *  post:
 *    summary: Creates a user
 *    tags: [Users]
 *    security: 
 *    - bearerAuth: []
 *    requestBody:
 *      required: true 
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *              firstname:
 *                type: string
 *              lastname:
 *                type: string
 *              email:
 *                type: string
 *    responses:
 *      201: 
 *        description: User created
 */
router.post("/", authenticate, validate(createUserSchema), userCtrl.create);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
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
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.put('/:id', authenticate, validate(updateUserSchema), validateObjectId('id'), userCtrl.update);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
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
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.delete('/:id', authenticate, validateObjectId('id'), userCtrl.remove);

export default router;