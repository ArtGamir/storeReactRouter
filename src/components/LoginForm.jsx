import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState(""); //setUsername es una función y username es el estado
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  function onUserNameChange(event) {
    setUsername(event.target.value); // aquí se ejecuta
  }
  console.log(username);

  function onPasswordChange(event) {
    setPassword(event.target.value);
  }

  function handlePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      body: JSON.stringify({ password, username }),
      headers: { "Content-type": "application/json" }, //debemos indicar que tipo de archivo es para que la api sepa interpretarlo, de lo contrario no hará nada el string es un MIME type
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.token != null) {
          localStorage.setItem("token", data.token);
          setIsLoading(false);
          setIsFailed(false);
          navigate("/productos");
        } else {
          setIsLoading(false);
          setIsFailed(true);
        }
      });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-black p-5 rounded flex flex-col justify-center items-center gap-5"
    >
      <h1>Ingresar</h1>

      <p>Usuario</p>
      <input
        type="text"
        className="border border-black p-2 rounded"
        onChange={onUserNameChange} //conecta al input con el estado
        value={username} //el valor del input se guarda en el estado y lo puedo recuperar para usarlo en otro lado
        required //conecta el estado con el input
      />
      <p>Contraseña</p>
      <input
        type={isPasswordVisible ? "text" : "password"}
        className="border border-black p-2 rounded"
        onChange={onPasswordChange}
        value={password} //el valor del input se guarda en el estado y lo puedo recuperar para usarlo en otro lado
        required
      />

      <span
        className="text-xs text-black/50 cursor-pointer"
        onClick={handlePasswordVisibility}
      >
        {isPasswordVisible ? "Ocultar" : "Mostrar"} contraseña
      </span>

      <input
        type="submit"
        disabled={isLoading}
        value={isLoading ? "Cargando..." : "Ingresar"} //conditional rendering
        className="bg-blue-500 text-white w-full rounded p-2 cursor-pointer "
      />

      {isFailed && ( //consitional rendering
        <p className="bg-red-500 text-white p-2 rounded w-full text-center">
          Datos inválidos
        </p>
      )}
    </form>
  );
}
