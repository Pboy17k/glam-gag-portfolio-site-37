
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminBookingStats from '@/components/AdminBookingStats';
import AdminBookingTable from '@/components/AdminBookingTable';

interface BookingsPanelProps {
  bookingRequests: any[];
  onStatusUpdate: (bookingId: number, newStatus: string) => void;
}

const BookingsPanel = ({ bookingRequests, onStatusUpdate }: BookingsPanelProps) => (
  <Card className="bg-card border-border">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-card-foreground">
        <Calendar className="h-5 w-5" />
        Booking Management
      </CardTitle>
    </CardHeader>
    <CardContent>
      <AdminBookingStats bookingRequests={bookingRequests} />
      <AdminBookingTable 
        bookingRequests={bookingRequests}
        onStatusUpdate={onStatusUpdate}
      />
    </CardContent>
  </Card>
);

export default BookingsPanel;
