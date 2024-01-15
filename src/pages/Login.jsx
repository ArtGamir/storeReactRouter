import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import LoginFormRHF from "../components/LoginFormRHF";
export default function Login() {
  return (
    <main className="flex flex-col justify-center items-center p-10 gap-10">
      <h1 className="font-bold">Log in</h1>
      <LoginForm />
      <LoginFormRHF />
    </main>
  );
}
