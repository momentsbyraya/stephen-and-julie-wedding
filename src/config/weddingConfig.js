// ========================================
// WEDDING INVITATION CONFIGURATION
// ========================================
// This file contains all the customizable content for the wedding invitation
// Simply update the values below to create a new invitation for different clients

export const weddingConfig = {
  // Basic Wedding Information
  couple: {
    bride: {
      firstName: "Julie M.",
      lastName: "Nabor",
      fullName: "Julie M. Nabor"
    },
    groom: {
      firstName: "Stephen L.",
      lastName: "Hizo",
      fullName: "Stephen L. Hizo"
    },
    together: "Julie M. Nabor & Stephen L. Hizo"
  },

  // Wedding Details
  wedding: {
    date: "2026-06-13", // YYYY-MM-DD format
    time: "3:00 PM",
    dayOfWeek: "Saturday",
    month: "June",
    day: "13",
    year: "2026"
  },

  // Venue Information
  venue: {
    ceremony: {
      name: "San Roque's Peak Resort",
      address: "Santa Maria Hill, Sta. Maria St., Barangay San Roque",
      city: "Daraga",
      state: "Albay, Philippines",
      zip: "4501",
      time: "9:00 AM",
      details: "Please arrive 30 minutes early"
    },
    reception: {
      name: "Sinandayan Sua, Camalig",
      address: "Purok 1, Sinandayan Sua, Bypass Road",
      city: "Camalig",
      state: "Albay, Philippines",
      zip: "4502",
      time: "11:00 AM",
      details: "Casual/Semi-formal attire requested"
    }
  },

  // Gift Guide (Cash / digital gifts copy)
  giftGuide: {
    message:
      'Your company is the greatest gift. Should you wish to bless us further, we would be grateful for cash gifts, which may also be shared digitally.'
  },

  // RSVP Information
  rsvp: {
    deadline: "2026-05-23",
    email: "",
    phone: "(555) 123-4567",
    website: "",
    message: "Please RSVP by May 23rd, 2026",
    /** Google Forms: Send → embed HTML → paste the form URL with ?embedded=true (remove any "how many guests" field in the form editor) */
    formEmbedUrl: ""
  },

  // Theme and Styling
  theme: {
    primaryColor: "wedding-600",
    secondaryColor: "rose-400",
    accentColor: "gold-500",
    fontFamily: "serif",
    style: "elegant" // Options: elegant, modern, rustic, vintage
  },

  // Photos and Media
  photos: {
    hero: "/assets/images/prenup/1Z6_4594.jpg",
    saveTheDate: "/assets/images/prenup/1Z6_4510.jpg",
    gallery: [
      "/assets/images/prenup/1Z6_3955.jpg",
      "/assets/images/prenup/1Z6_3989.jpg",
      "/assets/images/prenup/1Z6_4024.jpg",
      "/assets/images/prenup/1Z6_4086.jpg",
      "/assets/images/prenup/1Z6_4145.jpg",
      "/assets/images/prenup/1Z6_4186.jpg",
      "/assets/images/prenup/1Z6_4239.jpg",
      "/assets/images/prenup/1Z6_4249.jpg",
      "/assets/images/prenup/1Z6_4424.jpg",
      "/assets/images/prenup/1Z6_4510.jpg",
      "/assets/images/prenup/1Z6_4627.jpg",
      "/assets/images/prenup/1Z6_4751.jpg",
      "/assets/images/prenup/1Z6_4771.jpg",
      "/assets/images/prenup/1Z6_4925.jpg"
    ],
    background: "/assets/images/background-pattern.jpg",
    // Image shown in the section after Entourage (leave empty string to hide section)
    sectionAfterEntourage: "/assets/images/prenup/1Z6_4024.jpg",
    // Image shown in the section before Gift Guide (leave empty string to hide section)
    sectionBeforeGift: "/assets/images/prenup/1Z6_4627.jpg"
  },

  // Additional Information
  details: {
    hashtag: "",
    hashtag2: "To be added",
    uploadLink: "",
    uploadQrImage: "",
    website: "",
    registry: "https://registry.example.com",
    message: "We're excited to celebrate our special day with you!",
    covidInfo: "We're following local health guidelines. Please stay home if you're feeling unwell."
  },

  // Social Media (handles only — add links in your deployment if needed)
  social: {
    instagram: "",
    facebook: "",
    twitter: ""
  }
};

// Helper function to format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Helper function to get time remaining until wedding
export const getTimeUntilWedding = () => {
  const weddingDate = new Date(weddingConfig.wedding.date);
  const now = new Date();
  const timeDiff = weddingDate.getTime() - now.getTime();
  
  if (timeDiff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds };
}; 