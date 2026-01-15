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
router.post("/",  userCtrl.create);
router.put('/:id', authenticate, validate(updateUserSchema), validateObjectId('id'), userCtrl.update);
router.delete('/:id', authenticate, validateObjectId('id'), userCtrl.remove);

export default router;