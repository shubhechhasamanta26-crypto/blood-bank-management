import Link from "next/link";
import BloodSearch from "@/components/BloodSearch";
import StatCard from "@/components/StatCard";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="pill">🩸 Donate blood. Save lives.</span>
            <h1>One donation can be someone's <span>second chance.</span></h1>
            <p>
              LifeDrop connects donors, hospitals and patients through a simple
              blood bank management platform.
            </p>
            <div className="hero-actions">
              <Link href="/donor" className="btn btn-primary">Become a Donor</Link>
              <Link href="/request" className="btn btn-light">Request Blood</Link>
            </div>
          </div>
          <div className="hero-card">
            <div className="heartbeat">♥</div>
            <div className="hero-blood">A+</div>
            <h3>Every drop matters</h3>
            <p>Safe collection • Smart inventory • Faster requests</p>
          </div>
        </div>
      </section>

      <section className="container stats">
        <StatCard icon="🩸" value="8" label="Blood Groups" />
        <StatCard icon="👥" value="24/7" label="Request Portal" />
        <StatCard icon="🏥" value="100%" label="Digital Records" />
        <StatCard icon="⚡" value="Fast" label="Stock Search" />
      </section>

      <div className="container"><BloodSearch /></div>

      <section className="container section">
        <div className="section-heading">
          <div><p className="eyebrow">How it works</p><h2>Simple. Fast. Life-saving.</h2></div>
        </div>
        <div className="steps">
          <div><b>01</b><h3>Register</h3><p>Donors can create a profile with their blood group and contact details.</p></div>
          <div><b>02</b><h3>Manage</h3><p>Staff can maintain blood inventory and monitor low-stock groups.</p></div>
          <div><b>03</b><h3>Request</h3><p>Patients or hospitals can submit blood requests and track status.</p></div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <div><p className="eyebrow">Be the reason someone smiles</p><h2>Ready to make a difference?</h2></div>
          <Link href="/donor" className="btn btn-white">Register as Donor →</Link>
        </div>
      </section>
    </>
  );
}
