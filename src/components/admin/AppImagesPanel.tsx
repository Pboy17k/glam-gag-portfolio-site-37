
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const IMAGE_KEYS = [
  {
    key: "aboutProfile",
    label: "About Page Profile Image",
    description: "Image used for the About section's makeup artist profile.",
    default:
      "/lovable-uploads/0debc043-5d1d-4ec7-a3c6-3c492c6b0cd6.png",
  },
  {
    key: "homeHeroBg",
    label: "Home Hero Background",
    description: "Image used in the background of the homepage hero section.",
    default:
      "/lovable-uploads/cd837cf5-3f94-4026-977d-d24bc7fc2861.png",
  },
  // Add more keys/descriptions as you discover them in the app
];

const LOCAL_STORAGE_KEY = "customImages";

type ImagesMap = Record<string, string>;

const AppImagesPanel = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<ImagesMap>({});

  useEffect(() => {
    const json = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (json) {
      try {
        setImages(JSON.parse(json));
      } catch {
        setImages({});
      }
    }
  }, []);

  const handleUpload = (key: string, file: File) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      if (e.target?.result) {
        const localImages: ImagesMap = { ...images, [key]: e.target.result as string };
        setImages(localImages);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localImages));
        toast({
          title: "Image Updated",
          description: "Your new image has been saved!",
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReset = (key: string) => {
    const updated = { ...images };
    delete updated[key];
    setImages(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    toast({
      title: "Image Reset",
      description: "Reverted to default image.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>App Images</CardTitle>
        <p className="text-muted-foreground text-sm mt-2">
          Change images (profile, hero, etc) used throughout the site. Changes will reflect instantly for all visitors.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-10">
          {IMAGE_KEYS.map((item) => {
            const current = images[item.key] ?? item.default;
            return (
              <div key={item.key} className="flex flex-col md:flex-row items-center gap-8 border p-4 rounded-xl bg-muted/10">
                <img
                  src={current}
                  alt={item.label}
                  className="w-32 h-32 rounded-lg border object-cover bg-white"
                />
                <div className="flex-1 space-y-2">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground mb-2">{item.description}</div>
                  <Input
                    type="file"
                    accept="image/*"
                    className="mb-2"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) handleUpload(item.key, file);
                    }}
                  />
                  <Button variant="destructive" size="sm" onClick={() => handleReset(item.key)}>
                    Reset to Default
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppImagesPanel;
