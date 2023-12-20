import axios from "axios";
import { useState } from "react";
import "./css/create-product.css"
import { Link } from "react-router-dom";

export default function CreateProduct(){
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    
    const createProduct = async (e) => {
        e.preventDefault();
        if(!code || !name || !description || !price){
            setError(true)
            return
        }

        setError(false)
        const res = await axios.post("http://localhost:3000/api/products", {
            code: code,
            name: name,
            description: description,
            price: price
        });
        
        if(res.status == 201){
            setCode('')
            setName('')
            setDescription('')
            setPrice('')
            setSuccess(true)
        }

        setTimeout(() => {
            setSuccess(false)
          }, "3000");
      };

      return(
        <div className="novo-produto-container">
            <Link to="/" className="link-home">Página inicial</Link>
            <form onSubmit={createProduct} className="novo-produto-form">
            <label>
                Código:
                <br/>
                <input
                    className={code.length == 0 && error ? "error" : ""}
                    name="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    />
            </label>
            <label>
                Nome:
                <br/>
                <input
                    className={name.length == 0 && error ? "error" : ""}
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
            </label>
            <label>
                Descrição:
                <br/>
                <textarea
                    className={description.length == 0 && error ? "error" : ""}
                    name="description"
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
            </label>
            <label>
                Preço:
                <br/>
                <input
                    type="number"
                    className={price.length == 0 && error ? "error" : ""}
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </label>
            <button type="submit" className="novo-produto-btn">Cadastrar produto</button>
            <span className={success ? "success-message" : "hidden"}>Produto cadastrado com sucesso</span>
            </form>
        </div>
    )
}