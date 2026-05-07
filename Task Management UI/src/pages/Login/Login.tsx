import CustomForm from "../../components/Form/Form";
import type { Field, FormValues } from "../../components/Form/types";
import { login } from "../../services/auth";

const Login = () => {
    const fields: Field[] = [
        {
            name: 'username',
            label: 'Username',
            type: 'text'
        },
        {
            name: 'password',
            label: 'Password',
            type: 'text'
        }
    ];
  const handleLogin = (values: FormValues) => {
    
      const { username, password } = values;
        if (username && password) {
            login(username as string, password as string);
        }
  };
  
  return (
    <div>
      <h2>Login</h2>
      <CustomForm fields={fields} onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
