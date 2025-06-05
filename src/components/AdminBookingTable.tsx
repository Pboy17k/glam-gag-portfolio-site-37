
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

interface AdminBookingTableProps {
  bookingRequests: BookingRequest[];
  onStatusUpdate: (bookingId: number, newStatus: string) => void;
}

const AdminBookingTable = ({ bookingRequests, onStatusUpdate }: AdminBookingTableProps) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="text-foreground font-semibold">Client</TableHead>
            <TableHead className="text-foreground font-semibold">Service</TableHead>
            <TableHead className="text-foreground font-semibold">Date & Time</TableHead>
            <TableHead className="text-foreground font-semibold">Contact</TableHead>
            <TableHead className="text-foreground font-semibold">Status</TableHead>
            <TableHead className="text-foreground font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookingRequests.map((booking) => (
            <TableRow key={booking.id} className="hover:bg-muted/50">
              <TableCell>
                <div>
                  <div className="font-medium text-foreground">{booking.name}</div>
                  <div className="text-sm text-muted-foreground">{booking.location}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-foreground">{booking.service}</div>
                {booking.notes && (
                  <div className="text-xs text-muted-foreground mt-1">{booking.notes}</div>
                )}
              </TableCell>
              <TableCell>
                <div className="text-foreground">{booking.date}</div>
                <div className="text-sm text-muted-foreground">{booking.time}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-foreground">{booking.phone}</div>
                <div className="text-xs text-muted-foreground">{booking.email}</div>
              </TableCell>
              <TableCell>
                <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {booking.status === 'pending' && (
                    <Button 
                      size="sm" 
                      onClick={() => onStatusUpdate(booking.id, 'confirmed')}
                    >
                      Confirm
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onStatusUpdate(booking.id, 'cancelled')}
                  >
                    Cancel
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminBookingTable;
