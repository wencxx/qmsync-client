import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const addingControlFormSchema = z.object({
  formId: z.string().nonempty({ message: "Form ID is required" }),
  formName: z.string().nonempty({ message: "Form name is required" }),
  dueDate: z
    .string()
    .nonempty({ message: "Due date is required" })
    .refine((val) => {
      const inputDate = new Date(val);
      inputDate.setHours(0, 0, 0, 0); 
      return inputDate > today;
    }, {
      message: "Past dates are not allowed for the due date.",
    }),
  file: z.instanceof(File, { message: "A valid file is required" }),
  roles: z.array(z.string()).nonempty({ message: "At least one role must be assigned" }),
});