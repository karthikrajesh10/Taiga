// src/pages/Settings/Members/Members.jsx
import { useState } from "react";
import InviteMemberModal from "./InviteMemberModal";
import "./Members.css";

export default function Members() {
  const [showInvite, setShowInvite] = useState(false);
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "admin",
      email: "admin@localhost",
      role: "Product Owner",
      status: "Active",
      admin: true,
    },
  ]);

  const addMember = (email, role) => {
    setMembers((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: email.split("@")[0],
        email,
        role,
        status: "Pending",
        admin: false,
      },
    ]);
  };

  return (
    <div className="members">
      <header className="members__header">
        <h2>Manage members</h2>
        <button className="primary-btn" onClick={() => setShowInvite(true)}>
          + NEW MEMBER
        </button>
      </header>

      <div className="members__table">
        <div className="members__row header">
          <span>Member</span>
          <span>Admin</span>
          <span>Role</span>
          <span>Status</span>
          <span />
        </div>

        {members.map((m) => (
          <div className="members__row" key={m.id}>
            <div className="member">
              <div className="avatar">{m.name[0].toUpperCase()}</div>
              <div>
                <strong>{m.name}</strong>
                <div className="email">{m.email}</div>
              </div>
            </div>

            <input type="checkbox" checked={m.admin} readOnly />

            <select value={m.role} readOnly>
              <option>{m.role}</option>
            </select>

            <div className={`status ${m.status.toLowerCase()}`}>
              {m.status}
            </div>

            {m.status === "Pending" && (
              <button className="link-btn">Resend</button>
            )}
          </div>
        ))}
      </div>

      {showInvite && (
        <InviteMemberModal
          onClose={() => setShowInvite(false)}
          onInvite={addMember}
        />
      )}
    </div>
  );
}
