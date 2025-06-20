
import { useEffect } from 'react';

const MapComponent = () => {
  useEffect(() => {
    // Dynamically import Leaflet to avoid SSR issues
    const loadMap = async () => {
      try {
        const L = await import('leaflet');
        const { MapContainer, TileLayer, Marker, Popup } = await import('react-leaflet');
        
        // Fix for default markers in react-leaflet
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        // Import CSS
        await import('leaflet/dist/leaflet.css');
      } catch (error) {
        console.warn('Failed to load map:', error);
      }
    };

    loadMap();
  }, []);

  // For now, return a placeholder that looks like a map
  return (
    <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center">
      <div className="text-center p-4">
        <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2"></div>
        <div className="text-sm font-medium">Glow and Go Studio</div>
        <div className="text-xs text-gray-600">Opposite SMC Central Mosque</div>
        <div className="text-xs text-gray-600">Unguwan Dosa, Kaduna</div>
        <div className="text-xs text-blue-600 mt-2 cursor-pointer" 
             onClick={() => window.open('https://maps.google.com/?q=10.5167,7.4333', '_blank')}>
          View on Google Maps
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
