"use client";
import { SelectedProductsProvider } from "@/context/SelectedProductsContext";
import { ProductProvider } from "@/context/ProductContext";

export function AppProviders({ children }) {
  return (
    <SelectedProductsProvider>
      <ProductProvider>{children}</ProductProvider>
    </SelectedProductsProvider>
  );
}
