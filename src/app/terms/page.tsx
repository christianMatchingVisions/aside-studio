import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Terms of use" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" updated="17 September 2026" current="/terms" intro="The terms that apply when you use this website.">
      <h2>1. About this site</h2>
      <p>
        This website presents the games and services of Astudio Gaming to business partners, operators and the public. It does not offer gambling services, accounts or real-money play. Our games are distributed exclusively through licensed operators, whose own terms govern any play.
      </p>

      <h2>2. Age</h2>
      <p>The content on this site relates to games intended for adults. You must be at least 18 years old, or the legal age in your jurisdiction if higher, to use this site.</p>

      <h2>3. Intellectual property</h2>
      <p>
        Doof Troop, Quickdraw Royale, Doof Troop Racing, the Astudio name and logo, all characters, artwork, video, text and code on this site are owned by Astudio Gaming or its licensors and protected by copyright and trademark law. You may view the site for your own information but may not copy, redistribute or create derivative works without written permission.
      </p>

      <h2>4. Game information</h2>
      <p>
        Figures such as round length, multipliers and return to player (RTP) are provided for information and may differ between operators, jurisdictions and game versions. Operators should refer to the certified game documentation supplied with each integration.
      </p>

      <h2>5. No warranty</h2>
      <p>The site is provided &quot;as is&quot;. We make reasonable efforts to keep it accurate and available but give no warranty that it will be error-free or uninterrupted.</p>

      <h2>6. Liability</h2>
      <p>To the extent permitted by law, Astudio Gaming is not liable for any indirect or consequential loss arising from use of this site. Nothing in these terms excludes liability that cannot be excluded by law.</p>

      <h2>7. Links</h2>
      <p>Links to third-party sites are provided for convenience. We are not responsible for their content or practices.</p>

      <h2>8. Governing law</h2>
      <p>These terms are governed by the laws of Malta and the courts of Malta have exclusive jurisdiction.</p>

      <h2>9. Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
