import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container page">
      <div class="card">
        <h1 id="dashTitle">J31 — Healthcare Innovations Dashboard</h1>
        <section aria-labelledby="summaryTitle">
          <h2 id="summaryTitle">AI‑assisted Imaging Triage (Summary)</h2>
          <p>
            Over the past six months, hospitals have accelerated the deployment of AI‑assisted imaging triage in radiology to reduce time‑to‑report and prioritize urgent studies. These systems analyze incoming scans to flag potential acute findings—such as intracranial hemorrhage or large vessel occlusion—so radiologists and emergency teams can review them first. Early results indicate measurable workflow gains: fewer bottlenecks during peak hours, faster escalation of critical cases, and better routing to subspecialists. Crucially, these tools augment clinical judgment rather than replace it. Models generate triage scores under human oversight, while licensed clinicians retain responsibility for final interpretations. Successful implementations emphasize interoperability with PACS/RIS, audit logging, monitoring, and change‑management to minimize disruption. Governance practices include bias assessment, post‑deployment performance monitoring across diverse populations, and clear failover procedures to maintain safety. Beyond radiology, departments like cardiology and oncology are exploring AI‑supported triage for complex imaging pipelines. When transparently governed and responsibly integrated, AI triage can help health systems deliver faster, safer care in time‑sensitive settings while maintaining accountability and trust.
          </p>
          <p class="help"><strong>Source:</strong> FDA medical devices and AI/ML resources (see: <a href="https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-aiml-enabled-medical-devices" target="_blank" rel="noopener">fda.gov/medical-devices/aiml</a>) and recent peer‑reviewed literature.</p>
        </section>
      </div>
      <div class="card">
        <section aria-labelledby="techTitle">
          <h2 id="techTitle">Technical Overview</h2>
          <p class="help">A concise view of the stack and infrastructure used in J31:</p>
          <ul>
            <li><strong>Frontend:</strong> Angular SPA with route guards, JWT interceptor, responsive cards, and accessible SVG charts via D3.</li>
            <li><strong>Backend:</strong> Node.js (Express) API on port 3000 issuing and validating JWT; hardcoded test credentials per spec.</li>
            <li><strong>Database:</strong> MySQL for persistence (ready for future expansion); environment‑driven connection via <code>.env</code>.</li>
            <li><strong>Security:</strong> Helmet, CORS, and Bearer tokens; login redirects to Dashboard, Logout clears token.</li>
            <li><strong>Deployment:</strong> Ubuntu droplet, NGINX serving Angular on port 80 and proxying <code>/api</code> to backend; PM2 for process persistence.</li>
          </ul>
        </section>
      </div>
    </div>
  `,
  styles: []
})
export class DashboardComponent {}
