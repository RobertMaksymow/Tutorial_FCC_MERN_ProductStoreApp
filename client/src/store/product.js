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
  fetchProducts: async () => {
    const response = await fetch("/api_v1/products");
    const data = await response.json();
    set({ products: data.data });
  },
  deleteProduct: async (id) => {
    const response = await fetch(`/api_v1/products/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }

    set((prevState) => ({
      products: prevState.products.filter((product) => product._id !== id),
    }));
    return { success: true, message: data.message };
  },
  updateProduct: async (id, updatedProduct) => {
    if (
      !updatedProduct.name ||
      !updatedProduct.price ||
      !updatedProduct.image
    ) {
      return { success: false, message: "Please fill out all fields." };
    }
    const response = await fetch(`/api_v1/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await response.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }

    set((prevState) => ({
      products: prevState.products.map((product) =>
        product._id === id ? data.data : product
      ),
    }));
    return { success: true, message: data.message };
  },
}));
