"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { sendMailAction } from "@/app/actions/sendMail";
import RichTextEditor from "./RichTextEditor";

export default function ContactForm() {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (!executeRecaptcha) {
            toast.error("reCAPTCHA not ready");
            return;
        }

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        // ✅ Attach file if selected
        if (file) {
            formData.append("file", file);
        }

        // ✅ reCAPTCHA token
        const token = await executeRecaptcha("contact_form");
        formData.append("token", token);

        try {
            // 🚀 Send FormData directly (IMPORTANT)
            await sendMailAction(formData);

            toast.success("Email sent successfully!");
            form.reset();
            setFile(null);
        } catch (err: any) {
            if (err?.issues) {
                const fieldErrors: any = {};
                err.issues.forEach((i: any) => {
                    fieldErrors[i.path[0]] = i.message;
                });
                setErrors(fieldErrors);
            } else {
                toast.error(err?.message || "Something went wrong");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Sender Name */}
            <div className="space-y-1.5">
                <label className="text-sm font-medium">Sender Name</label>
                <input
                    name="fromName"
                    type="text"
                    placeholder="Sender Name"
                    className="w-full rounded-xl px-4 py-3 border"
                />
                {errors.fromName && (
                    <p className="text-red-500 text-sm">{errors.fromName}</p>
                )}
            </div>

            {/* Sender Email */}
            <div className="space-y-1.5">
                <label className="text-sm font-medium">Sender Email</label>
                <input
                    name="fromEmail"
                    type="email"
                    placeholder="sender@example.com"
                    className="w-full rounded-xl px-4 py-3 border"
                />
                {errors.fromEmail && (
                    <p className="text-red-500 text-sm">{errors.fromEmail}</p>
                )}
            </div>

            {/* To Email */}
            <div className="space-y-1.5">
                <label className="text-sm font-medium">To Email</label>
                <input
                    name="email"
                    type="email"
                    placeholder="recipient@example.com"
                    className="w-full rounded-xl px-4 py-3 border"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                )}
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
                <label className="text-sm font-medium">Subject</label>
                <input
                    name="subject"
                    type="text"
                    placeholder="Email Subject"
                    className="w-full rounded-xl px-4 py-3 border"
                />
                {errors.subject && (
                    <p className="text-red-500 text-sm">{errors.subject}</p>
                )}
            </div>

            {/* Message */}
            <div className="space-y-1.5">
                <RichTextEditor name="message" error={errors.message} />
            </div>

            {/* ✅ Attachment */}
            <div className="space-y-1.5">
                <label className="text-sm font-medium">
                    Attachment (optional)
                </label>
                <input
                    type="file"
                    name="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full text-sm"
                />
                <p className="text-xs text-slate-500">
                    Max 10MB (PDF, Image, Docs)
                </p>
            </div>

            {/* Submit */}
            <div className="pt-4">
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#9333ea] to-[#2563eb]
          text-white font-semibold py-4 rounded-xl"
                >
                    Send Email
                </button>
            </div>
        </form>
    );
}
