import { Link, useNavigate, Outlet } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate(); //Hook
  return (
    <>
      <h1>La tiendita</h1>
      <a href="/login">Iniciar sesión con a </a>
      <Link to="/login">Iniciar sesión con Link </Link>
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        Iniciar sesión con navigate
      </button>
      <p>
        <Link to="/contacto">Contacto</Link>
      </p>
      <p>
        <Link to="/sobre-nosotros">Sobre nosotros</Link>
      </p>
      <Outlet />
    </>
  );
}
