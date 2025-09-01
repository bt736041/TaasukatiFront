import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericService<TModel, TDto>{
  protected baseUrl: string;

  constructor(protected http: HttpClient, endpoint: string) {
      this.baseUrl = `api/${endpoint} ;`
  }


  getAll(): Observable<TModel[]> {
      return this.http.get<TModel[]>(this.baseUrl);
  }

  getById(id: number): Observable<TModel> {
      return this.http.get<TModel>(`${this.baseUrl}/${id}`);
  }
  getByIdAndAnotherParam(id:number, param:any):Observable<TModel>{
      return this.http.get<TModel>(`${this.baseUrl}/${id},${param}`);
  }

  create(dto: TDto): Observable<TModel> {
      return this.http.post<TModel>(this.baseUrl, dto);
  }

  update(id: number, dto: TDto): Observable<TModel> {
      return this.http.put<TModel>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
