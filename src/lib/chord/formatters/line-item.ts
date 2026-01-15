import type { AnalyticsLineItemInput } from "../analytics-types";
import type { LineItemFormatter } from "@chordcommerce/analytics";

const lineItemFormatter: LineItemFormatter<AnalyticsLineItemInput> = ({
  lineItem,
}) => ({
  product_id: lineItem.id,
  brand: lineItem.brand,
  name: lineItem.name,
  price: lineItem.price,
  quantity: lineItem.quantity,
  sku: lineItem.sku,
  category: lineItem.categories ? lineItem.categories[0] : undefined,
});

export default lineItemFormatter;
