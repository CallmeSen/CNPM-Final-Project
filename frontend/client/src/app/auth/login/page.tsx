import { Suspense } from "react";
import AuthLogin from "../../pages/auth/AuthLogin";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthLogin />
    </Suspense>
  );
};

export default LoginPage;
