import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Cookie policy" };

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie policy" updated="17 September 2026" current="/cookies" intro="Short version: this site does not set tracking cookies.">
      <h2>1. Cookies we use</h2>
      <p>We designed this site to run without tracking cookies, which is why there is no cookie banner.</p>
      <ul>
        <li>
          <strong>Analytics.</strong> Vercel Web Analytics measures visits using a privacy-friendly hash that is not stored as a cookie and cannot identify you across sites.
        </li>
      </ul>

      <h2>2. Third-party cookies</h2>
      <p>
        Video is embedded from YouTube using the privacy-enhanced <code>youtube-nocookie.com</code> domain and only loads after you press play. After that, YouTube may set its own cookies according to Google&apos;s policies.
      </p>

      <h2>3. Managing cookies</h2>
      <p>You can clear local storage and cookies at any time through your browser settings.</p>
    </LegalPage>
  );
}
