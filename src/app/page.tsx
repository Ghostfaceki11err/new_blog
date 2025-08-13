import React from 'react';
import HeroSection from '@/components/home-ui/hero';
import ServicesOverview from '@/components/home-ui/services-overview';
import { FeaturedEvents } from '@/components/home-ui/featured-events';
import CommunityHighlights from '@/components/home-ui/community-highlights';
import NewsHighlights from '@/components/home-ui/news-highlights';
import Testimonials from '@/components/home-ui/testimonials';
import PartnerLogos from '@/components/home-ui/partner-logos';

// Mock Data
export const mockNewsItems = [
	{
		id: 1,
		slug: 'ega-launches-new-developer-grant',
		title: 'EGA Launches New Developer Grant Program',
		date: 'July 15, 2024',
		excerpt:
			'Supporting upcoming Ethiopian game developers with funding and mentorship...',
		imageUrl: '/images/news/news-placeholder-1.webp',
		category: 'Announcement',
    content: `
      <p>The Ethiopian Gaming Association (EGA) is thrilled to announce the launch of its new Developer Grant Program, aimed at fostering local talent and supporting the growth of the Ethiopian game development industry.</p>
      <p>This program will provide financial assistance, mentorship opportunities, and access to resources for promising game developers and studios within Ethiopia. Our goal is to empower creators to bring their innovative game ideas to life and contribute to a vibrant and sustainable gaming ecosystem.</p>
      <h2>Program Details:</h2>
      <ul>
        <li><strong>Funding:</strong> Grants ranging from 10,000 ETB to 50,000 ETB.</li>
        <li><strong>Mentorship:</strong> Access to experienced industry professionals.</li>
        <li><strong>Resources:</strong> Software licenses, development tools, and workshop access.</li>
      </ul>
      <p>Applications are now open and will close on August 30, 2024. We encourage all aspiring and established game developers in Ethiopia to apply.</p>
      <p>For more information and to apply, please visit our <a href="/get-involved/developer-grant" class="text-primary hover:underline">Developer Grant page</a>.</p>
    `,
	},
	{
		id: 2,
		slug: 'interview-with-rising-star-gamer',
		title: 'Interview with Rising Star Pro Gamer: AlphaWolf',
		date: 'July 10, 2024',
		excerpt:
			'Get to know AlphaWolf, the recent winner of the National CS2 League...',
		imageUrl: '/images/news/news-placeholder-2.webp',
		category: 'Interview',
    content: `
      <p>We sat down with AlphaWolf, the formidable talent who recently clinched the title at the National CS2 League. He shares his journey, training regimen, and thoughts on the future of esports in Ethiopia.</p>
      <h3>On His Beginnings:</h3>
      <p>"I started playing Counter-Strike when I was 13, just for fun with friends. I never imagined it would lead to this. The community back then was small, but passionate."</p>
      <h3>On Winning the League:</h3>
      <p>"It was an incredible feeling. The competition was tough, and every match was a challenge. My team and I put in countless hours, and it paid off."</p>
      <h3>Advice for Aspiring Gamers:</h3>
      <p>"Dedication and discipline are key. Treat it like any other sport. Analyze your gameplay, learn from your mistakes, and never stop improving. And most importantly, enjoy the game!"</p>
      <p>Read the full interview to learn more about AlphaWolf's strategies and his vision for Ethiopian esports.</p>
    `,
	},
	{
		id: 3,
		slug: 'game-dev-workshop-recap',
		title: 'Recap: Successful Game Development Workshop',
		date: 'July 5, 2024',
		excerpt:
			'Over 50 aspiring developers attended our latest workshop on Unity basics...',
		imageUrl: '/images/news/news-placeholder-3.webp',
		category: 'Event Recap',
    content: `
      <p>Our recent Game Development Workshop focusing on Unity basics was a resounding success! We welcomed over 50 enthusiastic aspiring developers eager to learn the fundamentals of game creation.</p>
      <p>The workshop covered topics such as:</p>
      <ul>
        <li>Introduction to the Unity Interface</li>
        <li>Basic C# Scripting for Game Logic</li>
        <li>Importing and Using Assets</li>
        <li>Building a Simple 2D Game</li>
      </ul>
      <p>Participants left with a foundational understanding of Unity and the inspiration to start their own projects. We received overwhelmingly positive feedback and are already planning our next series of workshops. Stay tuned for more opportunities to learn and grow with EGA!</p>
      <p>Thanks to all attendees and our volunteer instructors for making this event possible.</p>
    `,
	},
];
export type NewsItemType = {
  id: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  content: string;
};

const mockTestimonials = [
	{
		id: 1,
		quote:
			"EGA has been instrumental in connecting me with other developers and providing resources I wouldn't have found otherwise.",
		name: 'Abebe B.',
		role: 'Indie Game Developer',
		avatarUrl: '/images/avatars/avatar-1.webp',
	},
	{
		id: 2,
		quote:
			"The tournaments organized by EGA are top-notch! It's a great platform for competitive gamers in Ethiopia.",
		name: 'Sara G.',
		role: 'Pro Gamer',
		avatarUrl: '/images/avatars/avatar-2.webp',
	},
	{
		id: 3,
		quote:
			"As a partner, we've seen firsthand the passion and growth within the Ethiopian gaming community thanks to EGA's efforts.",
		name: 'Ethio Telecom Gaming',
		role: 'Sponsor',
		avatarUrl: '/images/avatars/avatar-3.webp',
	},
];
export type TestimonialType = (typeof mockTestimonials)[0];

// --- Mock Data for Partner Logos ---
const mockPartnerLogos = [
	{
		id: 1,
		name: 'Efuye Gela',
		logoUrl: '/assets/images/partners/efuye_gela.png',
	},
	{
		id: 2,
		name: 'Chewata Awaqi',
		logoUrl: '/assets/images/partners/chewata_awaqi.png',
	},
	
	{
		id: 3,
		name: 'Busara',
		logoUrl: '/assets/images/partners/busara.webp',
	},
	
	
];
export type PartnerLogoType = (typeof mockPartnerLogos)[0];

const HomePage = () => {
    return (
        <main className="flex-grow">
            <HeroSection />
            <ServicesOverview />
        </main>
    );
};

// Temporarily removed Navbar/Footer while diagnosing prerender issue

export default HomePage;