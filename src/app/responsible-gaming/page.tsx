import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { AgeBadge } from "@/components/layout/Footer";

export const metadata: Metadata = { title: "Responsible gaming" };

export default function ResponsibleGamingPage() {
  return (
    <LegalPage title="Responsible gaming" updated="17 September 2026" current="/responsible-gaming" intro="Our games are entertainment for adults. We build them, and the operators who offer them, with player protection in mind.">
      <div className="mb-8 flex items-center gap-4">
        <AgeBadge className="!border-choc !bg-red" />
        <p className="!mb-0 font-display text-xl font-bold text-ink">For adults aged 18 and over only.</p>
      </div>

      <h2>Our commitments</h2>
      <ul>
        <li>Our games are supplied only to operators licensed in the jurisdictions where they are offered.</li>
        <li>Every game uses certified random number generation and reports outcomes through standard remote game server integrations.</li>
        <li>Game rules, return to player and bet limits are shown clearly within the game client.</li>
        <li>We support operator tools such as deposit limits, session reminders, time-outs and self-exclusion.</li>
      </ul>

      <h2>Play safely</h2>
      <ul>
        <li>Treat gambling as entertainment, not as a way to make money.</li>
        <li>Decide in advance how much time and money you want to spend, and stick to it.</li>
        <li>Never chase losses and never play with money you need for other things.</li>
        <li>Take breaks. Do not play when upset, tired or under the influence.</li>
      </ul>

      <h2>Need help?</h2>
      <p>If gambling is no longer fun for you or someone close to you, free and confidential support is available:</p>
      <ul>
        <li>
          <a href="https://www.gamblingtherapy.org" target="_blank" rel="noreferrer">Gambling Therapy</a>, international online support
        </li>
        <li>
          <a href="https://www.begambleaware.org" target="_blank" rel="noreferrer">BeGambleAware</a>, United Kingdom
        </li>
        <li>
          <a href="https://www.rgf.org.mt" target="_blank" rel="noreferrer">Responsible Gaming Foundation</a>, Malta, helpline 1777
        </li>
        <li>
          <a href="https://www.gamblersanonymous.org" target="_blank" rel="noreferrer">Gamblers Anonymous</a>
        </li>
      </ul>
      <p>Player accounts, limits and self-exclusion are managed by the operator where you play. Contact their support team directly.</p>
    </LegalPage>
  );
}
