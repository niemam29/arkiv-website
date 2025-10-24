'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CodeBlockProps {
  code: string;
  language: string;
  showCopy?: boolean;
  showPlayground?: boolean;
  playgroundTitle?: string;
}

export function CodeBlock({ code, language, showCopy = true, showPlayground = false, playgroundTitle }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlayground = () => {
    // Map titles to playground examples
    const exampleMap: Record<string, string> = {
      'Connect to Golem DB': 'connect',
      'Create Entity': 'create',
      'Query Entities': 'query'
    };
    
    const exampleKey = exampleMap[playgroundTitle || ''];
    if (exampleKey) {
      // Store which example to open
      sessionStorage.setItem('playgroundExample', exampleKey);
      sessionStorage.setItem('playgroundLanguage', language);
    } else {
      // For custom code, store the actual code
      sessionStorage.setItem('playgroundCode', code);
      sessionStorage.setItem('playgroundLanguage', language);
      if (playgroundTitle) {
        sessionStorage.setItem('playgroundTitle', playgroundTitle);
      }
    }
    router.push('/playground');
  };

  return (
    <div className="relative group">
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        {showPlayground && (language === 'typescript' || language === 'javascript' || language === 'python') && (
          <Button
            size="sm"
            variant="ghost"
            onClick={handlePlayground}
            className="text-purple-400 hover:text-purple-300"
            title="Try in Playground"
          >
            <Play className="h-4 w-4" />
          </Button>
        )}
        {showCopy && (
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '8px 12px',
          borderRadius: 0,
          background: '#1e1e1e',
          fontSize: '14px',
          overflow: 'auto',
        }}
        showLineNumbers={true}
        wrapLongLines={false}
        lineProps={{style: {wordBreak: 'normal', whiteSpace: 'pre'}}}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}