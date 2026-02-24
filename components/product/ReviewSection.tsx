"use client";

import { WHATSAPP_NUMBER } from "@/lib/config";

export default function ReviewSection({
  productId,
  rating,
  reviewCount,
}: {
  productId: string;
  rating: number;
  reviewCount: number;
}) {
  return (
    <div>
      <p className="text-text-secondary text-sm">
        No reviews yet. Have a question about this product? Contact us on WhatsApp and we will be happy to help.
      </p>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`I have a question about product: ${productId}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 text-primary hover:underline font-medium"
      >
        Ask on WhatsApp →
      </a>
    </div>
  );
}
