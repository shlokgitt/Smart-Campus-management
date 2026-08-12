"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function AssignmentDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [fileUrl, setFileUrl] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSubmitting(true);
    setStatus("");

    try {
      const res = await fetch(
        `/api/student/assignments/${params.id}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileUrl,
            githubLink,
          }),
        }
      );

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
      >
        ← Back to assignments
      </button>

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-indigo-600">
          Assignment submission
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Submit your work
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Add a file URL, GitHub repository link, or both to submit your
          assignment.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="space-y-6">
          {/* File URL */}
          <div>
            <label
              htmlFor="fileUrl"
              className="block text-sm font-semibold text-slate-800"
            >
              File URL
              <span className="ml-2 text-xs font-normal text-slate-400">
                Optional
              </span>
            </label>

            <p className="mt-1 text-xs text-slate-500">
              Paste the URL of your uploaded assignment file.
            </p>

            <input
              id="fileUrl"
              type="url"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              placeholder="https://drive.google.com/..."
              className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
            />
          </div>

          {/* GitHub */}
          <div>
            <label
              htmlFor="githubLink"
              className="block text-sm font-semibold text-slate-800"
            >
              GitHub repository
              <span className="ml-2 text-xs font-normal text-slate-400">
                Optional
              </span>
            </label>

            <p className="mt-1 text-xs text-slate-500">
              Add your GitHub repository if the assignment contains code.
            </p>

            <input
              id="githubLink"
              type="url"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              placeholder="https://github.com/username/repository"
              className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
            />
          </div>

          {/* Info */}
          <div className="rounded-2xl bg-indigo-50 p-4">
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-600">
                i
              </div>

              <div>
                <p className="text-sm font-semibold text-indigo-900">
                  Submission tip
                </p>

                <p className="mt-1 text-xs leading-5 text-indigo-700">
                  Make sure your links are accessible to your faculty before
                  submitting.
                </p>
              </div>
            </div>
          </div>

          {/* Status */}
          {status === "success" && (
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              ✓ Assignment submitted successfully!
            </div>
          )}

          {status === "error" && (
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              Submission failed. Please check your links and try again.
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit assignment"}
          </button>
        </div>
      </form>
    </div>
  );
}