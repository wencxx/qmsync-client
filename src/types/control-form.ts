export interface ControlForm {
  id: number
  formId: string
  formName: string
  dueDate: string
  completedDate: string
  status: string
  department: string
  version: string
}

export interface ControlForm2 {
  _id: string
  formId: string
  formName: string
  dueDate: string
  placeholders: string[]
  filledOut: string[]
  fileUrl: string,
  roles: string[],
  __v: number
}

export interface CompletedControlledForms {
  _id: number
  formId: string
  formName: string
  dueDate: string
  completedDate: Date
  submittedFormId: string
  placeholders: string[]
  createdAt: Date
  _v: string
}

export interface SubmittedForm {
  _id: string
  formId: string
  userId: string
  firstName: string
  lastName: string
  suffix: string
  createdAt: string
  _v: number
}

export interface FacultyFormsLists extends ControlForm2 {
  submittedForm: SubmittedForm
}

