import { z } from "zod";

export const registerSchema = z.object({
    firstName: z.string()
        .min(2, { message: "First name must be at least 2 characters" })
        .max(50, { message: "First name must not exceed 50 characters" }),

    middleName: z.string().optional(),

    lastName: z.string()
        .min(2, { message: "Last name must be at least 2 characters" })
        .max(50, { message: "Last name must not exceed 50 characters" }),

    suffix: z.string().optional(),

    idNumber: z.string()
        .min(5, { message: "ID number must be at least 5 characters" })
        .max(50, { message: "ID number must not exceed 50 characters" }),

    email: z.string()
        .email({ message: "Invalid email format" })
        .regex(/^[a-zA-Z0-9._%+-]+@slu\.edu\.ph$/, { message: "Email must be from @slu.edu.ph domain" }),

    number: z.string()
        .min(10, { message: "Phone number must be at least 10 digits" })
        .max(15, { message: "Phone number must not exceed 15 digits" })
        .regex(/^\d+$/, { message: "Phone number must contain only digits" }),

    username: z.string()
        .min(6, { message: "Username must be at least 6 characters" })
        .max(15, { message: "Username must not exceed 15 characters" }),

    position: z.string()
        .min(3, { message: "Position must be at least 3 characters" })
        .max(50, { message: "Position must not exceed 50 characters" }),

    role: z.string()
        .min(4, { message: "Role must be at least 10 characters" })
        .max(50, { message: "Role must not exceed 50 characters" }),

    department: z.string()
        .min(15, { message: "Department must be at least 15 characters" })
        .max(50, { message: "Department must not exceed 50 characters" }),

    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(50, { message: "Password must not exceed 50 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter (A-Z)" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter (a-z)" })
        .regex(/[0-9]/, { message: "Password must contain at least one number (0-9)" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character (!@#$%^&*)" }),

    confirmPass: z.string()
}).refine((data) => data.password === data.confirmPass, {
    message: "Passwords do not match",
    path: ["confirmPass"],
});
