export interface Testimonial {
  id: number;
  author: string;
  rating: number;
  date: string;
  content: string;
  service: 'Aankoop' | 'Verkoop' | 'Mediation';
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    author: "Familie de Vries",
    rating: 9,
    date: "2024-01-15",
    content: "Joost heeft ons uitstekend geholpen bij de aankoop van ons droomhuis. Zijn expertise en persoonlijke aanpak waren precies wat we zochten.",
    service: "Aankoop"
  },
  {
    id: 2,
    author: "Peter van Dam",
    rating: 9.5,
    date: "2023-12-20",
    content: "Zeer tevreden over de verkoop van onze woning. Joost is professioneel, communiceert helder en heeft veel kennis van de lokale markt.",
    service: "Verkoop"
  },
  // Add more testimonials here
];
