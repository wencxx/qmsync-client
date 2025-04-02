import { z } from "zod";

export const addingControlFormSchema = z.object({
  formId: z.string().nonempty({ message: "Form ID is required" }),
  formName: z.string().nonempty({ message: "Form name is required" }),
  dueDate: z.string().nonempty({ message: "Due date is required" }),
  file: z.instanceof(File, { message: "A valid file is required" }),
  roles: z.array(z.string()).nonempty({ message: "At least one role must be assigned" }),
});