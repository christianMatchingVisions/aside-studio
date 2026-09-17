import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="17 September 2026" current="/privacy" intro="How Astudio Gaming handles personal data on this website.">
      <h2>1. Who we are</h2>
      <p>
        This website is operated by Astudio Gaming (&quot;Astudio&quot;, &quot;we&quot;, &quot;us&quot;), {site.address.lines.join(", ")}. We are the data controller for personal data collected through this site. You can reach us at <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>2. What we collect</h2>
      <p>This is a business-to-business showcase website. We do not offer accounts, deposits or gameplay here. We collect:</p>
      <ul>
        <li><strong>Correspondence.</strong> If you email or call us, we keep your name, contact details and the content of the conversation so we can respond and follow up.</li>
        <li><strong>Aggregated analytics.</strong> We use Vercel Web Analytics, which records page views and general device, browser and country information without cookies and without identifying individual visitors.</li>
        <li><strong>Technical logs.</strong> Our hosting provider records request data such as IP address and user agent for security and reliability, retained for a limited period.</li>
      </ul>

      <h2>3. Why we process it</h2>
      <ul>
        <li>To respond to enquiries and manage business relationships (legitimate interest, or steps prior to a contract).</li>
        <li>To understand how the website is used and improve it (legitimate interest).</li>
        <li>To keep the site secure and comply with legal obligations.</li>
      </ul>

      <h2>4. Sharing</h2>
      <p>
        We share data only with service providers who help us run this website (hosting and analytics), with professional advisers, and where required by law. We do not sell personal data. Where providers process data outside the EEA, transfers rely on adequacy decisions or standard contractual clauses.
      </p>

      <h2>5. Retention</h2>
      <p>Correspondence is kept for as long as needed to manage the relationship and then for up to 3 years after the last contact, unless a longer period is required by law.</p>

      <h2>6. Your rights</h2>
      <p>
        Under the GDPR you may request access to, correction or deletion of your personal data, object to or restrict processing, and request portability. Contact <a href={`mailto:${site.email}`}>{site.email}</a>. You also have the right to lodge a complaint with the Information and Data Protection Commissioner in Malta or your local supervisory authority.
      </p>

      <h2>7. Third-party content</h2>
      <p>
        Videos on this site are embedded from YouTube in privacy-enhanced mode and only load when you press play. Once loaded, YouTube (Google) may process data under its own privacy policy.
      </p>

      <h2>8. Changes</h2>
      <p>We may update this policy from time to time. The date at the top shows when it last changed.</p>
    </LegalPage>
  );
}
