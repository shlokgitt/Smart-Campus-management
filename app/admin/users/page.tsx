"use client";

import { useEffect, useState } from "react";

const roleColors: Record<string, string> = {
  admin: "bg-indigo-50 text-indigo-700",
  faculty: "bg-emerald-50 text-emerald-700",
  coordinator: "bg-amber-50 text-amber-700",
  student: "bg-slate-100 text-slate-600",
};

const roles = ["student", "faculty", "coordinator", "admin"];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [savingRole, setSavingRole] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function loadUsers() {
    setLoading(true);

    fetch("/api/admin/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load users");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load users.");
        setLoading(false);
      });
  }

  useEffect(() => {
    loadUsers();
  }, []);

  function openRoleModal(user: any) {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setMessage("");
    setError("");
  }

  function closeRoleModal() {
    if (savingRole) return;

    setSelectedUser(null);
    setSelectedRole("");
  }

  async function saveRole() {
    if (!selectedUser || !selectedRole) return;

    if (selectedRole === selectedUser.role) {
      closeRoleModal();
      return;
    }

    setSavingRole(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch(
        `/api/admin/users/${selectedUser._id}/role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: selectedRole,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to change role.");
      }

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user._id === selectedUser._id
            ? { ...user, role: selectedRole }
            : user
        )
      );

      setSelectedUser(null);
      setSelectedRole("");

      setMessage(
        `Role updated successfully for ${selectedUser.name}.`
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Failed to change role.");
    } finally {
      setSavingRole(false);
    }
  }

  async function deleteUser(id: string, name: string) {
    if (!confirm(`Delete user "${name}"? This cannot be undone.`)) {
      return;
    }

    setError("");
    setMessage("");

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete user.");
      }

      setUsers((currentUsers) =>
        currentUsers.filter((user) => user._id !== id)
      );

      setMessage(`User "${name}" deleted successfully.`);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Failed to delete user.");
    }
  }

  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Users
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage roles and access across the platform.
          </p>
        </div>

        {/* Success Message */}
        {message && (
          <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
              ✓
            </span>

            {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
              !
            </span>

            {error}
          </div>
        )}

        {/* Users Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <div className="space-y-3 p-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-12 animate-pulse rounded-xl bg-slate-100"
                />
              ))}
            </div>
          ) : users.length === 0 ? (
            <div className="p-10 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                👥
              </div>

              <p className="text-sm font-medium text-slate-700">
                No users found.
              </p>

              <p className="mt-1 text-xs text-slate-400">
                There are currently no users in the system.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="border-b border-slate-100 bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-slate-600">
                      Name
                    </th>

                    <th className="px-6 py-3 font-semibold text-slate-600">
                      Email
                    </th>

                    <th className="px-6 py-3 font-semibold text-slate-600">
                      Role
                    </th>

                    <th className="px-6 py-3 font-semibold text-slate-600">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {users.map((u: any) => (
                    <tr
                      key={u._id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {u.name}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {u.email}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            roleColors[u.role] ||
                            "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openRoleModal(u)}
                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                          >
                            Change Role
                          </button>

                          <button
                            onClick={() =>
                              deleteUser(u._id, u.name)
                            }
                            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Change Role Modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeRoleModal();
            }
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Change User Role
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update access level for this user.
                </p>
              </div>

              <button
                onClick={closeRoleModal}
                disabled={savingRole}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed"
              >
                ×
              </button>
            </div>

            {/* User Information */}
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">
                {selectedUser.name}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {selectedUser.email}
              </p>
            </div>

            {/* Role Select */}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Select Role
              </label>

              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                disabled={savingRole}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-100"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Warning */}
            {selectedRole !== selectedUser.role && (
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                <p className="text-xs leading-5 text-amber-700">
                  Changing this role may change what the user can
                  access across the Smart Campus platform.
                </p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeRoleModal}
                disabled={savingRole}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={saveRole}
                disabled={
                  savingRole ||
                  selectedRole === selectedUser.role
                }
                className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {savingRole ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}