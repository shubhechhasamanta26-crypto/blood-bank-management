"use client";

import { useEffect, useState } from "react";

const groups = ["A+","A-","B+","B-","O+","O-","AB+","AB-"];

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/inventory");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="container page">
      <div className="page-title"><p className="eyebrow">Live inventory</p><h1>Blood stock</h1><p>Current registered blood units by blood group.</p></div>
      {loading ? <div className="loading">Loading inventory…</div> :
      <div className="inventory-grid">
        {groups.map(g => {
          const item = items.find(x => x.bloodGroup === g) || {bloodGroup:g,units:0,minimumLevel:5};
          const low = item.units <= item.minimumLevel;
          return <div className={`blood-stock ${low ? "low" : ""}`} key={g}>
            <div className="group-circle">{g}</div>
            <div><strong>{item.units}</strong><span>units</span></div>
            <small>{low ? "Low stock" : "Available"}</small>
          </div>
        })}
      </div>}
      <div className="notice"><strong>Note:</strong> Inventory values are stored in MongoDB. Use the Admin panel to update units.</div>
    </div>
  );
}
