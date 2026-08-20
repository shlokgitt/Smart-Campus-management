"use client";

import { useCallback, useEffect, useState } from "react";

const roleColors: Record<string, string> = {
  admin: "bg-indigo-50 text-indigo-700 border-indigo-100",
  faculty: "bg-emerald-50 text-emerald-700 border-emerald-100",
  coordinator: "bg-amber-50 text-amber-700 border-amber-100",
  student: "bg-slate-100 text-slate-600 border-slate-200",
};

const roleIcons: Record<string, string> = {
  admin: "A",
  faculty: "F",
  coordinator: "C",
  student: "S",
};

const roles = ["student", "faculty", "coordinator", "admin"];

interface User {
  _id: string;
  name?: string;
  email?: string;
  role: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [savingRole, setSavingRole] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    setError("");

    try {
      const res = await fetch("/api/admin/users");

      if (!res.ok) {
        throw new Error("Failed to load users");
      }

      const data = await res.json();

      setUsers(Array.isArray(data) ? data : []);
    } catch {
      setUsers([]);
      setLoadError(true);
      setError("");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  function openRoleModal(user: User) {
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

  const filteredUsers = users.filter((user) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      !searchValue ||
      user.name?.toLowerCase().includes(searchValue) ||
      user.email?.toLowerCase().includes(searchValue);

    const matchesRole =
      roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const roleCounts = {
    all: users.length,
    student: users.filter((user) => user.role === "student").length,
    faculty: users.filter((user) => user.role === "faculty").length,
    coordinator: users.filter(
      (user) => user.role === "coordinator"
    ).length,
    admin: users.filter((user) => user.role === "admin").length,
  };

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
              Administration
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Users
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Manage accounts, roles, and access across the Smart Campus
              platform.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Total users
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              {loading ? "..." : users.length}
            </p>
          </div>
        </div>

        {/* Success */}
        {message && (
          <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100">
              ✓
            </span>

            {message}
          </div>
        )}

        {/* Action error */}
        {error && (
          <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100">
              !
            </span>

            {error}
          </div>
        )}

        {/* Role overview */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { key: "all", label: "All users" },
            { key: "student", label: "Students" },
            { key: "faculty", label: "Faculty" },
            { key: "coordinator", label: "Coordinators" },
            { key: "admin", label: "Admins" },
          ].map((item) => {
            const active = roleFilter === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setRoleFilter(item.key)}
                className={`rounded-xl border px-4 py-4 text-left transition ${
                  active
                    ? "border-indigo-200 bg-indigo-50"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <p
                  className={`text-[10px] font-semibold uppercase tracking-wider ${
                    active ? "text-indigo-600" : "text-slate-400"
                  }`}
                >
                  {item.label}
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900">
                  {loading
                    ? "..."
                    : roleCounts[item.key as keyof typeof roleCounts]}
                </p>
              </button>
            );
          })}
        </div>

        {/* Users container */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Toolbar */}
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Campus accounts
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {loading
                    ? "Loading accounts..."
                    : loadError
                    ? "Unable to load accounts"
                    : `${filteredUsers.length} account${
                        filteredUsers.length !== 1 ? "s" : ""
                      } shown`}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  disabled={loading || loadError}
                  placeholder="Search name or email..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-64"
                />

                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  disabled={loading || loadError}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <option value="all">All roles</option>
                  <option value="student">Students</option>
                  <option value="faculty">Faculty</option>
                  <option value="coordinator">Coordinators</option>
                  <option value="admin">Admins</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="space-y-4 p-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-16 animate-pulse rounded-xl bg-slate-100"
                />
              ))}
            </div>
          ) : loadError ? (
            /* API Error */
            <div className="flex min-h-[350px] flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-xl font-bold text-red-500">
                !
              </div>

              <h3 className="mt-4 text-base font-semibold text-slate-800">
                Unable to load users
              </h3>

              <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">
                We couldn't retrieve the campus accounts. Please try again.
              </p>

              <button
                type="button"
                onClick={loadUsers}
                className="mt-5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-700"
              >
                Try again
              </button>
            </div>
          ) : filteredUsers.length === 0 ? (
            /* Empty */
            <div className="flex min-h-[350px] flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-xl text-slate-400">
                ♙
              </div>

              <h3 className="mt-4 text-base font-semibold text-slate-800">
                {users.length === 0
                  ? "No users yet"
                  : "No users found"}
              </h3>

              <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">
                {users.length === 0
                  ? "No campus accounts have been registered yet."
                  : "Try changing your search or role filter."}
              </p>

              {(search || roleFilter !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setRoleFilter("all");
                  }}
                  className="mt-4 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            /* Data */
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="border-b border-slate-100 bg-slate-50/80">
                  <tr>
                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      User
                    </th>

                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Email
                    </th>

                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Role
                    </th>

                    <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="transition hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                            {user.name
                              ? user.name
                                  .split(" ")
                                  .map((part) => part[0])
                                  .join("")
                                  .slice(0, 2)
                                  .toUpperCase()
                              : "U"}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-900">
                              {user.name || "Unnamed user"}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              Campus account
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {user.email || "No email"}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                            roleColors[user.role] ||
                            "border-slate-200 bg-slate-100 text-slate-600"
                          }`}
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/70 text-[9px] font-bold">
                            {roleIcons[user.role] || "U"}
                          </span>

                          <span className="capitalize">
                            {user.role || "unknown"}
                          </span>
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openRoleModal(user)}
                            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                          >
                            Change Role
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteUser(user._id, user.name || "this user")
                            }
                            className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeRoleModal();
            }
          }}
        >
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="border-b border-slate-100 px-6 py-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                    Access control
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-slate-900">
                    Change User Role
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Update access level for this account.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeRoleModal}
                  disabled={savingRole}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="px-6 pt-5">
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                  {selectedUser.name
                    ? selectedUser.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()
                    : "U"}
                </div>

                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-900">
                    {selectedUser.name || "Unnamed user"}
                  </p>

                  <p className="truncate text-sm text-slate-500">
                    {selectedUser.email || "No email"}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 pt-5">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
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

            {selectedRole !== selectedUser.role && (
              <div className="mx-6 mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                <p className="text-xs leading-5 text-amber-700">
                  Changing this role may change what this user can access
                  across the Smart Campus platform.
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-5">
              <button
                type="button"
                onClick={closeRoleModal}
                disabled={savingRole}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
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