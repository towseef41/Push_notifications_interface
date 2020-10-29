import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/apiServices/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-send-notifications',
  templateUrl: './send-notifications.component.html',
  styleUrls: ['./send-notifications.component.scss'],
})
export class SendNotificationsComponent {
  notiFicationForm: FormGroup;
  spinner: boolean;
  role: string;
  hide = true;
  errorMsg: string;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private toast: ToastrService
  ) {
    this.notiFicationForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });
  }

  sendMessage() {
    if (this.notiFicationForm.invalid) {
      this.notiFicationForm.markAllAsTouched();
      return;
    }
    this.spinner = true;
    this.apiService.sendMessage(this.notiFicationForm.value).subscribe(
      (data: any) => {
        this.spinner = false;
        this.toast.success('Notification Sent Sucessfully');
      },
      (error) => {
        this.spinner = false;
        console.error(error.error.Message);
        this.errorMsg = error.error.Message;
      }
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
