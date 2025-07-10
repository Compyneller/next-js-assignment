import LoginForm from "@/components/auth/login/form";
import Container from "@/components/ui/container";

export default function Login() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Container className="flex justify-center">
        <LoginForm />
      </Container>
    </div>
  );
}
