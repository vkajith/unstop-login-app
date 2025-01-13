import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from '@/typings';
import profileImage from '@/assets/profile-icon.png';

interface ProfileCardProps {
  user: User;
  onLogout: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, onLogout }) => {
  return (
    <div className="w-full max-w-sm bg-background rounded-lg border border-gray-200 shadow-lg p-6">
      <div className="flex flex-col items-center">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
          src={profileImage}
          alt={`${user.firstName} ${user.lastName}'s profile`}
        />
        <div className="mb-4">
          <div className="text-purple mb-1 text-xl font-medium text-foreground">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
          <div className="text-sm text-muted-foreground">{user.gender}</div>
        </div>
        <Button className="bg-purple w-[137px] h-[48px] rounded-2xl" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;
