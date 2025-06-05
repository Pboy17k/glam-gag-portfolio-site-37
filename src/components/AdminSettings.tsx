
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface AdminSettingsProps {
  bookingAvailability: boolean;
  onBookingAvailabilityChange: (availability: boolean) => void;
}

const AdminSettings = ({ bookingAvailability, onBookingAvailabilityChange }: AdminSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="booking-availability">Booking Availability</Label>
            <p className="text-sm text-muted-foreground">
              Toggle to enable or disable new bookings
            </p>
          </div>
          <Switch
            id="booking-availability"
            checked={bookingAvailability}
            onCheckedChange={onBookingAvailabilityChange}
          />
        </div>

        <div>
          <Label htmlFor="business-description">Business Description</Label>
          <Textarea
            id="business-description"
            placeholder="Update your business description..."
            defaultValue="Glow and Go is your go-to bridal and casual glam studio. We specialize in flawless skin finishes, elegant eye makeup, and defined lips that bring out confidence and radiance in every client."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contact-phone">Contact Phone</Label>
            <Input id="contact-phone" placeholder="+234 xxx xxx xxxx" />
          </div>
          <div>
            <Label htmlFor="contact-email">Contact Email</Label>
            <Input id="contact-email" type="email" placeholder="info@glowandgo.com" />
          </div>
        </div>

        <Button>Save Settings</Button>
      </CardContent>
    </Card>
  );
};

export default AdminSettings;
