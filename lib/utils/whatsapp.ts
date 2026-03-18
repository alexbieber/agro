export function buildWhatsAppURL({
  phone,
  productName,
  productUrl,
  price,
  quantity,
  sku,
}: {
  phone: string;
  productName: string;
  productUrl: string;
  price: string;
  quantity: number;
  sku?: string;
}) {
  const message = `Hello Nandee Agrotech! I'm interested in ordering the following product:\n\n🌱 *Product:* ${productName}\n💰 *Price:* ₹${price}\n📦 *Quantity:* ${quantity}\n${sku ? `🔖 *SKU:* ${sku}\n` : ""}🔗 *Link:* ${productUrl}\n\nPlease confirm availability and delivery details. Thank you!`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildEnquiryURL({
  phone,
  productName,
  productUrl,
}: {
  phone: string;
  productName: string;
  productUrl: string;
}) {
  const message = `Hello Nandee Agrotech! I have a question about:\n\n🌱 *Product:* ${productName}\n🔗 *Link:* ${productUrl}\n\nCould you please share more details?`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildDistributorURL({ phone }: { phone: string }) {
  const message = `Hello Nandee Agrotech! I'm interested in becoming a distributor/dealer for your products. Please share details about your distributor program.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/** Build WhatsApp URL for placing order with multiple cart items (like nandiagrotech.com cart → WhatsApp). */
export function buildCartOrderURL({
  phone,
  items,
  siteUrl,
}: {
  phone: string;
  items: { name: string; quantity: number; sku?: string; url: string }[];
  siteUrl: string;
}) {
  const lines = items.map(
    (i) => `• ${i.name} × ${i.quantity}${i.sku ? ` (${i.sku})` : ""}\n  ${i.url}`
  );
  const message = `Hello Nandee Agrotech! I would like to place an order:\n\n${lines.join("\n\n")}\n\nPlease confirm availability and total amount. Thank you!`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export type OrderCustomerInfo = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

/** Build WhatsApp URL for cart order including customer details (sent to order number). */
export function buildCartOrderWithCustomerURL({
  phone,
  items,
  siteUrl,
  customer,
}: {
  phone: string;
  items: { name: string; quantity: number; sku?: string; url: string }[];
  siteUrl: string;
  customer: OrderCustomerInfo;
}) {
  const lines = items.map(
    (i) => `• ${i.name} × ${i.quantity}${i.sku ? ` (${i.sku})` : ""}\n  ${i.url}`
  );
  const block = [
    "Hello! I would like to place an order.",
    "",
    "📦 *ORDER:*",
    ...lines,
    "",
    "👤 *MY DETAILS:*",
    `Name: ${customer.name}`,
    `Phone / WhatsApp: ${customer.phone}`,
    `Email: ${customer.email}`,
    `Address: ${customer.address}`,
    `City: ${customer.city}`,
    `State: ${customer.state}`,
    `Pincode: ${customer.pincode}`,
    "",
    "Please confirm availability and total amount. Thank you!",
  ].join("\n");
  return `https://wa.me/${phone}?text=${encodeURIComponent(block)}`;
}

/** Build WhatsApp URL for single-product order including customer details. */
export function buildSingleOrderWithCustomerURL({
  phone,
  productName,
  productUrl,
  quantity,
  sku,
  price,
  customer,
}: {
  phone: string;
  productName: string;
  productUrl: string;
  quantity: number;
  sku?: string;
  price: string;
  customer: OrderCustomerInfo;
}) {
  const block = [
    "Hello! I would like to order the following product.",
    "",
    "📦 *PRODUCT:*",
    `• ${productName} × ${quantity}${sku ? ` (${sku})` : ""}`,
    `Price: ${price}`,
    `Link: ${productUrl}`,
    "",
    "👤 *MY DETAILS:*",
    `Name: ${customer.name}`,
    `Phone / WhatsApp: ${customer.phone}`,
    `Email: ${customer.email}`,
    `Address: ${customer.address}`,
    `City: ${customer.city}`,
    `State: ${customer.state}`,
    `Pincode: ${customer.pincode}`,
    "",
    "Please confirm availability and total amount. Thank you!",
  ].join("\n");
  return `https://wa.me/${phone}?text=${encodeURIComponent(block)}`;
}

export function buildBulkOrderURL({
  phone,
  organization,
  product,
  quantity,
  state,
  pincode,
  date,
  notes,
}: {
  phone: string;
  organization: string;
  product: string;
  quantity: string;
  state: string;
  pincode: string;
  date: string;
  notes: string;
}) {
  const message = `Hello Nandee Agrotech! Bulk Order Request:\n\n🏢 *Organization:* ${organization}\n📦 *Product:* ${product}\n🔢 *Quantity:* ${quantity}\n📅 *Required by:* ${date}\n📍 *Location:* ${state} - ${pincode}\n📝 *Notes:* ${notes}\n\nPlease send a quote. Thank you!`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
