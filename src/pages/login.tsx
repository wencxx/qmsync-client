import { LoginForm } from "@/forms/login-form"
import logo from '@/assets/logo.png'

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="flex flex-col items-center  gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <img src={logo} alt="website logo" />
          </div>
          <p className="font-medium uppercase text-center">QMSync</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}