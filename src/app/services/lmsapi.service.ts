import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { Book, Category, Order, User } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class LmsApiService {
  baseUrl = 'https://localhost:7038/api/';
  constructor(private http: HttpClient, private jwt: JwtHelperService) {}

  createAccount(user: User) {
    return this.http.post(this.baseUrl + 'CreateAccount', user, {
      responseType: 'text',
    });
  }

  login(loginInfo: any) {
    let params = new HttpParams()
      .append('email', loginInfo.email)
      .append('password', loginInfo.password);
    return this.http.get(this.baseUrl + 'Authenticate/Login', {
      params: params,
      responseType: 'text',
    });
  }

  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  deleteToken() {
    localStorage.removeItem('access_token');
    location.reload();
  }

  getTokenUserInfo(): User | null {
    if (!this.isLoggedIn()) return null;
    let token = this.jwt.decodeToken();
    let user: User = {
      id: token.id,
      firstName: token.firstName,
      lastName: token.lastName,
      email: token.email,
      mobile: token.mobile,
      department: token.department,
      university: token.university,
      logoPath: token.logoPath,
      password: '',
      isBlocked: token.isBlocked.toLowerCase() === 'true',
      isActive: token.isActive.toLowerCase() === 'true',
      addedOn: token.createdAt,
      fine: 0,
      userType: token.userType,
    };
    return user;
  }

  getAllBooks() {
    return this.http.get<Book[]>(this.baseUrl + 'Book/GetAllBooks');
  }

  orderBook(userId: number, bookId: number) {
    return this.http.get(this.baseUrl + 'OrderBook/' + userId + '/' + bookId, {
      responseType: 'text',
    });
  }

  getOrdersOfUser(userid: number) {
    return this.http.get<Order[]>(this.baseUrl + 'GetOrders/' + userid);
  }

  getAllOrders() {
    return this.http.get<Order[]>(this.baseUrl + 'GetAllOrders');
  }

  returnBook(bookId: string, userId: string) {
    return this.http.get(this.baseUrl + 'ReturnBook/' + bookId + '/' + userId, {
      responseType: 'text',
    });
  }

  getAllUsers() {
    return this.http.get<User[]>(this.baseUrl + 'GetAllUsers').pipe(
      map((users) =>
        users.map((user) => {
          let temp: User = user;
          temp.userType = user.userType;
          return temp;
        })
      )
    );
  }

  blockUser(id: number) {
    return this.http.get(this.baseUrl + 'ChangeBlockStatus/1/' + id, {
      responseType: 'text',
    });
  }

  unblockUser(id: number) {
    return this.http.get(this.baseUrl + 'ChangeBlockStatus/0/' + id, {
      responseType: 'text',
    });
  }

  enableUser(id: number) {
    return this.http.get(this.baseUrl + 'ChangeEnableStatus/1/' + id, {
      responseType: 'text',
    });
  }

  disableUser(id: number) {
    return this.http.get(this.baseUrl + 'ChangeEnableStatus/0/' + id, {
      responseType: 'text',
    });
  }

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl + 'Category/GetAllCategories');
  }

  insertBook(book: any) {
    return this.http.post(this.baseUrl + 'Library/InsertBook', book, {
      responseType: 'text',
    });
  }

  deleteBook(id: number) {
    return this.http.delete(this.baseUrl + 'Library/DeleteBook/' + id, {
      responseType: 'text',
    });
  }

  insertCategory(category: string, userid: number) {
    return this.http.post(
      this.baseUrl + 'Category/InsertCategory',
      { name: category, userId: userid },
      { responseType: 'text' }
    );
  }
}
