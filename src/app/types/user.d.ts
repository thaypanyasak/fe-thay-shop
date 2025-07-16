export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  // // thêm trường nếu cần như:
  // avatarUrl?: string;
  // phone?: string;
  // ...
}
