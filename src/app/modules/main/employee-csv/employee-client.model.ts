export interface EmployeeCsv {
  name: string;
  email: string;
  employeeId: string;
  manager: string;
  department: string;
}
export interface CourseDetails {
  id: number;
  courseName: string;
  courseTime: string;
  assignedDate: string;
  completionDate: string;
  courseScore: number;
  status: string;
}

export interface SimulationDetails{
  name: string;
  date: string;
  time: string;
  status: string;
}
