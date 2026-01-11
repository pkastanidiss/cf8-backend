import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),

  author: z.never().optional()
});

export const updateNoteSchema = createNoteSchema.partial();
