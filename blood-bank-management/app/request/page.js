"use client";

import { useState } from "react";

export default function RequestPage() {
  const [form, setForm] = useState({patientName:"",hospital:"",bloodGroup:"",units:"",contact:"",urgency:"Normal"});
  const [message, setMessage] = useState("");

  const update = e => setForm({...form, [e.target.name]:e.target.value});

  async function submit(e) {
    e.preventDefault();
    setMessage("Submitting request...");
    const res = await fetch("/api/requests", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(form)
    });
    const data = await res.json();
    setMessage(res.ok ? `✓ Request submitted. ID: ${data.request._id}` : `✕ ${data.error || "Could not submit request"}`);
    if (res.ok) setForm({patientName:"",hospital:"",bloodGroup:"",units:"",contact:"",urgency:"Normal"});
  }

  return (
    <div className="container page">
      <div className="page-title"><p className="eyebrow">Emergency support</p><h1>Request blood</h1><p>Hospitals and patients can submit a request for available blood units.</p></div>
      <form className="form-card" onSubmit={submit}>
        <div className="form-grid">
          <label>Patient Name<input name="patientName" value={form.patientName} onChange={update} required placeholder="Patient full name"/></label>
          <label>Hospital / Clinic<input name="hospital" value={form.hospital} onChange={update} required placeholder="Hospital name"/></label>
          <label>Blood Group<select name="bloodGroup" value={form.bloodGroup} onChange={update} required><option value="">Select</option>{["A+","A-","B+","B-","O+","O-","AB+","AB-"].map(x=><option key={x}>{x}</option>)}</select></label>
          <label>Units Required<input type="number" min="1" name="units" value={form.units} onChange={update} required placeholder="e.g. 2"/></label>
          <label>Contact Number<input name="contact" value={form.contact} onChange={update} required placeholder="+91 98765 43210"/></label>
          <label>Urgency<select name="urgency" value={form.urgency} onChange={update}><option>Normal</option><option>Urgent</option><option>Emergency</option></select></label>
        </div>
        <button className="btn btn-primary" type="submit">Submit Blood Request</button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
}
