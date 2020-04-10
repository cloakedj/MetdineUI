import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }
  takeMeToLogin(){
    this.router.navigateByUrl(`/userGateway/(userGatewayRouter:login)`);
  }

}
