import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Productos() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate;

  useEffect(() => {
    //revisión del token para autenticar que el usuario tiene permiso de acceder a la información
    const token = window.localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("https://dummyjson.com/products", {
      method: "GET",
      headers: { bearerauth: token }, //con bearerauth el backend se encarga de revisar si el token es valido
    }) //get no es necesario configurarlo, está por defecto
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);
  return (
    <>
      <h1>Productos</h1>
      <section>
        {products.map((product) => {
          return (
            <article
              key={`prod-${product.id}`}
              className="border-b border-blacK"
            >
              <h3 className="font-bold">{product.title}</h3>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <Link to={`/productos/${product.id}`}>Ver producto</Link>
            </article>
          );
        })}
      </section>
    </>
  );
}
