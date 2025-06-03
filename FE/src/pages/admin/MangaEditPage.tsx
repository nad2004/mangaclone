import EditForm from "@/pages/admin/component/EditForm";
import { useLocation, useParams } from "react-router-dom";
import type { IStory } from "@/types/story";
export default function UserEditPage() {

  const handleUpdate = (updatedData: Record<string, any>) => {
    console.log("Dữ liệu sau khi sửa:", updatedData);
  };
    const { id } = useParams(); 
  const location = useLocation();

  const manga = location.state?.manga as IStory | undefined;

  if (!manga) {
    return <div>Không có dữ liệu người dùng. Vui lòng quay lại danh sách.</div>;
  }
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Chỉnh sửa người dùng</h1>
      <EditForm data={manga} onSubmit={handleUpdate} />
    </div>
  );
}
