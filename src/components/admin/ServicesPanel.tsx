
import AdminServicesManager from "@/components/AdminServicesManager";

interface ServicesPanelProps {
  services: any[];
  onServicesUpdate: (services: any[]) => void;
}

const ServicesPanel = ({ services, onServicesUpdate }: ServicesPanelProps) => (
  <AdminServicesManager 
    services={services}
    onServicesUpdate={onServicesUpdate}
  />
);

export default ServicesPanel;
