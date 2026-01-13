"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// ✅ CKEditor React component (dynamic, SSR off)
const CKEditor = dynamic(
    () => import("@ckeditor/ckeditor5-react").then((m) => m.CKEditor),
    { ssr: false }
);

interface RichTextEditorProps {
    name: string;
    error?: string;
}

export default function RichTextEditor({ name, error }: RichTextEditorProps) {
    const [ClassicEditor, setClassicEditor] = useState<any>(null);
    const [value, setValue] = useState("");

    // ✅ Load ClassicEditor class ONLY on client
    useEffect(() => {
        import("@ckeditor/ckeditor5-build-classic").then((mod) => {
            setClassicEditor(() => mod.default); // ⚠️ IMPORTANT: wrap in function
        });
    }, []);

    // ⏳ Loading placeholder
    if (!ClassicEditor) {
        return (
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Message Body
                </label>
                <div className="h-[180px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 animate-pulse" />
            </div>
        );
    }

    return (
        <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Message Body
            </label>

            <div
                className={`rounded-xl border overflow-hidden
          ${error ? "border-red-500" : "border-slate-200 dark:border-slate-700"}
          bg-slate-50 dark:bg-slate-900/50`}
            >
                <CKEditor
                    editor={ClassicEditor}
                    data={value}
                    onChange={(_, editor: any) => {
                        setValue(editor.getData());
                    }}
                    config={{
                        licenseKey: "GPL",
                        placeholder: "Type your message here...",
                        toolbar: [
                            "bold",
                            "italic",
                            "underline",
                            "|",
                            "bulletedList",
                            "numberedList",
                            "|",
                            "link",
                            "|",
                            "undo",
                            "redo",
                        ],
                    }}
                />
            </div>

            <input type="hidden" name={name} value={value} />

            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}
