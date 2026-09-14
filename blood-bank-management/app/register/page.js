"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [form,setForm]=useState({name:"",email:"",password:""});
  const [message,setMessage]=useState("");
  async function submit(e){
    e.preventDefault();
    setMessage("Creating account...");
    const res=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
    const data=await res.json();
    setMessage(res.ok ? "✓ Account created successfully. You can now login." : `✕ ${data.error}`);
    if(res.ok) setForm({name:"",email:"",password:""});
  }
  return <div className="container auth-page"><form className="auth-card" onSubmit={submit}>
    <div className="brand large"><span className="brand-icon">♥</span> LifeDrop</div>
    <h1>Create account</h1><p className="muted">Join the digital blood donation network.</p>
    <label>Full Name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
    <label>Email<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
    <label>Password<input type="password" minLength="6" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label>
    <button className="btn btn-primary full-btn">Create Account</button>
    {message&&<p className="form-message">{message}</p>}
    <p className="auth-bottom">Already registered? <Link href="/login">Login</Link></p>
  </form></div>
}
