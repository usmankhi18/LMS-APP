export interface SideNavItem {
  title: string;
  link: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  department: string;
  university: string;
  logoPath: string;
  password: string;
  isBlocked: boolean;
  isActive: boolean;
  addedOn: string;
  userType: string;
  fine: number;
}

export interface Book {
  id: number;
  title: string;
  category: string;
  subCategory: string;
  price: number;
  available: boolean;
  count?: number;
  author: string;
}

export interface CategoryBooks {
  category: string;
  subCategory: string;
  books: Book[];
}

export interface Order {
  id: number;
  userid: number;
  name: string;
  bookid: number;
  booktitle: string;
  orderedon: string;
  returned: boolean;
}

export interface Category {
  name: string;
  children?: Category[];
}
