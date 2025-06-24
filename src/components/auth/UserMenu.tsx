
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, LogOut, Settings } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';

const UserMenu = () => {
  const { user, profile, signOut } = useAuth();

  if (!user || !profile) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-500';
      case 'doctor': return 'bg-green-500';
      case 'patient': return 'bg-blue-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 h-auto p-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="text-sm">
              {getInitials(profile.full_name || profile.email)}
            </AvatarFallback>
          </Avatar>
          <div className="text-left hidden sm:block">
            <div className="text-sm font-medium">{profile.full_name}</div>
            <div className="flex items-center gap-2">
              <Badge className={`text-xs ${getRoleBadgeColor(profile.role)} text-white`}>
                {profile.role}
              </Badge>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div>
            <div className="font-medium">{profile.full_name}</div>
            <div className="text-sm text-slate-500">{profile.email}</div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Profile Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Account Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
