"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { WHATSAPP_NUMBER } from "@/lib/config";

export default function QASection({ productId }: { productId: string }) {
  const [question, setQuestion] = useState("");

  const handleSubmit = () => {
    if (!question.trim()) return;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Question about product ${productId}:\n\n${question.trim()}`)}`;
    window.open(url, "_blank");
    setQuestion("");
    toast.success("Opening WhatsApp – we'll reply there.");
  };

  return (
    <div>
      <p className="text-text-secondary text-sm mb-4">
        No questions yet. Ask a question and we will reply on WhatsApp.
      </p>
      <div>
        <p className="font-medium text-text-primary mb-2">Ask a Question</p>
        <textarea
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mb-2"
        />
        <Button onClick={handleSubmit} disabled={!question.trim()}>
          Ask on WhatsApp
        </Button>
      </div>
    </div>
  );
}
