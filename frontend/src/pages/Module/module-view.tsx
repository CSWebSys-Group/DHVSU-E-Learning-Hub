import { Separator } from "@/components/ui/separator";

const ModuleView = () => {
  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-dhvsu text-4xl font-bold">Module 1</h1>
        <p className="text-md text-gray-500">Introduction to PHP</p>
      </div>
      <Separator className="mb-2" />
      <div>
        <span>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error nihil,
          dolores soluta cumque libero odio ab? Cum saepe facilis id, veniam,
          eaque nesciunt doloribus nihil, fuga alias commodi iusto temporibus.
        </span>
      </div>
    </div>
  );
};

export default ModuleView;
