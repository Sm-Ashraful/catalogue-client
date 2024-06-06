"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { API } from "../../../../urlConfig";

const AddVariant = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [boxPerCase, setBoxPerCase] = useState("");
  const [unitsPerBox, setUnitsPerBox] = useState("");
  const [productImage, setProductImage] = useState(null);
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

    // Create a FormData object
    const formData = new FormData();
    formData.append("product", selectedProduct ? selectedProduct.value : null);
    formData.append("boxPerCase", parseInt(boxPerCase));
    formData.append("unitsPerBox", parseInt(unitsPerBox));
    formData.append("stock", parseInt(stock));
    formData.append("image", productImage);

    customProperties
      .filter((prop) => prop.key && prop.value)
      .forEach((prop, index) => {
        formData.append(`customProperties[${index}][key]`, prop.key);
        formData.append(`customProperties[${index}][value]`, prop.value);
      });

    const response = await fetch(`${API}/variant/add`, {
      method: "POST",
      body: formData,
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
    <div className="flex flex-col justify-center items-center mb-5">
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
          <label>Product Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProductImage(e.target.files[0])}
            required
            className="border py-2 "
          />
        </div>
        <div className="w-full flex flex-col">
          <label>Custom Properties:</label>
          {customProperties.map((property, index) => (
            <div key={index} className="w-full">
              <div className="flex gap-5 w-full">
                <input
                  type="text"
                  name="key"
                  placeholder="Property Key"
                  value={property.key}
                  className="border py-2 px-4 w-1/2"
                  onChange={(event) => handleCustomPropertyChange(index, event)}
                />
                <input
                  type="text"
                  name="value"
                  placeholder="Property Value"
                  value={property.value}
                  className="border py-2 px-4 w-1/2"
                  onChange={(event) => handleCustomPropertyChange(index, event)}
                />
              </div>

              <button
                type="button"
                onClick={() => handleRemoveCustomProperty(index)}
                className="text-red-400 px-2 py-1 mt-2 underline"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddCustomProperty}
            className="bg-blue-400 px-2 py-1 w-fit mt-4"
          >
            Add New Property
          </button>
        </div>
        <button type="submit" className="bg-amber-500 py-1.5 text-white">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddVariant;
