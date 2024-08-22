import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from '../../models/task.model';
import { environment } from '../../environments/environments';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public reloadData = new Subject<void>();
  reloadData$ = this.reloadData.asObservable();

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.api_url_endpoint}/task`);
  }

  save(task: FormGroup): Observable<Task> {
    return this.http.post<Task>(`${environment.api_url_endpoint}/task`, task);
  }

  udpate(id: number, task: Task ): Observable<Task> {
    return this.http.put<Task>(`${environment.api_url_endpoint}/task/${id}`, task);
  }

  delete(id: number ): Observable<Task> {
    return this.http.put<Task>(`${environment.api_url_endpoint}/task/delete/${id}`, {});
  }

  refreashTask() {
    this.reloadData.next();
  }
}
