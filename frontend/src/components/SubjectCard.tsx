import { Link } from "react-router-dom";
import { Subject } from "@/lib/types";
import placeholder from "@/assets/images/placeholder-image.jpg";

const SubjectCard = ({
  id,
  subject_code,
  subject_name,
  profileImage,
}: Subject) => {
  return (
    <Link
      to={`/subjects/${id}`}
      className="block cursor-pointer rounded-3xl shadow-lg"
    >
      <div className="bg-white border-2 border-brand rounded-3xl overflow-hidden h-[16.53rem] hover:scale-105 transition-transform duration-150 ease-in-out">
        <div className="p-4">
          <h1 className="text-brand text-2xl font-bold line-clamp-1">
            {subject_code}
          </h1>
          <p className="text-brand text-sm line-clamp-1">{subject_name}</p>
          <p className="text-brand text-sm line-clamp-1">BSCS 3B</p>
          <p className="text-brand text-sm line-clamp-1 mb-[0.48rem] w-[80%]">
            OCAMPO, RAMONSITO D.
          </p>
        </div>

        <div className="relative flex justify-end mr-3">
          {profileImage ? (
            <img src={profileImage} />
          ) : (
            <img
              src={placeholder}
              className="w-1/4 h-auto rounded-full absolute transform -translate-y-1/2 right-0 border-2 border-DHVSU-white max-w-20 min-w-10"
            />
          )}
        </div>

        <div className="bg-brand text-dhvsu-lighter p-4 h-[8.265rem] pt-6">
          <div className="line-clamp-4">
            <p className="font-bold">Due Oct 2, 11:59</p>
            <p className="text-sm mt-1 text-justify">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
              natus quis explicabo eligendi veniam vitae praesentium, magnam
              neque distinctio exercitationem iusto. Nulla est quasi eveniet
              officiis id! Eaque, neque soluta?
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SubjectCard;
