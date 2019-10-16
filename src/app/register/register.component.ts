import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auththenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
    ) {
      //redirect to home if already logged in
      if(this.auththenticationService.currentUserValue) {
        this.router.navigate(['/']);
      }
    }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lasyName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRepear: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  //convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  activate(route: ActivatedRouteSnapshot, state: RouterSnapshot) {
    return true;
  }

  onSubmit() {
    this.submitted = true;

    //stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful',
          true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

}
