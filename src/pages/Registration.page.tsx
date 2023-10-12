import AuthLayout from '../features/auth/components/AuthLayout';
import RegistrationFormComponent from '../features/auth/components/RegistrationForm.component';

const RegistrationPage = () => {
  return (
    <AuthLayout>
      <RegistrationFormComponent />
    </AuthLayout>
  );
};

export default RegistrationPage;