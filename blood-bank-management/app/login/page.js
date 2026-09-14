"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [form,setForm]=useState({email:"",password:""});
  const [message,setMessage]=useState("");
  async function submit(e){
    e.preventDefault();
    setMessage("Signing in...");
    const res=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
    const data=await res.json();
    setMessage(res.ok ? `✓ Welcome, ${data.user.name}` : `✕ ${data.error}`);
  }
  return <div className="container auth-page"><form className="auth-card" onSubmit={submit}>
    <div className="brand large"><span className="brand-icon">♥</span> LifeDrop</div>
    <h1>Welcome back</h1><p className="muted">Login to your LifeDrop account.</p>
    <label>Email<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
    <label>Password<input type="password" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label>
    <button className="btn btn-primary full-btn">Login</button>
    {message&&<p className="form-message">{message}</p>}
    <p className="auth-bottom">Don't have an account? <Link href="/register">Register</Link></p>
  </form></div>
}
