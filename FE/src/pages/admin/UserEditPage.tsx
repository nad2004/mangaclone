import EditForm from "@/pages/admin/component/EditForm";
import { useLocation, useParams } from "react-router-dom";
import type { IUser } from "@/types/user"; // nếu bạn có type user
export default function UserEditPage() {

  const handleUpdate = (updatedData: Record<string, any>) => {
    console.log("Dữ liệu sau khi sửa:", updatedData);
  };
    const { id } = useParams(); // Lấy id từ URL nếu cần
  const location = useLocation();

  const user = location.state?.user as IUser | undefined;

  if (!user) {
    return <div>Không có dữ liệu người dùng. Vui lòng quay lại danh sách.</div>;
  }
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Chỉnh sửa người dùng</h1>
      <EditForm data={user} onSubmit={handleUpdate} />
    </div>
  );
}
