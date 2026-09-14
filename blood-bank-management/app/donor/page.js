"use client";

import { useState } from "react";

export default function DonorPage() {
  const [form, setForm] = useState({
    name:"", age:"", gender:"", bloodGroup:"", phone:"", email:"", city:""
  });
  const [message, setMessage] = useState("");

  function update(e) {
    setForm({...form, [e.target.name]: e.target.value});
  }

  async function submit(e) {
    e.preventDefault();
    setMessage("Submitting...");
    const res = await fetch("/api/donors", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setMessage(res.ok ? "✓ Donor registered successfully!" : `✕ ${data.error || "Something went wrong"}`);
    if (res.ok) setForm({name:"",age:"",gender:"",bloodGroup:"",phone:"",email:"",city:""});
  }

  return (
    <div className="container page">
      <div className="page-title"><p className="eyebrow">Donor registration</p><h1>Become a blood donor</h1><p>Register once and help hospitals find eligible donors faster.</p></div>
      <form className="form-card" onSubmit={submit}>
        <div className="form-grid">
          <label>Full Name<input name="name" value={form.name} onChange={update} required placeholder="Enter full name"/></label>
          <label>Age<input type="number" name="age" value={form.age} onChange={update} required min="18" max="65" placeholder="18–65"/></label>
          <label>Gender<select name="gender" value={form.gender} onChange={update} required><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></label>
          <label>Blood Group<select name="bloodGroup" value={form.bloodGroup} onChange={update} required><option value="">Select</option>{["A+","A-","B+","B-","O+","O-","AB+","AB-"].map(x=><option key={x}>{x}</option>)}</select></label>
          <label>Phone<input name="phone" value={form.phone} onChange={update} required placeholder="+91 98765 43210"/></label>
          <label>Email<input type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com"/></label>
          <label className="full">City<input name="city" value={form.city} onChange={update} required placeholder="Your city"/></label>
        </div>
        <button className="btn btn-primary" type="submit">Register as Donor</button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
}
