import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../Environments/Environments';
import { SiderSub } from '../Classes/SiderSub';

@Injectable({
  providedIn: 'root'
})
export class SiderSubService {
  baseUrl =Environment.baseUrl;

constructor( private http: HttpClient) { }


  AddSiderMain(formData: FormData){
    return this.http.post(`${this.baseUrl}Sub_Slider`,formData);
  }
  GetAllSiderMain(){
    return this.http.get<SiderSub>(`${this.baseUrl}Sub_Slider/AllSub_Slider`);
  }

  GetByIdModal(id:number){
    return this.http.get<SiderSub>(`${this.baseUrl}Sub_Slider/Sub_Sliders/${id}`.toString()).pipe()
  }
  UpdateSiderMain(formData:FormData){
    return this.http.put<SiderSub>(`${this.baseUrl}Sub_Slider/Sub_Sliders/update/`,formData);
  }
  DeleteSiderMain(id: number){
    return this.http.put<SiderSub>(`${this.baseUrl}Sub_Slider/Delete/` + id.toString(), {});
  }
  GetByIDslider(id:string){
    return this.http.get<SiderSub>(`${this.baseUrl}Sub_Slider/Sub_Sliders/`+id.toString())
  }

  GetByIdnumber(id:number){
    return this.http.get<SiderSub>(`${this.baseUrl}Sub_Slider/Sub_Sliders/${id}`.toString()).pipe()
  }
}
