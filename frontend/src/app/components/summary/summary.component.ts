import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container page">
      <div class="card">
        <h1 id="summaryChartTitle">Summary — Adoption Over Time</h1>
        <figure aria-describedby="summaryChartDesc">
          <svg id="chart1" role="img" aria-label="Monthly adoption rate line chart" [attr.width]="'720'" [attr.height]="'360'"></svg>
          <figcaption id="summaryChartDesc">Monthly adoption rates for AI‑assisted diagnostics in radiology over the last six months.</figcaption>
        </figure>
        <p class="help">This line chart shows monthly adoption rates of AI‑assisted imaging triage in radiology over the last six months. Values represent the percentage of studies triaged by AI before radiologist review, illustrating growth and seasonal variations. Data is retrieved asynchronously from the backend <code>/api/chart1</code> endpoint and reflects topic‑aligned, hardcoded figures suitable for demonstration.</p>
        <p class="help" *ngIf="source"><strong>Source:</strong> The reference URL is provided by the backend for transparency. See <a [href]="source" target="_blank" rel="noopener">{{ source }}</a> for regulatory and background context.</p>
      </div>
    </div>
  `,
  styles: [
    `.page { max-width: 900px; margin: 1rem auto; padding: 1rem; }`
  ]
})
export class SummaryComponent implements OnInit {
  source = '';
  constructor(private api: ApiService, private el: ElementRef) {}

  ngOnInit() {
    this.api.getChart1().subscribe(data => {
      this.source = data.source;
      const svg = d3.select(this.el.nativeElement).select('#chart1');
      const width = Number(svg.attr('width'));
      const height = Number(svg.attr('height'));
      const margin = { top: 20, right: 20, bottom: 40, left: 50 };
      const innerW = width - margin.left - margin.right;
      const innerH = height - margin.top - margin.bottom;

      const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
      const x = d3.scalePoint().domain(data.labels).range([0, innerW]).padding(0.5);
      const y = d3.scaleLinear().domain([0, d3.max(data.values) || 0]).nice().range([innerH, 0]);

      const line = d3.line()
        .x((d: any, i: number) => x(data.labels[i]) as number)
        .y((d: any) => y(Number(d)));

      g.append('path')
        .datum(data.values)
        .attr('fill', 'none')
        .attr('stroke', '#1976d2')
        .attr('stroke-width', 2)
        .attr('d', line as any);

      g.selectAll('circle')
        .data(data.values)
        .enter()
        .append('circle')
        .attr('cx', (d: number, i: number) => x(data.labels[i]) as number)
        .attr('cy', (d: number) => y(d))
        .attr('r', 4)
        .attr('fill', '#1976d2')
        .attr('aria-hidden', 'true');

      const xAxis = d3.axisBottom(x);
      const yAxis = d3.axisLeft(y);
      g.append('g').attr('transform', `translate(0,${innerH})`).call(xAxis);
      g.append('g').call(yAxis);
    });
  }
}
