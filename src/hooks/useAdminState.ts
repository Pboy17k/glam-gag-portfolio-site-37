
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ADMIN_SESSION_KEY = "admin_session";
const ADMIN_ACCOUNTS_KEY = "admin_accounts";

interface AdminAccount {
  username: string;
  password: string;
}

export const useAdminState = () => {
  const { toast } = useToast();
  
  // Check admin session from localStorage
  const getSession = () => {
    try {
      const sess = localStorage.getItem(ADMIN_SESSION_KEY);
      if (sess) return JSON.parse(sess);
    } catch {}
    return null;
  };

  const [isLoggedIn, setIsLoggedIn] = useState(!!getSession());
  const [currentAdmin, setCurrentAdmin] = useState(getSession()?.username ?? null);
  const [adminAccounts, setAdminAccounts] = useState<AdminAccount[]>([]);

  // Load admin accounts from Supabase on mount
  useEffect(() => {
    const loadAdminAccounts = async () => {
      try {
        const { data: supabaseAdmins } = await supabase
          .from('admin_accounts')
          .select('*');

        if (supabaseAdmins && supabaseAdmins.length > 0) {
          setAdminAccounts(supabaseAdmins);
        } else {
          // Create default admin if none exist
          const defaultAdmin = { username: "admin", password: "glamadmin2024" };
          await supabase
            .from('admin_accounts')
            .insert([defaultAdmin]);
          setAdminAccounts([defaultAdmin]);
        }
      } catch (error) {
        console.error('Error loading admin accounts from Supabase:', error);
        // Fallback to localStorage
        let admins = [];
        try {
          const json = localStorage.getItem(ADMIN_ACCOUNTS_KEY);
          if (json) admins = JSON.parse(json);
        } catch {}
        if (!Array.isArray(admins) || admins.length === 0) {
          admins = [{ username: "admin", password: "glamadmin2024" }];
          localStorage.setItem(ADMIN_ACCOUNTS_KEY, JSON.stringify(admins));
        }
        setAdminAccounts(admins);
      }
    };

    if (isLoggedIn) {
      loadAdminAccounts();
    }
  }, [isLoggedIn]);

  // Add new admin account
  const addAdminAccount = async (username: string, password: string) => {
    if (!username.trim() || !password.trim()) {
      toast({
        title: "Error",
        description: "Username and password cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    if (adminAccounts.find(a => a.username === username)) {
      toast({
        title: "Error",
        description: "Username already exists",
        variant: "destructive",
      });
      return;
    }

    const newAdmin = { username, password };
    
    try {
      const { error } = await supabase
        .from('admin_accounts')
        .insert([newAdmin]);

      if (error) {
        console.error('Error saving admin to Supabase:', error);
        toast({
          title: "Error",
          description: "Failed to save admin account",
          variant: "destructive",
        });
        return;
      }

      const updated = [...adminAccounts, newAdmin];
      setAdminAccounts(updated);
      localStorage.setItem(ADMIN_ACCOUNTS_KEY, JSON.stringify(updated));
      
      toast({
        title: "Success",
        description: `Admin "${username}" created successfully`,
      });
    } catch (error) {
      console.error('Error adding admin account:', error);
      toast({
        title: "Error",
        description: "Failed to create admin account",
        variant: "destructive",
      });
    }
  };

  // Delete admin account
  const deleteAdminAccount = async (username: string) => {
    if (adminAccounts.length <= 1) {
      toast({
        title: "Error",
        description: "Cannot delete the last admin account",
        variant: "destructive",
      });
      return;
    }
    
    if (username === currentAdmin) {
      toast({
        title: "Error",
        description: "Cannot delete your own account while logged in",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('admin_accounts')
        .delete()
        .eq('username', username);

      if (error) {
        console.error('Error deleting admin from Supabase:', error);
        toast({
          title: "Error",
          description: "Failed to delete admin account",
          variant: "destructive",
        });
        return;
      }

      const updated = adminAccounts.filter(a => a.username !== username);
      setAdminAccounts(updated);
      localStorage.setItem(ADMIN_ACCOUNTS_KEY, JSON.stringify(updated));
      
      toast({
        title: "Success",
        description: `Admin "${username}" deleted successfully`,
      });
    } catch (error) {
      console.error('Error deleting admin account:', error);
      toast({
        title: "Error",
        description: "Failed to delete admin account",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsLoggedIn(false);
    setCurrentAdmin(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  return {
    isLoggedIn,
    currentAdmin,
    adminAccounts,
    addAdminAccount,
    deleteAdminAccount,
    handleLogout,
    setIsLoggedIn,
    setCurrentAdmin,
    getSession
  };
};
