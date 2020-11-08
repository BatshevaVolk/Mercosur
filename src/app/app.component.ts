import { Component, OnInit } from '@angular/core';
import { UserLoginI } from './Models/user-login.model';
import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'Mercosur';
  ngOnInit(){
    this.appService.user = new UserLoginI();
  }
  constructor(
    public appService:AppService,
    private authService:AuthService
  ) { }
  onLogout(){
    this.authService.LogOut();  
  }
}

