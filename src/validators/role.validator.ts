import { z } from "zod";

export const createRoleSchema = z.object({
  role: z.string().min(4),
  description: z.string().optional(),
  active: z.boolean().optional(),
  permissions: z.never().optional(),
  isSystem: z.never().optional(),
  createdAt: z.never().optional()
});

export const updateRoleSchema = z.object({
  description: z.string().optional(),
  active: z.boolean().optional(),
  role: z.never().optional(),
  permissions: z.never().optional(),
  isSystem: z.never().optional()
});
