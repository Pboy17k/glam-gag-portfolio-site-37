
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Service {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface AdminServicesManagerProps {
  services: Service[];
  onServicesUpdate: (services: Service[]) => void;
}

const AdminServicesManager = ({ services, onServicesUpdate }: AdminServicesManagerProps) => {
  const [isEditingService, setIsEditingService] = useState<number | null>(null);
  const { toast } = useToast();

  const handleAddService = () => {
    const newService = {
      id: Date.now(),
      name: 'New Service',
      price: 0,
      category: 'casual'
    };
    onServicesUpdate([...services, newService]);
    setIsEditingService(newService.id);
    toast({
      title: "Service Added",
      description: "New service created. Please edit the details.",
    });
  };

  const handleServiceUpdate = (serviceId: number, field: string, value: string | number) => {
    const updatedServices = services.map(service =>
      service.id === serviceId ? { ...service, [field]: value } : service
    );
    onServicesUpdate(updatedServices);
  };

  const handleSaveService = (serviceId: number) => {
    setIsEditingService(null);
    toast({
      title: "Service Saved",
      description: "Service details have been updated.",
    });
  };

  const handleDeleteService = (serviceId: number) => {
    onServicesUpdate(services.filter(service => service.id !== serviceId));
    toast({
      title: "Service Deleted",
      description: "Service has been removed.",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Services Management</CardTitle>
        <Button onClick={handleAddService}>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="border rounded-lg p-4">
              {isEditingService === service.id ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    value={service.name}
                    onChange={(e) => handleServiceUpdate(service.id, 'name', e.target.value)}
                    placeholder="Service name"
                  />
                  <Input
                    type="number"
                    value={service.price}
                    onChange={(e) => handleServiceUpdate(service.id, 'price', parseInt(e.target.value))}
                    placeholder="Price"
                  />
                  <div className="flex gap-2">
                    <Button onClick={() => handleSaveService(service.id)} size="sm">
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditingService(null)}
                      size="sm"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-muted-foreground">₦{service.price.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditingService(service.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminServicesManager;
