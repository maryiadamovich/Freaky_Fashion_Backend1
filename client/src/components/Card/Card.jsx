import { Link } from "react-router-dom";

export default function Card({ className, product}) {

  return (
    <Link to={`/product/${product.name.toLowerCase()}`}>
      <article className={className}>
        <div className="relative">
          <img className="w-full h-auto border" src={product.photo} alt="En ytterligare bild" />

        </div>
        <div className="flex flex-wrap">
          <span className="w-1/2 text-lg">{product.name}</span>
          <span className="w-1/2 text-right  text-lg">{product.price}</span>
          <span className="w-1/2">{product.label}</span>
        </div>
      </article>
    </Link>
  );
}