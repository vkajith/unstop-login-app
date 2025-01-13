import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth.context';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Field from '@/components/ui/field';
import loginIllustration from '../assets/login-illustration.svg';
import KeyIcon from '../assets/key.svg';
import UserIcon from '../assets/account_circle.svg';
import EmailIcon from '../assets/mail.svg';
import GoogleIcon from '../assets/google.svg';
import FacebookIcon from '../assets/facebook.svg';

const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .refine((val) => val === 'emilys', 'Username must be emilys'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LocationState {
  from?: {
    pathname: string;
  };
}

const Login: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (location.pathname === '/auth/login' && isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [location, navigate, isAuthenticated]);

  const handleLogin = async (data: LoginFormData) => {
    try {
      await login(data);
      toast({
        title: 'Login successful',
        description: 'You are now logged in',
        variant: 'default',
      });
      const state = location.state as LocationState;
      const from = state?.from?.pathname || '/';
      navigate(from, { replace: true });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Please check your credentials and try again',
        variant: 'destructive',
      });
    }
  };

  const renderSocialButtons = () => (
    <div className="flex flex-col gap-2 mb-4">
      <Button
        type="button"
        variant="thridParty"
        onClick={() => {}}
        className="flex bg-background items-center text-black justify-center gap-2.5 h-[78px] px-[243px] py-[21px] rounded-2xl"
      >
        <img src={GoogleIcon} alt="Google" />
        <span>Login with Google</span>
      </Button>
      <Button
        type="button"
        variant="thridParty"
        onClick={() => {}}
        className="flex bg-background items-center text-black justify-center gap-2.5 h-[78px] px-[243px] py-[21px] rounded-2xl"
      >
        <img src={FacebookIcon} alt="Facebook" />
        <span>Login with Facebook</span>
      </Button>
    </div>
  );

  const renderFormFields = () => (
    <div className="w-full">
      <div className="mb-2">
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <Field
              icon={UserIcon}
              required
              {...field}
              label="user name"
              error={errors.username?.message}
            />
          )}
        />
      </div>
      <div className="mb-2">
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Field
              icon={EmailIcon}
              required
              {...field}
              label="email"
              error={errors.email?.message}
            />
          )}
        />
      </div>
      <div className="mb-4">
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Field
              icon={KeyIcon}
              required
              {...field}
              label="password"
              error={errors.password?.message}
            />
          )}
        />
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full bg-background-secondary">
      <div className="hidden lg:flex lg:flex-1 items-center justify-center p-8">
        <img src={loginIllustration} alt="Login illustration" className="max-w-md w-full" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 m-0 sm:m-4 lg:m-8 bg-background rounded-[20px] border border-gray-200">
        <form onSubmit={handleSubmit(handleLogin)} className="w-full max-w-[500px] lg:max-w-none">
          <div className="mb-[32px]">
            <div className="font-poppins text-[36px] font-medium leading-[48px]">Welcome to</div>
            <div className="font-poppins text-[46px] font-black leading-[63px] text-purple">
              Unstop
            </div>
          </div>

          {renderSocialButtons()}

          <div className="flex items-center gap-4 my-8">
            <div className="h-[1px] flex-1 bg-gray-200"></div>
            <span className="text-gray-500 font-medium">OR</span>
            <div className="h-[1px] flex-1 bg-gray-200"></div>
          </div>

          {renderFormFields()}

          <div className="flex items-center justify-between h-[22px] mb-[32px]">
            <div className="flex items-center">
              <Checkbox
                checked={isChecked}
                onCheckedChange={(checked: boolean) => setIsChecked(checked)}
              />
              <span className="font-poppins ml-2 text-left text-base font-normal leading-[22px]">
                Remember me
              </span>
            </div>
            <Button variant="link" type="button" onClick={() => {}} className="p-0 text-purple ">
              Forgot password?
            </Button>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple text-white py-3 h-[77px] rounded-lg hover:bg-opacity-90 transition-colors text-base"
          >
            Login
          </Button>
        </form>

        <div className="flex items-center justify-center">
          <span className="font-poppins text-base font-normal leading-[22px]">
            Don't have an account?
          </span>
          <Button variant="link" type="button" onClick={() => {}} className="p-0 text-purple">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
