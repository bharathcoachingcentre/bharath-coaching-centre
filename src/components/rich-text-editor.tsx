"use client";

import React, { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current || quillRef.current) return;

    const initQuill = async () => {
      try {
        const { default: Quill } = await import("quill");
        
        if (!containerRef.current) return;

        const quill = new Quill(containerRef.current, {
          theme: "snow",
          placeholder: placeholder || "Start writing...",
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
            ],
          },
        });

        quillRef.current = quill;

        if (value) {
          quill.root.innerHTML = value;
        }

        quill.on("text-change", () => {
          const html = quill.root.innerHTML;
          // Prevent infinite loops and handle empty state properly
          if (html === '<p><br></p>') {
            onChange("");
          } else {
            onChange(html);
          }
        });
      } catch (err) {
        console.error("Quill initialization failed:", err);
      }
    };

    initQuill();
  }, [isMounted, placeholder]);

  // Sync external value changes into the editor
  useEffect(() => {
    if (quillRef.current && value !== undefined) {
      const currentContents = quillRef.current.root.innerHTML;
      if (value !== currentContents) {
        // Prevent unnecessary updates for empty states
        if (value === "" && currentContents === '<p><br></p>') return;
        quillRef.current.root.innerHTML = value || "";
      }
    }
  }, [value]);

  if (!isMounted) {
    return <div className="h-64 w-full bg-gray-50 animate-pulse rounded-xl border border-gray-100" />;
  }

  return (
    <div className="rich-text-editor-container">
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        <div ref={containerRef} />
      </div>
      <style jsx global>{`
        .rich-text-editor-container .ql-toolbar.ql-snow {
          border: none;
          border-bottom: 1px solid #f3f4f6;
          background: #f9fafb;
          padding: 12px 16px;
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
        }
        .rich-text-editor-container .ql-container.ql-snow {
          border: none;
          min-height: 300px;
          font-family: inherit;
          font-size: 16px;
        }
        .rich-text-editor-container .ql-editor {
          min-height: 300px;
          padding: 24px;
          line-height: 1.6;
        }
        .rich-text-editor-container .ql-editor.ql-blank::before {
          font-style: normal;
          color: #9ca3af;
          left: 24px;
        }
        .rich-text-editor-container .ql-editor h1,
        .rich-text-editor-container .ql-editor h2,
        .rich-text-editor-container .ql-editor h3 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          font-weight: 700;
          color: #111827;
        }
        .rich-text-editor-container .ql-editor p {
          margin-bottom: 1em;
        }
      `}</style>
    </div>
  );
}
