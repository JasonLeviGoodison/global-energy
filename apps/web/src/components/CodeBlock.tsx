import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import { Select } from "@/components";

type Language = "javascript" | "go" | "bash";

type CodeBlockProps = {
  code: string;
  language: Language;
  onLanguageChange: (language: Language) => void;
  showLanguageSelector?: boolean;
};

export function CodeBlock({
  code,
  language,
  onLanguageChange,
  showLanguageSelector = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
        {showLanguageSelector && (
          <Select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            className="text-xs py-1.5 px-2 min-w-[100px] !bg-slate-800 !text-slate-200 !border-slate-700"
          >
            <option value="javascript" className="bg-slate-800">
              Node.js
            </option>
            <option value="go" className="bg-slate-800">
              Go
            </option>
            <option value="bash" className="bg-slate-800">
              Bash
            </option>
          </Select>
        )}
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors"
        >
          {copied ? (
            <Check size={16} className="text-emerald-400" />
          ) : (
            <Copy size={16} className="text-slate-400" />
          )}
        </button>
      </div>

      <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm max-h-[500px]">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "1.5rem",
            paddingTop: showLanguageSelector ? "3rem" : "1.5rem",
            background: "#1e293b", // slate-800
            fontSize: "0.75rem",
            lineHeight: "1.5",
          }}
          showLineNumbers={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
