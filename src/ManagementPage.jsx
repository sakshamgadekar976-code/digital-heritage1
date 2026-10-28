
import { useEffect, useState } from "react";
import "./ManagementPage.css";

const API_BASE = "http://localhost:5000";

export default function ManagementPage({
  title,
  endpoint,
  fields,
  onBack,
}) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const getId = (item) => item.id ?? item._id;

  async function loadItems() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}${endpoint}`);
      if (!response.ok) {
        throw new Error(`Data load failed (${response.status})`);
      }

      const data = await response.json();
      const list = Array.isArray(data)
        ? data
        : data.items ?? data.data ?? [];

      if (!Array.isArray(list)) {
        throw new Error("API response list format मध्ये नाही.");
      }

      setItems(list);
    } catch (err) {
      setError(err.message || "Data load करता आला नाही.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, [endpoint]);

  function resetForm() {
    setForm({});
    setEditingId(null);
    setMessage("");
  }

  function startEdit(item) {
    setForm({ ...item });
    setEditingId(getId(item));
    setError("");
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    const isEditing = editingId !== null;
    const url = isEditing
      ? `${API_BASE}${endpoint}/${encodeURIComponent(editingId)}`
      : `${API_BASE}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const details = await response.text();
        throw new Error(
          details || `Save failed (${response.status})`
        );
      }

      resetForm();
      setMessage(isEditing ? "Record updated!" : "Record added!");
      await loadItems();
    } catch (err) {
      setError(err.message || "Save करता आला नाही.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item) {
    const id = getId(item);

    if (id === undefined || id === null) {
      setError("या record साठी id/_id उपलब्ध नाही.");
      return;
    }

    if (!window.confirm("हा record delete करायचा आहे का?")) {
      return;
    }

    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${API_BASE}${endpoint}/${encodeURIComponent(id)}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error(`Delete failed (${response.status})`);
      }

      if (editingId === id) resetForm();

      setMessage("Record deleted!");
      await loadItems();
    } catch (err) {
      setError(err.message || "Delete करता आला नाही.");
    }
  }

  return (
    <main className="management-page">
      <header className="management-header">
        <div>
          <p className="management-eyebrow">DIGITAL HERITAGE · ADMIN</p>
          <h1>{title}</h1>
          <p>Manage your heritage platform records.</p>
        </div>

        <button
          type="button"
          className="management-back"
          onClick={onBack || (() => window.history.back())}
        >
          ← Back
        </button>
      </header>

      {error && <p className="management-error" role="alert">{error}</p>}
      {message && <p className="management-success" role="status">{message}</p>}

      <section className="management-panel">
        <h2>{editingId !== null ? "Edit Record" : "Add New Record"}</h2>

        <form className="management-form" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <label key={field.name}>
              {field.label}
              {field.type === "textarea" ? (
                <textarea
                  required={field.required !== false}
                  value={form[field.name] ?? ""}
                  placeholder={field.placeholder || field.label}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      [field.name]: e.target.value,
                    }))
                  }
                />
              ) : (
                <input
                  type={field.type || "text"}
                  required={field.required !== false}
                  value={form[field.name] ?? ""}
                  placeholder={field.placeholder || field.label}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      [field.name]:
                        field.type === "number"
                          ? e.target.value === ""
                            ? ""
                            : Number(e.target.value)
                          : e.target.value,
                    }))
                  }
                />
              )}
            </label>
          ))}

          <div className="management-form-actions">
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : editingId !== null ? "Update Record" : "Add Record"}
            </button>

            {editingId !== null && (
              <button type="button" className="management-cancel" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="management-panel">
        <div className="management-list-heading">
          <h2>Existing Records</h2>
          <button type="button" className="management-refresh" onClick={loadItems}>
            ↻ Refresh
          </button>
        </div>

        {loading ? (
          <p>Loading records...</p>
        ) : items.length === 0 ? (
          <p>No records found.</p>
        ) : (
          <div className="management-records">
            {items.map((item, index) => (
              <article
                className="management-record"
                key={getId(item) ?? index}
              >
                <div className="management-record-content">
                  <h3>
                    {item.name || item.title || item.subject || `Record ${index + 1}`}
                  </h3>

                  {fields.map((field) => {
                    const value = item[field.name];

                    if (value === undefined || value === null || value === "") {
                      return null;
                    }

                    return (
                      <p key={field.name}>
                        <strong>{field.label}:</strong>{" "}
                        {typeof value === "object"
                          ? JSON.stringify(value)
                          : String(value)}
                      </p>
                    );
                  })}
                </div>

                <div className="management-record-actions">
                  <button type="button" onClick={() => startEdit(item)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="management-delete"
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}