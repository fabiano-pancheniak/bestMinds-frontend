import axios from "axios";
import { useState } from "react";

export default function CreateProduct(){
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    
    const createProduct = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3000/api/products", {
            code: code,
            name: name,
            description: description,
            price: price
        });
      };

      return(
        <div>
            <h2>Create note</h2>
            <form onSubmit={createProduct}>
            <input
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button type="submit">Create product</button>
            </form>
        </div>
    )
}