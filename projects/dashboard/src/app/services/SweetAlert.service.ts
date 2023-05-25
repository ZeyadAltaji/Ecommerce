 import { Injectable } from '@angular/core';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {
 constructor() { }
success(title:string,text:string){
  swal({
    title: (title),
    text: (text),
    icon: "success",
   });
}
warning(title: string, text: string ){
  return swal({
    title: title,
    text: text,
    icon: "warning",
    dangerMode: true,
  });
}
Delete( )
{
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "error",
     dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your imaginary file is safe!");
    }
  });
} error(title: string, message: string) {
  swal({
    icon: 'error',
    title: title,
    text: message
  });
}


}
