import ElearnHomeClient from "@/components/ElearnHomeClient";

export default async function ElearnPage() {
  // Demo Data
  const demoCourses = [
    {
      id: "1",
      title: "VMC: Management of Retinal Disorder",
      image: "https://volunteermedicalcorps.org/elearn/instructors/images/courses/mXFMVbthS.jpg",
      price: 0,
      category: { name: "Clinical Training" },
      _count: { lessons: 1 }
    },
    {
      id: "2",
      title: "Current Innovations in Prostate Cancer (mCRPC)",
      image: "https://volunteermedicalcorps.org/elearn/instructors/images/courses/p1NVEcC3P.png",
      price: 0,
      category: { name: "Clinical Training" },
      _count: { lessons: 1 }
    },
    {
      id: "3",
      title: "VMC: Prevention of Diabetes & Obesity",
      image: "https://volunteermedicalcorps.org/elearn/instructors/images/courses/sb8UD1MCE.jpg",
      price: 0,
      category: { name: "Clinical Training" },
      _count: { lessons: 1 }
    },
    {
      id: "4",
      title: "Maintaining Spiritual & Mental Wellness",
      image: "https://volunteermedicalcorps.org/elearn/instructors/images/courses/fsPMurJ5Z.jpg",
      price: 0,
      category: { name: "Leadership & Management" },
      _count: { lessons: 1 }
    },
    {
      id: "5",
      title: "VMC: HSLHS Preparatory Media Training",
      image: "https://volunteermedicalcorps.org/elearn/instructors/images/courses/PeC1Jk3Mm.jpg",
      price: 0,
      category: { name: "Professional Skills" },
      _count: { lessons: 1 }
    },
    {
      id: "6",
      title: "Introduction to the Volunteer Medical Corps",
      image: "https://volunteermedicalcorps.org/elearn/instructors/images/courses/7vWQjZUTR.jpeg",
      price: 0,
      category: { name: "Leadership & Management" },
      _count: { lessons: 1 }
    }
  ];

  const demoCategories = [
    { id: "c1", name: "Clinical Training", _count: { courses: 12 } },
    { id: "c2", name: "First Aid", _count: { courses: 5 } },
    { id: "c3", name: "Leadership & Management", _count: { courses: 8 } },
    { id: "c4", name: "Public Health", _count: { courses: 15 } },
    { id: "c5", name: "Professional Skills", _count: { courses: 10 } }
  ];

  return <ElearnHomeClient courses={demoCourses} categories={demoCategories} />;
}
