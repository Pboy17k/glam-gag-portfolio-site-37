
import AdminSettings from "@/components/AdminSettings";

interface SettingsPanelProps {
  bookingAvailability: boolean;
  onBookingAvailabilityChange: (val: boolean) => void;
}

const SettingsPanel = ({ bookingAvailability, onBookingAvailabilityChange }: SettingsPanelProps) => (
  <AdminSettings 
    bookingAvailability={bookingAvailability}
    onBookingAvailabilityChange={onBookingAvailabilityChange}
  />
);

export default SettingsPanel;
