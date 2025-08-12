import Input from "../../../components/Input";
import Button from "../../../components/Button";

function Login() {
  return (
    <>
      <div className="flex flex-col w-full space-y-2">
        <div className="flex w-full justify-center">
          <h1 className="text-2xl w-fit font-bold bg-gradient-to-r from-azul to-azul_escuro to-80% bg-clip-text text-transparent">
            Login
          </h1>
        </div>
        <Input label={"Usuário"} placeHolder={"Digite seu username"}></Input>
        <Input label={"Senha"} placeHolder={"*********"}></Input>
        <a className="text-azul text-xs font-medium">
          Esqueceu a senha ou não tem login?
        </a>
        <div className="w-full flex justify-center ">
          <Button
            classes={
              "bg-gradient-to-r from-azul to-azul_escuro w-fit py-2.5 px-16 !mt-2.5"
            }
          >
            Entrar
          </Button>
        </div>
      </div>
    </>
  );
}

export default Login;
