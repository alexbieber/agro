"use client";

import { Product } from "@/lib/types/product";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewSection from "./ReviewSection";
import QASection from "./QASection";
import { cn } from "@/lib/utils";

export default function ProductTabs({ product }: { product: Product }) {
  const specs = product.specifications ?? {};
  const specEntries = Object.entries(specs);

  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="flex flex-wrap gap-2 bg-muted p-1">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="usage">Usage Guide</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="qa">Q&A</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="mt-4">
        <div className="prose prose-sm max-w-none text-text-primary">
          <p>{product.description}</p>
        </div>
      </TabsContent>
      <TabsContent value="specifications" className="mt-4">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <tbody>
            {specEntries.map(([key, value]) => (
              <tr key={key} className="border-b border-border even:bg-muted/30">
                <td className="py-2 px-4 font-medium text-text-secondary w-1/3">{key}</td>
                <td className="py-2 px-4 text-text-primary">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TabsContent>
      <TabsContent value="usage" className="mt-4">
        <ol className="list-decimal list-inside space-y-2 text-text-primary">
          {product.highlights?.slice(0, 5).map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </TabsContent>
      <TabsContent value="reviews" className="mt-4">
        <ReviewSection productId={product.id} rating={product.rating} reviewCount={product.reviewCount} />
      </TabsContent>
      <TabsContent value="qa" className="mt-4">
        <QASection productId={product.id} />
      </TabsContent>
    </Tabs>
  );
}
