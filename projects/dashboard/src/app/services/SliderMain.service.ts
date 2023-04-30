import { Injectable } from '@angular/core';
import { Environment } from '../Environments/Environments';
import { HttpClient } from '@angular/common/http';
import { ISiderMain } from '../Models/ISiderMain';
import { SiderMain } from '../Classes/SiderMain';

@Injectable({
  providedIn: 'root'
})
export class SliderMainService {

  baseUrl =Environment.baseUrl;
  constructor( private http: HttpClient) { }
  listSider:ISiderMain[]=[];

  AddSiderMain(formData: FormData){
    return this.http.post(`${this.baseUrl}Slider`,formData);
  }
  GetAllSiderMain(){
    return this.http.get<SiderMain>(`${this.baseUrl}Slider/AllSlider`);
  }

  GetByIdModal(id:number){
    return this.http.get<SiderMain>(`${this.baseUrl}Slider/Sliders/${id}`.toString()).pipe()
  }
  UpdateSiderMain(formData:FormData){
    return this.http.put<SiderMain>(`${this.baseUrl}Slider/Sliders/update/`,formData);
  }
  DeleteSiderMain(id: number){
    return this.http.put<SiderMain>(`${this.baseUrl}Slider/Slider/Delete/` + id.toString(), {});
  }
  GetByIDslider(id:string){
    return this.http.get<SiderMain>(`${this.baseUrl}Slider/Sliders/`+id.toString())
  }
}
