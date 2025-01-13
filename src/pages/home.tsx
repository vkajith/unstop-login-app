import ProfileCard from '@/components/profile-card';
import { useAuth } from '@/contexts/auth.context';
import { User } from '@/typings';

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="text-center">
        <div className="mb-[32px]">
          <div className="font-poppins text-[36px] font-medium leading-[48px]">Welcome to</div>
          <div className="font-poppins text-[46px] font-black leading-[63px] text-purple">
            Unstop
          </div>
        </div>
        <ProfileCard user={user as User} onLogout={logout} />
      </div>
    </div>
  );
}
