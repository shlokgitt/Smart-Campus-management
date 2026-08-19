"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function AssignmentDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [fileUrl, setFileUrl] = useState("");
  const [githubLink, setGithubLink] = useState("");

  const [status, setStatus] = useState<
    "" | "success" | "error" | "validation"
  >("");

  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setStatus("");
    setErrorMessage("");

    const cleanFileUrl = fileUrl.trim();
    const cleanGithubLink = githubLink.trim();

    if (!cleanFileUrl && !cleanGithubLink) {
      setStatus("validation");
      setErrorMessage(
        "Please provide a file URL, GitHub repository link, or both."
      );
      return;
    }

    setSubmitting(true);

    try {
      const assignmentId = Array.isArray(params.id)
        ? params.id[0]
        : params.id;

      if (!assignmentId) {
        throw new Error("Assignment ID is missing.");
      }

      const res = await fetch(
        `/api/student/assignments/${assignmentId}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileUrl: cleanFileUrl,
            githubLink: cleanGithubLink,
          }),
        }
      );

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(
          data?.error ||
            "We couldn't submit your assignment. Please check your details and try again."
        );
        return;
      }

      setStatus("success");

      setFileUrl("");
      setGithubLink("");
    } catch (error) {
      console.error("Assignment submission error:", error);

      setStatus("error");
      setErrorMessage(
        "Something went wrong while submitting your assignment. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Back */}
      <button
        type="button"
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
              disabled={submitting}
              className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 disabled:cursor-not-allowed disabled:bg-slate-50"
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
              disabled={submitting}
              className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 disabled:cursor-not-allowed disabled:bg-slate-50"
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
                  At least one submission link is required. Make sure your
                  links are accessible to your faculty before submitting.
                </p>
              </div>
            </div>
          </div>

          {/* Validation */}
          {status === "validation" && (
            <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
              <p className="text-sm font-semibold text-amber-700">
                Submission details required
              </p>

              <p className="mt-1 text-xs text-amber-600">
                {errorMessage}
              </p>
            </div>
          )}

          {/* Success */}
          {status === "success" && (
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
              <p className="text-sm font-semibold text-emerald-700">
                ✓ Assignment submitted successfully!
              </p>

              <p className="mt-1 text-xs text-emerald-600">
                Your submission has been recorded.
              </p>
            </div>
          )}

          {/* Error */}
          {status === "error" && (
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3">
              <p className="text-sm font-semibold text-red-700">
                Submission failed
              </p>

              <p className="mt-1 text-xs leading-5 text-red-600">
                {errorMessage}
              </p>
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