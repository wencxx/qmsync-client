import { columns } from "@/components/data-table/columns/form-control-columns"
import { DataTable } from "@/components/data-table/data-table"
import type { ControlForm } from "@/types/control-form"

const mockForms: ControlForm[] = [
  {
    id: 1,
    formId: "CF-2023-001",
    formName: "Safety Inspection Report",
    dueDate: "2023-03-18T14:45:00Z",
    completedDate: "2023-03-15T10:30:00Z",
    status: "Completed",
    department: "Operations",
    version: "1.2",
  },
  {
    id: 2,
    formId: "CF-2023-002",
    formName: "Equipment Maintenance Checklist",
    dueDate: "2023-03-18T14:45:00Z",
    completedDate: "2023-03-18T14:45:00Z",
    status: "Completed",
    department: "Maintenance",
    version: "2.0",
  },
  {
    id: 3,
    formId: "CF-2023-003",
    formName: "Incident Report Form",
    dueDate: "2023-03-18T14:45:00Z",
    completedDate: "2023-03-20T09:15:00Z",
    status: "Completed",
    department: "Safety",
    version: "1.0",
  },
  {
    id: 4,
    formId: "CF-2023-004",
    formName: "Quality Control Inspection",
    dueDate: "2023-03-18T14:45:00Z",
    completedDate: "2023-03-22T11:00:00Z",
    status: "Completed",
    department: "Quality Assurance",
    version: "3.1",
  },
  {
    id: 5,
    formId: "CF-2023-005",
    formName: "Employee Training Record",
    dueDate: "2023-03-18T14:45:00Z",
    completedDate: "2023-03-25T13:30:00Z",
    status: "Completed",
    department: "HR",
    version: "1.5",
  },
  {
    id: 6,
    formId: "CF-2023-006",
    formName: "Risk Assessment Form",
    dueDate: "2023-03-18T14:45:00Z",
    completedDate: "2023-03-28T15:20:00Z",
    status: "Completed",
    department: "Safety",
    version: "2.2",
  },
  {
    id: 7,
    formId: "CF-2023-007",
    formName: "Environmental Compliance Checklist",
    dueDate: "2023-03-18T14:45:00Z",
    completedDate: "2023-03-30T10:45:00Z",
    status: "Completed",
    department: "Environmental",
    version: "1.3",
  },
  {
    id: 8,
    formId: "CF-2023-008",
    formName: "IT Security Audit Form",
    dueDate: "2023-03-18T14:45:00Z",
    completedDate: "2023-04-02T09:00:00Z",
    status: "Completed",
    department: "IT",
    version: "2.1",
  },
  {
    id: 9,
    formId: "CF-2023-009",
    formName: "Customer Complaint Form",
    dueDate: "2023-03-18T14:45:00Z",
    completedDate: "2023-04-05T14:15:00Z",
    status: "Completed",
    department: "Customer Service",
    version: "1.0",
  },
  {
    id: 10,
    formId: "CF-2023-010",
    formName: "Supplier Evaluation Form",
    dueDate: "2023-03-18T14:45:00Z",
    completedDate: "2023-04-08T11:30:00Z",
    status: "Completed",
    department: "Procurement",
    version: "2.4",
  },
  {
    id: 11,
    formId: "CF-2023-011",
    formName: "Project Closure Report",
    dueDate: "2023-03-18T14:45:00Z",
    completedDate: "2023-04-10T16:00:00Z",
    status: "Completed",
    department: "Project Management",
    version: "1.1",
  },
  {
    id: 12,
    formId: "CF-2023-012",
    formName: "Vehicle Inspection Form",
    dueDate: "2023-03-18T14:45:00Z",
    completedDate: "2023-04-12T08:45:00Z",
    status: "Completed",
    department: "Fleet Management",
    version: "3.0",
  },
]

function CompletedControlForms() {
  return (
    <>
      <h1 className="font-bold text-2xl">Completed Controlled Forms</h1>
      <DataTable columns={columns} data={mockForms} />
    </>
  );
}

export default CompletedControlForms;