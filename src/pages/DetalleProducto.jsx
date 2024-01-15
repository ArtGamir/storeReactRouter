import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Productos from "./Productos";

export default function DetalleProducto() {
  const { id } = useParams();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDetail(data);
      });
  }, []); // Agrega `id` como dependencia para que el efecto se ejecute cuando cambie el ID

  return (
    <>
      <h1>Detalle de Producto</h1>
      <section>
        <article key={`prod-${detail.id}`}>
          <h2>{detail.title}</h2>
          <img src={detail.thumbnail} />
          <p>Description: {detail.description}</p>
          <h2>Price: ${detail.price}</h2>
          <p>Discount: {detail.discountPercentage}%</p>
          <p>Rating: {detail.rating}/5</p>
          <p>Stock: {detail.stock} units</p>
          <p>Brand: {detail.brand}</p>
        </article>
      </section>
    </>
  );
}
