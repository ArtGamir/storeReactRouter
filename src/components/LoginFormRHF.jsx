import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
/*
1-importar useForm
2-obtener register y handleSubmit
3- Usar regsiter para cada input
4- Usar handleSubmit en el form en  el evento onSubmit y pasarle una función a ejecutar
*/

export default function LoginFormRHF() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  async function onSubmit(inputData) {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: inputData.username,
        password: inputData.password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const responseData = await response.json();

    // happy path
    if (responseData?.token) {
      localStorage.setItem("token", responseData.token);
      navigate("/productos");
    } else {
      setError("root", { message: "Datos invalidos" }); //root es de aplicación general para ambos inputs, de lo contrario sería username o password
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-black p-5 rounded flex flex-col justify-center items-center gap-5"
    >
      <h1>Ingresar con RHF</h1>
      <p>Usuario</p>
      <input
        type="text"
        {...register("username", {
          required: { value: true, message: "El usuario es requerido" },
          minLength: {
            value: 3,
            message: "El usuario debe tener 3 caracteres mínimo",
          },
        })}
        className={`border border-black p-2 rounded ${
          errors.username && "border-red-500 outline-red-500"
        }`}
      />
      {/* conditional rendering*/}
      {errors.username && <p>{errors.username?.message}</p>}
      <p>Contraseña</p>
      <input
        type={showPassword ? "text" : "password"}
        {...register("password", {
          required: { value: true, message: "La contraseña es requerida" },
        })}
        className={`border border-black p-2 rounded ${
          errors.password && "border-red-500 outline-red-500"
        }`}
      />
      <span onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Ocultar" : "Mostrar"} password
      </span>

      {/* conditional rendering*/}
      {errors.password && <p>{errors.password?.message}</p>}
      <input
        type="submit"
        value={isSubmitting ? "Cargando..." : "Ingresar"}
        disabled={isSubmitting}
        className="bg-blue-500 text-white w-full rounded p-2 cursor-pointer "
      />

      {/* conditional rendering*/}
      {errors.root && (
        <p className="bg-red-500 text-white">{errors.root?.message}</p>
      )}
    </form>
  );
}
