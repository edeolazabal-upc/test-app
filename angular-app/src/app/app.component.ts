import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  records: any[] = [];
  newRecord = { name: '', description: '' };

  private API_URL = 'http://localhost:8080/api/records';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords(): void {
    this.http.get<any[]>(this.API_URL).subscribe(data => {
      this.records = data;
    });
  }

  addRecord(): void {
    this.http.post(this.API_URL, this.newRecord).subscribe(() => {
      this.getRecords();
      this.newRecord = { name: '', description: '' };
    });
  }
}