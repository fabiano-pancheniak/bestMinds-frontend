import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';

export default function UpdateProduct(){
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const URL = "https://products-api-3lvc.onrender.com"

    const params = useParams()

    useEffect(() => {
        findProduct();
      }, [])
    
    
    const findProduct = async () => {
        const res = await axios.get(`${URL}/api/products/${params.id}`)
        const { code, name, description, price } = res.data.product
        setCode(code)
        setName(name)
        setDescription(description)
        setPrice(price)
    }
    
    const updateProduct = async (e) => {
        e.preventDefault();
        if(!code || !name || !description || !price){
            setError(true)
            return
        }

        setError(false)

        const res = await axios.patch(`${URL}/api/products/${params.id}`, {
            code: code,
            name: name,
            description: description,
            price: price
        });

        if(res.status == 201){
            setSuccess(true)
        }

        setTimeout(() => {
            setSuccess(false)
          }, "3000");
      };


      return(
        <div className="novo-produto-container">
            <Link to="/" className="link-home">Página inicial</Link>
            <form onSubmit={updateProduct} className="novo-produto-form">
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
            <button type="submit" className="novo-produto-btn">Alterar produto</button>
            <span className={success ? "success-message" : "hidden"}>Produto alterado com sucesso</span>
            </form>
        </div>
    )
}