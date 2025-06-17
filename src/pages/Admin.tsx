
import AdminLogin from '@/components/AdminLogin';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabs from '@/components/admin/AdminTabs';
import { useAdminState } from '@/hooks/useAdminState';
import { useAdminData } from '@/hooks/useAdminData';

const Admin = () => {
  const {
    isLoggedIn,
    currentAdmin,
    adminAccounts,
    addAdminAccount,
    deleteAdminAccount,
    handleLogout,
    setIsLoggedIn,
    setCurrentAdmin,
    getSession
  } = useAdminState();

  const {
    bookingRequests,
    bookingAvailability,
    services,
    galleryItems,
    handleStatusUpdate,
    handleGalleryItemsUpdate,
    setBookingAvailability,
    setServices
  } = useAdminData(isLoggedIn);

  if (!isLoggedIn) {
    return (
      <AdminLogin 
        onLogin={() => { 
          setIsLoggedIn(true); 
          setCurrentAdmin(getSession()?.username ?? null); 
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdminHeader onLogout={handleLogout} />
        <AdminTabs
          bookingRequests={bookingRequests}
          onStatusUpdate={handleStatusUpdate}
          galleryItems={galleryItems}
          onGalleryItemsUpdate={handleGalleryItemsUpdate}
          services={services}
          onServicesUpdate={setServices}
          bookingAvailability={bookingAvailability}
          onBookingAvailabilityChange={setBookingAvailability}
          adminAccounts={adminAccounts}
          addAdminAccount={addAdminAccount}
          deleteAdminAccount={deleteAdminAccount}
          currentAdmin={currentAdmin}
        />
      </div>
    </div>
  );
};

export default Admin;
