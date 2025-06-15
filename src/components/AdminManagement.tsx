
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface AdminManagementProps {
  adminAccounts: { username: string; password: string }[];
  addAdminAccount: (username: string, password: string) => void;
  deleteAdminAccount: (username: string) => void;
  currentAdmin: string | null;
}

const AdminManagement = ({
  adminAccounts,
  addAdminAccount,
  deleteAdminAccount,
  currentAdmin,
}: AdminManagementProps) => {
  const [addForm, setAddForm] = useState({ username: "", password: "" });
  const { toast } = useToast();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.username.trim() || !addForm.password.trim()) {
      toast({ title: "Error", description: "Fields cannot be empty", variant: "destructive" });
      return;
    }
    if (adminAccounts.find((a) => a.username === addForm.username)) {
      toast({ title: "Error", description: "Username already exists", variant: "destructive" });
      return;
    }
    addAdminAccount(addForm.username, addForm.password);
    toast({ title: "Added", description: `Admin "${addForm.username}" created.` });
    setAddForm({ username: "", password: "" });
  };

  return (
    <div>
      <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-3 mb-8">
        <Input
          placeholder="Username"
          value={addForm.username}
          onChange={e => setAddForm(f => ({ ...f, username: e.target.value }))}
          required
        />
        <Input
          placeholder="Password"
          value={addForm.password}
          onChange={e => setAddForm(f => ({ ...f, password: e.target.value }))}
          type="password"
          required
        />
        <Button type="submit" className="md:w-auto w-full">Add Admin</Button>
      </form>
      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-left text-sm">
            <thead>
              <tr>
                <th className="p-2 border-b">Username</th>
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminAccounts.map(acc => (
                <tr key={acc.username}>
                  <td className="p-2 border-b">{acc.username}{acc.username === currentAdmin && " (You)"}</td>
                  <td className="p-2 border-b">
                    {adminAccounts.length > 1 && acc.username !== currentAdmin ? (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          deleteAdminAccount(acc.username);
                          toast({ title: "Admin removed", description: `Admin \"${acc.username}\" deleted.` });
                        }}
                      >
                        Delete
                      </Button>
                    ) : (
                      <span className="text-muted-foreground text-xs">Cannot remove</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          You cannot remove your own account while logged in or delete the last remaining admin.
        </p>
      </div>
    </div>
  );
};

export default AdminManagement;
