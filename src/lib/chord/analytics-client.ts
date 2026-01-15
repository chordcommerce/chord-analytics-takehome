import { ChordAnalytics } from "@chordcommerce/analytics";

import cartFormatter from "./formatters/cart";
import checkoutFormatter from "./formatters/checkout";
import lineItemFormatter from "./formatters/line-item";
import productFormatter from "./formatters/product";

import type { AnalyticsChordInputs } from "./analytics-types";
import type { ChordAnalyticsOptions } from "@chordcommerce/analytics";

export const createChordOptions = (
  currency: string,
  locale: string
): ChordAnalyticsOptions => ({
  cdpDomain: import.meta.env.VITE_CHORD_CDP_DOMAIN,
  cdpWriteKey: import.meta.env.VITE_CHORD_CDP_WRITE_KEY,

  debug: true,
  enableLogging: true,
  formatters: {
    objects: {
      cart: cartFormatter,
      checkout: checkoutFormatter,
      lineItem: lineItemFormatter,
      product: productFormatter,
    },
  },
  metadata: {
    i18n: {
      currency,
      locale,
    },
    ownership: {
      omsId: "123",
      storeId: "456",
      tenantId: "789",
    },
    platform: {
      name: "chord",
      type: "web",
    },
    store: {
      domain: "https://example-plant-shop.com",
    },
  },
});

export const createChordClient = (
  currency: string,
  locale: string
): ChordAnalytics<AnalyticsChordInputs> => {
  const options = createChordOptions(currency, locale);
  return new ChordAnalytics<AnalyticsChordInputs>(options);
};
