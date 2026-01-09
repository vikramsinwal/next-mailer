"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { sendMailAction } from "@/app/actions/sendMail";

export default function ContactForm() {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        if (!executeRecaptcha) {
            toast.error("reCAPTCHA not ready");
            return;
        }

        const token = await executeRecaptcha("contact_form");

        const payload = Object.fromEntries(formData.entries()) as any;
        payload.token = token;

        try {
            await sendMailAction(payload);
            toast.success("Email sent successfully!");
            form.reset();
        } catch (err: any) {
            if (err?.issues) {
                const fieldErrors: any = {};
                err.issues.forEach((i: any) => {
                    fieldErrors[i.path[0]] = i.message;
                });
                setErrors(fieldErrors);
            } else {
                toast.error(JSON.stringify(err.message) || "Something went wrong");
            }
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* From Name */}
            <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                    <span className="material-icons-round text-lg">person_outline</span>
                    Sender Name
                </label>
                <input
                    name="fromName"
                    type="text"
                    placeholder="Sender Name"
                    className="w-full bg-slate-50 dark:bg-slate-900/50
        border border-slate-200 dark:border-slate-700
        rounded-xl px-4 py-3 text-slate-800 dark:text-slate-200
        focus:ring-2 focus:ring-primary focus:border-primary
        transition-all placeholder:text-slate-400"
                />
                {errors.fromEmail && (
                    <p className="text-red-500 text-sm">{errors.fromEmail}</p>
                )}
            </div>
            {/* From Email */}
            <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                    <span className="material-icons-round text-lg">mail_outline</span>
                    Sender Email
                </label>
                <input
                    name="fromEmail"
                    type="email"
                    placeholder="sender@example.com"
                    className="w-full bg-slate-50 dark:bg-slate-900/50
        border border-slate-200 dark:border-slate-700
        rounded-xl px-4 py-3 text-slate-800 dark:text-slate-200
        focus:ring-2 focus:ring-primary focus:border-primary
        transition-all placeholder:text-slate-400"
                />
                {errors.fromEmail && (
                    <p className="text-red-500 text-sm">{errors.fromEmail}</p>
                )}
            </div>

            {/* To Email */}
            <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                    <span className="material-icons-round text-lg">mail_outline</span>
                    To Email
                </label>
                <input
                    name="email"
                    type="email"
                    placeholder="recipient@example.com"
                    className="w-full bg-slate-50 dark:bg-slate-900/50
        border border-slate-200 dark:border-slate-700
        rounded-xl px-4 py-3 text-slate-800 dark:text-slate-200
        focus:ring-2 focus:ring-primary focus:border-primary
        transition-all placeholder:text-slate-400"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                )}
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                    <span className="material-icons-round text-lg">description</span>
                    Subject
                </label>
                <input
                    name="subject"
                    type="text"
                    placeholder="Email Subject"
                    className="w-full bg-slate-50 dark:bg-slate-900/50
        border border-slate-200 dark:border-slate-700
        rounded-xl px-4 py-3 text-slate-800 dark:text-slate-200
        focus:ring-2 focus:ring-primary focus:border-primary
        transition-all placeholder:text-slate-400"
                />
                {errors.subject && (
                    <p className="text-red-500 text-sm">{errors.subject}</p>
                )}
            </div>

            {/* Message */}
            <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                    Message Body
                </label>
                <textarea
                    name="message"
                    rows={6}
                    placeholder="Type your message here..."
                    className="w-full bg-slate-50 dark:bg-slate-900/50
        border border-slate-200 dark:border-slate-700
        rounded-xl px-4 py-3 text-slate-800 dark:text-slate-200
        focus:ring-2 focus:ring-primary focus:border-primary
        transition-all placeholder:text-slate-400 resize-none"
                />
                <p className="text-xs text-slate-400 dark:text-slate-500 pt-1">
                    You can use basic HTML formatting
                </p>
                {errors.message && (
                    <p className="text-red-500 text-sm">{errors.message}</p>
                )}
            </div>

            {/* Submit */}
            <div className="pt-4">
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#9333ea] to-[#2563eb]
        hover:opacity-90 active:scale-[0.98]
        transition-all text-white font-semibold py-4 rounded-xl
        flex items-center justify-center gap-3
        shadow-lg shadow-indigo-500/20"
                >
                    <span className="material-icons-round rotate-[-45deg] text-xl">
                        send
                    </span>
                    Send Email
                </button>
            </div>
        </form>
    );
}
