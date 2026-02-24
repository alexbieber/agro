const items = [
  {
    title: "Vetted products",
    text: "We stock brands we trust. Every product is something we’d use ourselves.",
  },
  {
    title: "Simple ordering",
    text: "Browse online, order by phone or WhatsApp. We’ll help with sizing and bulk quotes.",
  },
  {
    title: "Real support",
    text: "Based in Turuvekere – call or visit. We’re here to sort issues and answer questions.",
  },
];

export default function WhyChoose() {
  return (
    <section className="py-12 border-t border-border bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-heading font-normal text-foreground mb-6 text-center">
          Why shop with us
        </h2>
        <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-border bg-card p-6 text-center shadow-sm"
            >
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
