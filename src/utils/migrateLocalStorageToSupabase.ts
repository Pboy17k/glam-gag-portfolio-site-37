
import { supabase } from "@/integrations/supabase/client";

export async function migrateLocalStorageToSupabase() {
  // BOOKING REQUESTS
  const bookingsRaw = localStorage.getItem("bookings");
  if (bookingsRaw) {
    try {
      const bookings = JSON.parse(bookingsRaw);
      if (Array.isArray(bookings) && bookings.length) {
        for (const booking of bookings) {
          // Insert booking, omit id as it is auto-generated
          const { data, error } = await supabase
            .from("bookings")
            .upsert({ data: booking }, { ignoreDuplicates: true });
          if (error) console.warn("Booking migration error:", error);
        }
      }
    } catch {}
  }

  // GALLERY ITEMS
  const galleryRaw = localStorage.getItem("galleryItems");
  if (galleryRaw) {
    try {
      const items = JSON.parse(galleryRaw);
      if (Array.isArray(items) && items.length) {
        for (const item of items) {
          const { data, error } = await supabase
            .from("gallery_items")
            .upsert({
              id: item.id,
              src: item.src,
              category: item.category,
              alt: item.alt,
              type: item.type
            }, { ignoreDuplicates: true });
          if (error) console.warn("Gallery item migration error:", error);
        }
      }
    } catch {}
  }

  // ADMIN ACCOUNTS
  const adminsRaw = localStorage.getItem("admin_accounts");
  if (adminsRaw) {
    try {
      const admins = JSON.parse(adminsRaw);
      if (Array.isArray(admins) && admins.length) {
        for (const acc of admins) {
          const { data, error } = await supabase
            .from("admin_accounts")
            .upsert({
              username: acc.username,
              password: acc.password,
            }, { ignoreDuplicates: true });
          if (error) console.warn("Admin account migration error:", error);
        }
      }
    } catch {}
  }

  // CUSTOM IMAGES
  const imagesRaw = localStorage.getItem("customImages");
  if (imagesRaw) {
    try {
      const imgMap = JSON.parse(imagesRaw);
      if (imgMap && typeof imgMap === "object") {
        for (const key of Object.keys(imgMap)) {
          const val = imgMap[key];
          const { data, error } = await supabase
            .from("custom_images")
            .upsert({
              key,
              value: val,
            }, { ignoreDuplicates: true });
          if (error) console.warn("Custom Images migration error:", error);
        }
      }
    } catch {}
  }
  return true;
}
