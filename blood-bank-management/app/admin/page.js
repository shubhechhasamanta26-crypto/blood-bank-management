"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [inventory, setInventory] = useState([]);
  const [requests, setRequests] = useState([]);
  const [donors, setDonors] = useState([]);
  const [tab, setTab] = useState("inventory");
  const [msg, setMsg] = useState("");

  async function load() {
    const [a,b,c] = await Promise.all([
      fetch("/api/inventory").then(r=>r.json()),
      fetch("/api/requests").then(r=>r.json()),
      fetch("/api/donors").then(r=>r.json())
    ]);
    setInventory(Array.isArray(a)?a:[]);
    setRequests(Array.isArray(b)?b:[]);
    setDonors(Array.isArray(c)?c:[]);
  }

  useEffect(()=>{load()},[]);

  async function updateUnits(id, units) {
    const res = await fetch(`/api/inventory/${id}`, {
      method:"PUT", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({units:Number(units)})
    });
    setMsg(res.ok ? "Inventory updated." : "Update failed.");
    load();
  }

  async function updateRequest(id, status) {
    const res = await fetch(`/api/requests/${id}`, {
      method:"PUT", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({status})
    });
    setMsg(res.ok ? "Request status updated." : "Update failed.");
    load();
  }

  return (
    <div className="container page">
      <div className="admin-head"><div><p className="eyebrow">Management console</p><h1>Admin dashboard</h1><p>Manage donors, inventory and blood requests.</p></div><button className="btn btn-light" onClick={load}>↻ Refresh</button></div>
      <div className="admin-tabs">
        <button className={tab==="inventory"?"selected":""} onClick={()=>setTab("inventory")}>Inventory ({inventory.length})</button>
        <button className={tab==="requests"?"selected":""} onClick={()=>setTab("requests")}>Requests ({requests.length})</button>
        <button className={tab==="donors"?"selected":""} onClick={()=>setTab("donors")}>Donors ({donors.length})</button>
      </div>
      {msg && <div className="success-banner">{msg}</div>}

      {tab==="inventory" && <div className="table-card"><table><thead><tr><th>Blood Group</th><th>Units</th><th>Minimum</th><th>Action</th></tr></thead><tbody>
        {inventory.map(x=><tr key={x._id}><td><span className="mini-blood">{x.bloodGroup}</span></td><td><input className="small-input" type="number" min="0" defaultValue={x.units} id={`u-${x._id}`}/></td><td>{x.minimumLevel}</td><td><button className="table-btn" onClick={()=>updateUnits(x._id, document.getElementById(`u-${x._id}`).value)}>Save</button></td></tr>)}
      </tbody></table></div>}

      {tab==="requests" && <div className="table-card"><table><thead><tr><th>Patient</th><th>Hospital</th><th>Group</th><th>Units</th><th>Urgency</th><th>Status</th></tr></thead><tbody>
        {requests.length ? requests.map(x=><tr key={x._id}><td>{x.patientName}</td><td>{x.hospital}</td><td><span className="mini-blood">{x.bloodGroup}</span></td><td>{x.units}</td><td><span className={`badge ${x.urgency.toLowerCase()}`}>{x.urgency}</span></td><td><select className="status-select" value={x.status} onChange={e=>updateRequest(x._id,e.target.value)}><option>Pending</option><option>Approved</option><option>Rejected</option><option>Fulfilled</option></select></td></tr>) : <tr><td colSpan="6" className="empty">No requests yet.</td></tr>}
      </tbody></table></div>}

      {tab==="donors" && <div className="table-card"><table><thead><tr><th>Name</th><th>Group</th><th>Age</th><th>Phone</th><th>City</th><th>Available</th></tr></thead><tbody>
        {donors.length ? donors.map(x=><tr key={x._id}><td>{x.name}</td><td><span className="mini-blood">{x.bloodGroup}</span></td><td>{x.age}</td><td>{x.phone}</td><td>{x.city}</td><td>{x.available ? "Yes":"No"}</td></tr>) : <tr><td colSpan="6" className="empty">No donors yet.</td></tr>}
      </tbody></table></div>}
    </div>
  );
}
