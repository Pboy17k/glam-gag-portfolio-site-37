
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AdminManagement from "@/components/AdminManagement";

interface AdminsPanelProps {
  adminAccounts: { username: string; password: string }[];
  addAdminAccount: (username: string, password: string) => void;
  deleteAdminAccount: (username: string) => void;
  currentAdmin: string | null;
}

const AdminsPanel = ({
  adminAccounts,
  addAdminAccount,
  deleteAdminAccount,
  currentAdmin
}: AdminsPanelProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">Admin Accounts</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <AdminManagement
          adminAccounts={adminAccounts}
          addAdminAccount={addAdminAccount}
          deleteAdminAccount={deleteAdminAccount}
          currentAdmin={currentAdmin}
        />
      </div>
    </CardContent>
  </Card>
);

export default AdminsPanel;
