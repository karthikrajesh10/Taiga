// src/components/InviteMemberModal/InviteMemberModal.jsx
import { useState } from "react";
import { authFetch } from "../../services/authFetch";

import "./InviteMemberModal.css";

export default function InviteMemberModal({
  projectId,
  onClose,
  onSuccess,
}) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [error, setError] = useState("");

  const handleAddEmail = () => {
    if (!email) return;
    setStep(2);
  };

  const handleInvite = async () => {
    setError("");

    try {
      const data = await authFetch("/memberships/", {
        method: "POST",
        body: JSON.stringify({
          project: projectId,
          user_email: email,
        }),
      });

      onSuccess(data);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to add member");
    }
  };

  return (
    <div className="invite-overlay">
      <div className="invite-modal">
        <button className="invite-close" onClick={onClose}>
          ✕
        </button>

        <h2>New Member</h2>

        {step === 1 && (
          <div className="invite-step">
            <div className="email-input">
              <input
                type="email"
                placeholder="User email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="add-btn" onClick={handleAddEmail}>
                +
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <>
            <div className="invite-row">
              <span>{email}</span>
              <button className="remove" onClick={() => setStep(1)}>
                Remove
              </button>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="member">Member</option>
                <option value="owner">Owner</option>
              </select>
            </div>

            <textarea
              className="invite-message"
              placeholder="(Optional) Add a personalized message"
              disabled
            />

            {error && <div className="invite-error">{error}</div>}

            <button className="invite-btn" onClick={handleInvite}>
              INVITE
            </button>

            <p className="invite-hint">
              Only existing users can be added to this project.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
