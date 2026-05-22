// app/elearn/students/dashboard/page.tsx
import ElearnDashboardClient from "@/components/ElearnDashboardClient";

export default async function ElearnDashboardPage() {
  // Mock data - Replace with real data from your database/API later
  const stats = {
    totalCourses: 7,
    myCourses: 0,
    myQuizzes: 0,
  };

  const inProgress: any[] = [
    // You can add real enrolled courses here
  ];

  const recommended = [
    {
      id: "1",
      title: "Introduction to the Volunteer Medical Corps",
      image: "https://volunteermedicalcorps.org/elearn/instructors/images/courses/7vWQjZUTR.jpeg",
      category: "Leadership & Management",
    },
    {
      id: "2",
      title: "VMC: Prevention of Diabetes & Obesity",
      image: "https://volunteermedicalcorps.org/elearn/instructors/images/courses/sb8UD1MCE.jpg",
      category: "Clinical Training",
    },
    {
      id: "3",
      title: "Current Innovations in mCRPC",
      image: "https://volunteermedicalcorps.org/elearn/instructors/images/courses/p1NVEcC3P.png",
      category: "Clinical Training",
    },
  ];

  return (
    <ElearnDashboardClient
      stats={stats}
      inProgress={inProgress}
      recommended={recommended}
    />
  );
}