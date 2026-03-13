/** Internal domain model for an employee — includes all fields, not all exposed via API. */
export interface Employee {
  id: string;
  name: string;
  title: string;
  department: string;
  skillsets: string[];
  yearsExperience: number;
  location: string;
}
