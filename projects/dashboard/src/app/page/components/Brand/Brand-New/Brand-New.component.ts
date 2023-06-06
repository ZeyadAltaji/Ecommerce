import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Brands } from 'projects/dashboard/src/app/Classes/Brands';
import { IUser } from 'projects/dashboard/src/app/Models/IUser';
import { BrandsService } from 'projects/dashboard/src/app/services/Brands.service';
import { SweetAlertService } from 'projects/dashboard/src/app/services/SweetAlert.service';

@Component({
  selector: 'app-Brand-New',
  templateUrl: './Brand-New.component.html',
  styleUrls: ['./Brand-New.component.css'],
})
export class BrandNewComponent implements OnInit {
  NewBrandForm!: FormGroup;
  Brand = new Brands();
  Image = { name: '', image: null };
  formData: FormData = new FormData();
  loggedInUser: any;
  public user: IUser | undefined;
  @ViewChild('imageInput') imageInput?: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private brandsService: BrandsService,
    private sweetAlertService: SweetAlertService,
    @Inject(CookieService) private cookieServices: CookieService
  ) {
    this.createForm();
  }

  createForm() {
    this.NewBrandForm = this.fb.group({
      name: ['', Validators.required],
      Image: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    const userString = this.cookieServices.get('loggedInUser');
    this.loggedInUser = userString ? JSON.parse(userString) : null;
    if (this.loggedInUser && this.loggedInUser.fullUser) {
      this.user = this.loggedInUser.fullUser;
    }
    this.NewBrandForm = this.fb.group({
      NameBrand: [
        null,
        [Validators.required, Validators.pattern('[a-zA-Z ]*')],
      ],
      Image: [null],
      isActive: false,
    });
  }
  OnSubmit() {
    debugger;
    if (this.loggedInUser && this.loggedInUser.fullUser) {
      const adminId = this.loggedInUser.fullUser.id; // Get the adminid from the logged-in user
      const username = this.loggedInUser.fullUser.userName; // Get the adminid from the logged-in user
      this.MapBrands(adminId, username); // Pass the adminid to the MapBrands method
      if (
        this.NewBrandForm.valid ||
        this.NewBrandForm.value.NameBrand.trim() === ''
      ) {
        this.brandsService.AddBrands(this.formData).subscribe(
          (data) => {
            this.sweetAlertService.success(
              'Success',
              'Brand added successfully.'
            );
            this.router.navigate(['/Brand']);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }
  AddNewBrandForm() {
    this.NewBrandForm = this.fb.group({
      NameBrand: [
        null,
        [Validators.required, Validators.pattern('[a-zA-Z ]*')],
      ],
      Image: new FormControl(null),
      isActive: false,
    });
  }
  get _NameBrand() {
    return this.NewBrandForm.controls['NameBrand'] as FormControl;
  }
  get iamgebr() {
    return this.NewBrandForm.controls['Image_BrandUrl'] as FormControl;
  }
  get _isActive() {
    return this.NewBrandForm.controls['isActive'] as FormControl;
  }
  MapBrands(adminId: number, UserCreate: string) {
    debugger;
    this.formData = new FormData();
    this.formData.append('Name', this._NameBrand.value);
    let imageFile = this.imageInput?.nativeElement.files[0];
    this.formData.append('Image_BrandUrl', imageFile);
    this.formData.append('Admin_Id', adminId.toString());
    this.formData.append('UserCreate', UserCreate);
    this.formData.append('isActive', this._isActive.value.toString());
  }

  HandleFile(event: any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      const image_userUrl = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgElement = document.getElementById('image') as HTMLImageElement;
        if (imgElement && e.target) {
          imgElement.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(image_userUrl);
    } else {
    }
  }
}
