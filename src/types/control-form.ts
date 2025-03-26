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
  placeholders: string[],
  fileUrl: string,
  __v: number
}

export interface ControlForm3 {
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

