import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-user-email',
  templateUrl: './confirm-user-email.component.html',
  styleUrls: ['./confirm-user-email.component.css']
})
export class ConfirmUserEmailComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }
  takeMeToLogin(){
    this.router.navigateByUrl(`/userGateway/(userGatewayRouter:login)`);
  }

}
