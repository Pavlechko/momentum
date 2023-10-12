import AuthLayout from '../features/auth/components/AuthLayout';
import LoginFormComponent from '../features/auth/components/LoginForm.component';

const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginFormComponent />
    </AuthLayout>
  );
};

export default LoginPage;