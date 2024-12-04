import { Link } from "react-router-dom";
import placeholder from "@/assets/images/placeholder-image.jpg";
import {
  CourseType,
  SectionType,
  SubjectType,
  TeacherCreds,
} from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const SubjectCard = ({
  id,
  subject,
  teacher,
  section,
  course,
}: {
  id: number;
  subject: SubjectType;
  teacher: TeacherCreds | null;
  section: SectionType;
  course: CourseType;
}) => {
  return (
    <Link
      to={`/user/subjects/${id}`}
      className="block cursor-pointer rounded-3xl shadow-lg"
    >
      <div className="bg-white border-2 border-brand rounded-3xl overflow-hidden h-[16.53rem] hover:scale-105 transition-transform duration-150 ease-in-out">
        <div className="p-4">
          <h1 className="text-brand text-2xl font-bold line-clamp-1">
            {course.course_code + "-" + section.name}
          </h1>
          <p className="text-brand text-sm line-clamp-1">
            <b>{subject.subject_code}</b>
          </p>
          <p className="text-brand text-sm line-clamp-1">
            <b>{subject.subject_name}</b>
          </p>
          <br />
          <p className="text-brand text-sm line-clamp-1 mb-[0.48rem] w-[80%]">
            {(teacher && (
              <b>
                {teacher.ln.toUpperCase() + ", " + teacher.fn.toUpperCase()}
              </b>
            )) ||
              ""}
          </p>
        </div>

        <div className="relative flex justify-end mr-3">
          <Avatar className="w-1/4 h-auto rounded-full absolute transform -translate-y-1/2 right-0 border-2 border-DHVSU-white max-w-20 min-w-10">
            <AvatarImage
              src={teacher?.profile_picture!}
              alt="Teacher's profile"
              className="w-1/4 h-auto rounded-full absolute transform -translate-y-1/2 right-0 border-2 border-DHVSU-white max-w-20 min-w-10"
            />
            <AvatarFallback>
              {teacher &&
                teacher.fn[0].toUpperCase() + " " + teacher.ln[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="bg-brand text-dhvsu-lighter p-4 h-[8.265rem] pt-6">
          <div className="line-clamp-4">
            <p className="font-bold">{subject.subject_code}</p>
            <p>
              {course.course_code} {section.name}
            </p>
            <p className="text-sm mt-1 text-justify">{subject.subject_name}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SubjectCard;
