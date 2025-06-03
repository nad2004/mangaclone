import { useEffect, useState } from "react";
import useFetchAll from "@/components/hooks/useFetchAll";
import type { IUser } from "@/types/user";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
const navigate = useNavigate();
const { data: usersData, isLoading, isError, error } = useFetchAll("/users");
  const [users, setUsers] = useState<IUser[]>([]);
  const handleEdit = (user: IUser) => {
    navigate(`/admin/users/edit/${user._id}`, { state: { user } });
  };

  const handleDelete = (userId: number) => {
    // setUsers(users.filter((u) => u._id !== userId));
  };
    useEffect(() => {
        if (usersData) {
        setUsers(usersData);
        }
    }, [usersData]);
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

  return (
     <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý người dùng</h1>

      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full text-sm text-left ">
          <thead className="">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Tên</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Vai trò</th>
              <th className="px-4 py-3 font-medium text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-200 dark:border-gray-500 "
              >
                <td className="px-4 py-3">{user._id}</td>
                <td className="px-4 py-3">{user.username}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                      user.role === "admin"
                        ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-white"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-white"
                    }`}
                  >
                    {user.role === "admin" ? "Quản trị viên" : "Người dùng"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:underline"
                  >
                    Sửa
                  </button>
                  <button
                    // onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:underline"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center px-4 py-6 text-gray-500 dark:text-gray-400">
                  Không có người dùng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
