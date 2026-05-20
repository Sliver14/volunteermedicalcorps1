import ElearnDashboardClient from "@/components/ElearnDashboardClient";

export default async function ElearnDashboard() {
  // Mock session
  const mockSession = {
    user: {
      id: "demo-user",
      name: "Demo Student",
      email: "student@example.com",
      image: "https://volunteermedicalcorps.org/elearn/students/images/users/default-avatar.jpg",
      role: "STUDENT"
    }
  };

  const demoEnrollments = [
    {
      id: "e1",
      progress: 65,
      course: {
        id: "1",
        title: "Introduction to the Volunteer Medical Corps",
        image: "https://volunteermedicalcorps.org/elearn/instructors/images/courses/7vWQjZUTR.jpeg",
        category: { name: "Leadership & Management" }
      }
    },
    {
      id: "e2",
      progress: 30,
      course: {
        id: "2",
        title: "Basic First Aid Training",
        image: "https://volunteermedicalcorps.org/elearn/instructors/images/courses/sb8UD1MCE.jpg",
        category: { name: "First Aid" }
      }
    }
  ];

  const demoRecommended = [
    {
      id: "r1",
      title: "Advanced Clinical Training",
      level: "Intermediate",
      image: "https://volunteermedicalcorps.org/elearn/instructors/images/courses/mXFMVbthS.jpg"
    },
    {
      id: "r2",
      title: "Public Health Management",
      level: "Advanced",
      image: "https://volunteermedicalcorps.org/elearn/instructors/images/courses/p1NVEcC3P.png"
    },
    {
      id: "r3",
      title: "Leadership in Medical Missions",
      level: "Beginner",
      image: "https://volunteermedicalcorps.org/elearn/instructors/images/courses/fsPMurJ5Z.jpg"
    }
  ];

  const demoStats = {
    totalCourses: 15,
    certificates: 2,
    learningTime: "24h"
  };

  return (
    <ElearnDashboardClient 
      session={mockSession}
      enrollments={demoEnrollments}
      recommendedCourses={demoRecommended}
      stats={demoStats}
    />
  );
}
