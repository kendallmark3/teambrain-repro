/** API response contract — intentionally omits internal fields like yearsExperience and location. */
export interface EmployeeDTO {
  id: string;
  name: string;
  title: string;
  department: string;
  skillsets: string[];
}
