"use client";

import { useEffect, useState } from "react";

const groups = ["A+","A-","B+","B-","O+","O-","AB+","AB-"];

export default function BloodSearch() {
  const [group, setGroup] = useState("");
  const [stock, setStock] = useState(null);

  async function search() {
    if (!group) return;
    const res = await fetch(`/api/inventory?group=${encodeURIComponent(group)}`);
    const data = await res.json();
    setStock(data);
  }

  useEffect(() => {
    if (group) search();
    else setStock(null);
  }, [group]);

  return (
    <section className="search-card">
      <div>
        <p className="eyebrow">Find blood quickly</p>
        <h2>Check blood availability</h2>
        <p className="muted">Select a blood group to see the current registered stock.</p>
      </div>
      <div className="search-controls">
        <select value={group} onChange={e => setGroup(e.target.value)}>
          <option value="">Select blood group</option>
          {groups.map(g => <option key={g}>{g}</option>)}
        </select>
        <button className="btn btn-primary" onClick={search}>Check Stock</button>
      </div>
      {stock && (
        <div className={`availability ${stock.units <= stock.minimumLevel ? "low" : ""}`}>
          <span className="blood-drop">♥</span>
          <div>
            <strong>{stock.bloodGroup}: {stock.units} units available</strong>
            <small>{stock.units <= stock.minimumLevel ? "Low stock — urgent donation needed." : "Stock is currently available."}</small>
          </div>
        </div>
      )}
    </section>
  );
}
