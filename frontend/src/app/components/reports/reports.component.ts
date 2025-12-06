import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container page">
      <div class="card">
        <h1 id="reportsChartTitle">Reports — Departmental Impact</h1>
        <figure aria-describedby="reportsChartDesc">
          <svg id="chart2" role="img" aria-label="Departmental bar chart" [attr.width]="'720'" [attr.height]="'360'"></svg>
          <figcaption id="reportsChartDesc">Average time‑to‑report reduction (minutes) by department after AI‑assisted diagnostics rollout.</figcaption>
        </figure>
        <p class="help">This bar chart compares average time‑to‑report reductions (in minutes) across departments—Emergency, Neurology, Cardiology, and Oncology—after adopting AI‑assisted imaging triage. Taller bars indicate greater workflow impact where rapid prioritization matters most. Data is loaded asynchronously from the backend <code>/api/chart2</code> endpoint and is topic‑consistent, hardcoded sample data for this assignment.</p>
        <p class="help" *ngIf="source"><strong>Source:</strong> The citation is supplied by the backend to ensure consistency across pages. Visit <a [href]="source" target="_blank" rel="noopener">{{ source }}</a> for additional domain context.</p>
      </div>
    </div>
  `,
  styles: [
    `.page { max-width: 900px; margin: 1rem auto; padding: 1rem; }`
  ]
})
export class ReportsComponent implements OnInit {
  source = '';
  constructor(private api: ApiService, private el: ElementRef) {}

  ngOnInit() {
    this.api.getChart2().subscribe(data => {
      this.source = data.source;
      const svg = d3.select(this.el.nativeElement).select('#chart2');
      const width = Number(svg.attr('width'));
      const height = Number(svg.attr('height'));
      const margin = { top: 20, right: 20, bottom: 60, left: 60 };
      const innerW = width - margin.left - margin.right;
      const innerH = height - margin.top - margin.bottom;

      const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
      const x = d3.scaleBand().domain(data.labels).range([0, innerW]).padding(0.2);
      const y = d3.scaleLinear().domain([0, d3.max(data.values) || 0]).nice().range([innerH, 0]);

      g.selectAll('rect')
        .data(data.values)
        .enter()
        .append('rect')
        .attr('x', (_d: number, i: number) => x(data.labels[i]) as number)
        .attr('y', (d: number) => y(d))
        .attr('width', x.bandwidth())
        .attr('height', (d: number) => innerH - y(d))
        .attr('fill', '#388e3c');

      const xAxis = d3.axisBottom(x);
      const yAxis = d3.axisLeft(y);
      g.append('g').attr('transform', `translate(0,${innerH})`).call(xAxis)
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-0.5em')
        .attr('dy', '0.15em')
        .attr('transform', 'rotate(-35)');
      g.append('g').call(yAxis);
    });
  }
}
