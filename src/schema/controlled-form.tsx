import { z } from "zod";

export const addingControlFormSchema = z.object({
  formId: z.string(),
  formName: z.string(),
  dueDate: z.string(),
  file: z.instanceof(File, { message: "A valid file is required" })
});