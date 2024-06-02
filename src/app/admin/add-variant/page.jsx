"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { API } from "../../../../urlConfig";

const AddVariant = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [boxPerCase, setBoxPerCase] = useState("");
  const [unitsPerBox, setUnitsPerBox] = useState("");
  const [stock, setStock] = useState("");
  const [customProperties, setCustomProperties] = useState([
    { key: "", value: "" },
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${API}/product`);
      const data = await response.json();

      setProducts(data.data);
    };

    fetchProducts();
  }, []);

  const handleCustomPropertyChange = (index, event) => {
    const values = [...customProperties];
    values[index][event.target.name] = event.target.value;
    setCustomProperties(values);
  };

  const handleAddCustomProperty = () => {
    setCustomProperties([...customProperties, { key: "", value: "" }]);
  };

  const handleRemoveCustomProperty = (index) => {
    const values = [...customProperties];
    values.splice(index, 1);
    setCustomProperties(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      product: selectedProduct ? selectedProduct.value : null,
      boxPerCase: parseInt(boxPerCase),
      unitsPerBox: parseInt(unitsPerBox),
      stock: parseInt(stock),
      customProperties: customProperties.filter(
        (prop) => prop.key && prop.value
      ),
    };

    const response = await fetch(`${API}/variant/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Product added successfully!");
      // Reset form
      setSelectedProduct(null);
      setBoxPerCase("");
      setUnitsPerBox("");
      setStock("");
      setCustomProperties([{ key: "", value: "" }]);
    } else {
      alert(`Error: ${result.message}`);
    }
  };

  const productOptions = products.map((product) => ({
    value: product._id,
    label: product.name,
  }));

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-center font-bold text-xl ">Add Variant</h1>
      <form onSubmit={handleSubmit} className="max-w-md flex flex-col gap-4">
        <div className="w-full flex flex-col">
          <label>Product:</label>
          <Select
            options={productOptions}
            value={selectedProduct}
            onChange={setSelectedProduct}
            isSearchable
            required
          />
        </div>
        <div className="w-full flex flex-col">
          <label>Box Per Case:</label>
          <input
            type="number"
            value={boxPerCase}
            onChange={(e) => setBoxPerCase(e.target.value)}
            required
            className="border py-2 px-4"
          />
        </div>
        <div className="w-full flex flex-col">
          <label>Units Per Box:</label>
          <input
            type="number"
            value={unitsPerBox}
            className="border py-2 px-4"
            onChange={(e) => setUnitsPerBox(e.target.value)}
            required
          />
        </div>
        <div className="w-full flex flex-col">
          <label>Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            className="border py-2 px-4"
          />
        </div>
        <div className="w-full flex flex-col">
          <label>Custom Properties:</label>
          {customProperties.map((property, index) => (
            <div key={index}>
              <input
                type="text"
                name="key"
                placeholder="Property Key"
                value={property.key}
                className="border py-2 px-4"
                onChange={(event) => handleCustomPropertyChange(index, event)}
              />
              <input
                type="text"
                name="value"
                placeholder="Property Value"
                value={property.value}
                className="border py-2 px-4"
                onChange={(event) => handleCustomPropertyChange(index, event)}
              />
              <button
                type="button"
                onClick={() => handleRemoveCustomProperty(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddCustomProperty}>
            Add Property
          </button>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddVariant;
