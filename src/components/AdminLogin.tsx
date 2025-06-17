
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ADMIN_ACCOUNTS_KEY = "admin_accounts";
const ADMIN_SESSION_KEY = "admin_session";

// Helper: get admins from Supabase or localStorage
async function getAdminAccounts() {
  try {
    // First try Supabase
    const { data: supabaseAdmins } = await supabase
      .from('admin_accounts')
      .select('*');

    if (supabaseAdmins && supabaseAdmins.length > 0) {
      return supabaseAdmins;
    }
  } catch (error) {
    console.error('Error loading from Supabase:', error);
  }

  // Fallback to localStorage
  let list = [];
  try {
    const ls = localStorage.getItem(ADMIN_ACCOUNTS_KEY);
    if (ls) list = JSON.parse(ls) || [];
  } catch {}
  
  if (Array.isArray(list) && list.length > 0) return list;
  
  // Ensure ONE default admin if empty
  const defaultAdmin = { username: "admin", password: "glamadmin2024" };
  
  // Try to save to Supabase
  try {
    await supabase.from('admin_accounts').insert([defaultAdmin]);
  } catch (error) {
    console.error('Error saving default admin to Supabase:', error);
  }
  
  localStorage.setItem(ADMIN_ACCOUNTS_KEY, JSON.stringify([defaultAdmin]));
  return [defaultAdmin];
}

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const admins = await getAdminAccounts();
      const match = admins.find(
        (acc) => acc.username === credentials.username && acc.password === credentials.password
      );

      if (match) {
        localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ username: match.username }));
        onLogin();
        toast({
          title: "Login Successful",
          description: `Welcome, ${match.username}!`,
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">Admin Login</CardTitle>
          <p className="text-muted-foreground">Access the admin dashboard</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-foreground">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="pl-10 text-foreground"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="pl-10 text-foreground"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground">
              Default: admin / glamadmin2024
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
