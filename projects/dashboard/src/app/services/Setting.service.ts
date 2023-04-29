import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../Environments/Environments';
import { Observable } from 'rxjs';
import { ISiderMain } from '../Models/ISiderMain';
import { SiderMain } from '../Classes/SiderMain';
import { ISiderSub } from '../Models/ISiderSub';
import { SiderSub } from '../Classes/SiderSub';
import { ISetting } from '../Models/ISetting';
import { Setting } from '../Classes/Setting';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  dataList:ISetting[]=[];

   baseUrl =Environment.baseUrl;
   constructor( private http: HttpClient) { }
//main silder

   AddSiderMain(formData: FormData){
    return this.http.post(`${this.baseUrl}Slider`,formData);
  }
  GetAllSiderMain():Observable<ISiderMain[]>{
    return this.http.get<ISiderMain[]>(`${this.baseUrl}Slider/AllSlider`).pipe()
  }


  UpdateSiderMain(formData:FormData){
    return this.http.put<SiderMain>(`${this.baseUrl}Slider/Sliders/update/`,formData);
  }
  DeleteSiderMain(id: number){
    return this.http.put<SiderMain>(`${this.baseUrl}SliderSlider/Delete/` + id.toString(), {});
  }
  // sub silder
  AddSiderSub(formData: FormData){
    return this.http.post(`${this.baseUrl}Slider`,formData);
  }
  GetAllSiderSub():Observable<ISiderSub[]>{
    return this.http.get<ISiderSub[]>(`${this.baseUrl}Slider/AllSlider`).pipe()
  }
  DeleteSiderSub(id: number){
    return this.http.put<SiderSub>(`${this.baseUrl}SliderSlider/Delete/` + id.toString(), {});
  }
  GetLogo():Observable<ISetting[]>{
    return this.http.get<ISetting[]>(`${this.baseUrl}Setting/Getlogo`).pipe()
  }
  UpdateLogo(formData:FormData){
    return this.http.put<Setting>(`${this.baseUrl}Setting/update/`,formData).pipe();
  }
  GetByIdModal(id:number){
    return this.http.get<Setting>(`${this.baseUrl}Setting/logo/${id}`.toString()).pipe()
  }
  GetByIDlogo(id:number){
    return this.http.get<ISetting>(`${this.baseUrl}Setting/logo/${1}`.toString()).pipe()
  }
}
