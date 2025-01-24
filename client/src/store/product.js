import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill out all fields." };
    }
    const response = await fetch("/api_v1/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    console.log("body", JSON.stringify(newProduct));

    const data = await response.json();
    console.log("data", data);

    set((prevState) => ({ products: [...prevState.products, data.data] }));
    return { success: true, message: "Product created successfully" };
  },
}));
