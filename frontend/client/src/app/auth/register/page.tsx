import { Suspense } from "react";
import AuthRegister from "../../pages/auth/AuthRegister";

const RegisterPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthRegister />
    </Suspense>
  );
};

export default RegisterPage;
