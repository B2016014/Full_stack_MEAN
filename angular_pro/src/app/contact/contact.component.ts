import { Component, OnInit ,ViewChild} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import{Observable} from 'rxjs';
import { flyInOut } from '../animations/app.animations';
import { FeedbackService } from '../services/feedback.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut()
    ]
})
export class ContactComponent implements OnInit {
  
  feedbackForm: UntypedFormGroup;
  feedback: Feedback;

  contactType = ContactType;
  errMess: string;
  isLoading: boolean;
  isShowingResponse: boolean;
  @ViewChild('fform') feedbackFormDirective:NgForm;
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };
  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  

  constructor(private fb: UntypedFormBuilder,
    private FeedbackService: FeedbackService) {
    this.createForm();
    this.isLoading = false;
    this.isShowingResponse = false;
  }

  ngOnInit(): void {
  }
  
 
  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();// reset validation messages now
  }
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field  in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field as keyof typeof this.formErrors] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field as keyof typeof control.errors];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field as keyof typeof this.formErrors] += messages[key as keyof typeof messages] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.isLoading = true;
    this.feedback = this.feedbackForm.value;
    this.FeedbackService.submitFeedback(this.feedback)
    .subscribe(feedback => 
      {this.feedback = feedback;console.log(feedback)},
      errmess => {
        this.feedback = null as any;
        this.errMess = <any>errmess;
      },
      () => {
        this.isShowingResponse = true;
        setTimeout(() => {
            this.isShowingResponse = false;
            this.isLoading = false;
          } , 5000
        );
      }
    );
    this.feedbackFormDirective.resetForm();
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    
  }

}