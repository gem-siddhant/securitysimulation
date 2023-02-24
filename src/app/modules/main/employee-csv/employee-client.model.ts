export interface EmployeeCsv {
  name: string;
  email: string;
  employeeId: string;
  manager: string;
  department: string;
}

export interface CommonSimulationCourseDetails {
  name: string;
  time: string;
  status: string;
}
export interface SimulationDetails extends CommonSimulationCourseDetails {
  date: string;
}
export interface CourseDetails extends CommonSimulationCourseDetails {
  assignedDate: string;
  completionDate: string;
  courseScore: number;
}
export interface ClientDetails {
  contact: string;
  courses: CourseDetails[];
  designation: string;
  employeeId: string;
  manager: string;
  officialMailId: string;
  simulation: SimulationDetails[];
}
export interface EmployeeExcelData {
  contactNumber: number;
  department: string;
  designation: string;
  firstName: string;
  lastName: string;
  managerId: number;
  username: string;
}
export interface UpdateEmployeeCsv{
  email : string;
  employeeDetails : EmployeeExcelData[];
}
