
/**
 * Konfigurasi profil pemilik portofolio.
 * Ganti nilai di file ini untuk menyesuaikan seluruh konten situs
 * (nama, kontak, sosial media, keahlian, dan kategori proyek).
 */

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "instagram" | "mail";
}

export const profile = {
  /** Nama lengkap — tampil di hero, navbar, footer, dan metadata */
  name: "Choiral Bachri Adzimi",

  /** Inisial untuk logo/monogram di navbar */
  monogram: "C",

  roleLine: "Informatika Graduate | Aspiring Full-Stack Developer",

  tagline:
    "Saya adalah lulusan S1 Informatika yang memiliki minat di bidang pengembangan website, aplikasi, dan teknologi informasi. Memiliki pengalaman dalam membangun proyek aplikasi berbasis web dan game edukasi, serta praktik langsung di bidang jaringan komputer. Didukung sertifikasi BNSP Junior Cyber Security, saya memiliki semangat untuk terus belajar, mengembangkan keterampilan, dan berkontribusi melalui solusi teknologi yang inovatif. Saat ini, saya terbuka untuk kesempatan kerja full-time maupun kontrak.",

  location: "pagerwojo, Sidoarjo",

  email: "m.choirulbahriadzimi@gmail.com",

  whatsappDisplay: "+62 857-0806-7531",

  whatsappLink: "https://wa.me/6285708067531",

  education: "S1 Informatika",

  availability: "Terbuka untuk kerja",

  avatar: "/images/projects/Profile.png",

  
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/mchoirulbahriadzimi",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/choiral-bachri-adzimi-375aa5259",
      icon: "linkedin",
    },
    {
      label: "Instagram",
      href: "https://instagram.com/m.choirulbahriadzimi",
      icon: "instagram",
    },
    {
      label: "Email",
      // mailto: membuka aplikasi email/Gmail langsung di perangkat.
      href: "mailto:m.choirulbahriadzimi@gmail.com",
      icon: "mail",
    },
  ] satisfies SocialLink[],

};

/** Paragraf pada bagian Tentang Saya. */
export const aboutParagraphs = [
  `Halo! Saya Choiral Bachri Adzimi, lulusan S1 Informatika dari Universitas Nahdlatul Ulama Sidoarjo yang berdomisili di Sidoarjo. Saya memiliki ketertarikan pada bidang pengembangan website, aplikasi, dan teknologi informasi.`,

  "Selama masa perkuliahan, saya telah mengembangkan beberapa proyek akademik, di antaranya website portofolio pribadi dan website generate code voucher berbais web dll . Saya juga memiliki pengalaman Praktik Kerja Lapangan di RSUD R.T. Notopuro Sidoarjo, dengan kegiatan yang berfokus pada simulasi, instalasi, dan pengujian jaringan komputer. Selain itu, saya memiliki sertifikasi kompetensi BNSP di bidang Keamanan Siber Muda (Junior Cyber Security).",

  "Saya merupakan pribadi yang teliti, bertanggung jawab, mampu bekerja secara mandiri maupun dalam tim, serta memiliki semangat untuk terus belajar dan mengembangkan keterampilan. Saat ini, saya terbuka terhadap kesempatan kerja full-time maupun kontrak untuk mengembangkan potensi dan memberikan kontribusi positif di lingkungan kerja profesional.",
];

/** Teknologi yang ditampilkan pada bagian Tentang Saya. */
export const aboutHighlights = [
  "HTML",
  "Java Script",
  "Next.js",
  "Node.js",
  "TypeScript",
  "Tailwind CSS",
];

export interface SkillGroup {
  title: string;
  icon: "monitor" | "smartphone" | "wrench";
  /** Tingkat penguasaan 0-100 untuk progress bar. */
  level?: number;
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend & Backend",
    icon: "monitor",
  },
  {
    title: "Microsoft Office",
    icon: "smartphone",
  },
  {
    title: "Tools & Lainnya",
    icon: "wrench",
  },
];

/**
 * Kategori utama untuk filter proyek portofolio.
 */
export const PROJECT_CATEGORIES = [
  "Web App",
  "Mobile App",
  "Game App",
  "Microsoft Office",
] as const;

/** Tipe kategori utama yang tersedia. */
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

/**
 * Daftar subkategori berdasarkan kategori utama.
 * Digunakan pada form tambah/edit proyek dan filter portofolio.
 */
export const PROJECT_SUBCATEGORIES: Record<ProjectCategory, string[]> = {
  "Web App": [],

  "Mobile App": [],

  "Game App": [],

  "Microsoft Office": [
    "Microsoft Word",
    "Microsoft Excel",
    "Microsoft PowerPoint",
    "PDF",
  ],
};
