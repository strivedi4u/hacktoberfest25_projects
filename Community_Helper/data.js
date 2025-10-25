const resources = [
  {
    id: 1,
    name: "Food Bank A",
    description: "Provides weekly grocery kits and hot meals to families in need.",
    location: "Pune",
    category: "Food",
    tags: ["meals", "groceries", "family"],
    contact: { phone: "+91-80000-11111", website: "https://example.org/foodbank-a" },
    address: "123 MG Road, Pune",
    hours: "Mon–Sat 9:00–17:00"
  },
  {
    id: 2,
    name: "Shelter B",
    description: "Safe temporary housing with counseling and job placement support.",
    location: "Delhi",
    category: "Shelter",
    tags: ["housing", "counseling"],
    contact: { phone: "+91-80000-22222", website: "https://example.org/shelter-b", email: "help@shelterb.org" },
    address: "45 Connaught Place, New Delhi",
    hours: "24/7"
  },
  {
    id: 3,
    name: "Volunteer Group C",
    description: "Organizes weekend cleanups and food distribution drives.",
    location: "Mumbai",
    category: "Community",
    tags: ["volunteer", "cleanup", "food-drive"],
    contact: { website: "https://example.org/volunteer-c" },
    address: "Marine Drive, Mumbai",
    hours: "Sat–Sun as scheduled"
  },
  {
    id: 4,
    name: "Food Bank D",
    description: "Distributes meals and groceries to those in need.",
    location: "Kolkata",
    category: "Food",
    tags: ["groceries", "ration"],
    contact: { phone: "+91-80000-33333" },
    address: "Park Street, Kolkata",
    hours: "Tue–Sun 10:00–16:00"
  },
  {
    id: 5,
    name: "City Health Clinic",
    description: "Free primary healthcare and vaccinations.",
    location: "Pune",
    category: "Healthcare",
    tags: ["clinic", "vaccination", "primary-care"],
    contact: { phone: "+91-80000-44444", website: "https://example.org/health-clinic" },
    address: "FC Road, Pune",
    hours: "Mon–Fri 9:00–18:00"
  },
  {
    id: 6,
    name: "Learning Hub",
    description: "After-school tutoring and scholarship guidance for students.",
    location: "Mumbai",
    category: "Education",
    tags: ["tutoring", "scholarship"],
    contact: { website: "https://example.org/learning-hub" },
    address: "Bandra, Mumbai",
    hours: "Mon–Sat 15:00–19:00"
  },
  {
    id: 7,
    name: "Legal Aid Center",
    description: "Free legal consultation for low-income individuals.",
    location: "Delhi",
    category: "Legal Aid",
    tags: ["legal", "consultation"],
    contact: { phone: "+91-80000-55555", website: "https://example.org/legal-aid" },
    address: "Saket, New Delhi",
    hours: "Mon–Fri 10:00–17:00"
  },
  {
    id: 8,
    name: "Women Support Network",
    description: "Counseling, shelter referrals, and legal support for women.",
    location: "Kolkata",
    category: "Women & Children",
    tags: ["women", "support", "legal"],
    contact: { phone: "+91-80000-66666", email: "support@wsn.org" },
    address: "Salt Lake, Kolkata",
    hours: "Mon–Sat 10:00–18:00"
  },
  {
    id: 9,
    name: "Employment Help Desk",
    description: "Resume workshops and job placement assistance.",
    location: "Bengaluru",
    category: "Employment",
    tags: ["jobs", "resume", "training"],
    contact: { website: "https://example.org/employment" },
    address: "Koramangala, Bengaluru",
    hours: "Mon–Fri 10:00–17:00"
  },
  {
    id: 10,
    name: "Mind Care Helpline",
    description: "24/7 mental health support and referrals.",
    location: "Chennai",
    category: "Mental Health",
    tags: ["helpline", "mental-health"],
    contact: { phone: "+91-80000-77777" },
    address: "Remote",
    hours: "24/7"
  },
  {
    id: 11,
    name: "Youth Sports Club",
    description: "Free weekend sports and mentorship for youth.",
    location: "Hyderabad",
    category: "Community",
    tags: ["youth", "sports", "mentorship"],
    contact: { website: "https://example.org/youth-sports" },
    address: "HITEC City, Hyderabad",
    hours: "Sat–Sun 8:00–12:00"
  },
  {
    id: 12,
    name: "Senior Care Outreach",
    description: "Home visits and medicine delivery for seniors.",
    location: "Pune",
    category: "Healthcare",
    tags: ["seniors", "home-visit"],
    contact: { phone: "+91-80000-88888" },
    address: "Kothrud, Pune",
    hours: "Mon–Sat 10:00–16:00"
  },
  {
    id: 13,
    name: "Community Kitchen",
    description: "Daily mid-day meals for anyone in need.",
    location: "Delhi",
    category: "Food",
    tags: ["mid-day meal", "free"],
    contact: { phone: "+91-80000-99999" },
    address: "Old Delhi",
    hours: "Daily 12:00–14:30"
  },
  {
    id: 14,
    name: "Tech for All",
    description: "Basic computer literacy and internet access.",
    location: "Kolkata",
    category: "Education",
    tags: ["computer", "digital"],
    contact: { website: "https://example.org/tech-for-all" },
    address: "Howrah, Kolkata",
    hours: "Mon–Fri 10:00–18:00"
  }
];
