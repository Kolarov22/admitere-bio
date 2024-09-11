import React from "react";
import { Course } from "@/types";
import { auth } from "@/auth";
import BoughtCourseCard from "@/components/BoughtCourseCard";

const getCourses = async () => {
  const response = await fetch("http://localhost:3000/api/courses");
  const data = await response.json();
  return data;
};

const CoursesPage = async () => {
  const userSession = await auth();
  const userId = userSession?.user?.id;

  const courses: Course[] = await getCourses();
  const boughtCourses = courses.filter((course) => course.users?.find((user) => user.userId === userId));
   

  return (
    <>
      <section className="container my-2">
        <h2 className="text-2xl py-12 ">Your courses</h2>
        <div className="flex justify-center md:justify-between items-center flex-wrap flex-grow gap-10 px-10">
          {boughtCourses.length > 0
            ? boughtCourses.map((course) => (
                <BoughtCourseCard key={course.id} {...course} />
              ))
            : "No courses available"}
        </div>
      </section>
    </>
  );
};

export default CoursesPage;
