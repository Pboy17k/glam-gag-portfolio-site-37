
import { Card } from '@/components/ui/card';

interface BookingRequest {
  id: number;
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  location: string;
  notes: string;
  status: string;
  createdAt: string;
}

interface AdminBookingStatsProps {
  bookingRequests: BookingRequest[];
}

const AdminBookingStats = ({ bookingRequests }: AdminBookingStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <Card className="p-4 bg-greyviolet-50 dark:bg-greyviolet-950/30 border-greyviolet-200 dark:border-greyviolet-800">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {bookingRequests.filter(b => b.status === 'pending').length}
          </div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </div>
      </Card>
      <Card className="p-4 bg-greyviolet-50 dark:bg-greyviolet-950/30 border-greyviolet-200 dark:border-greyviolet-800">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {bookingRequests.filter(b => b.status === 'confirmed').length}
          </div>
          <div className="text-sm text-muted-foreground">Confirmed</div>
        </div>
      </Card>
      <Card className="p-4 bg-greyviolet-50 dark:bg-greyviolet-950/30 border-greyviolet-200 dark:border-greyviolet-800">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {bookingRequests.length}
          </div>
          <div className="text-sm text-muted-foreground">Total</div>
        </div>
      </Card>
    </div>
  );
};

export default AdminBookingStats;
