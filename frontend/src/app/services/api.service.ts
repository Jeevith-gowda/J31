import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_BASE = 'http://localhost:3000';

export interface ChartResponse {
  title: string;
  unit: string;
  labels: string[];
  values: number[];
  source: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  getChart1() {
    return this.http.get<ChartResponse>(`${API_BASE}/api/chart1`);
  }
  getChart2() {
    return this.http.get<ChartResponse>(`${API_BASE}/api/chart2`);
  }
  health() {
    return this.http.get(`${API_BASE}/api/health`);
  }
}
