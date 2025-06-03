import React, { useState } from "react";

interface EditFormProps {
  data: Record<string, any>;
  onSubmit: (updatedData: Record<string, any>) => void;
  selectOptions?: Record<string, string[]>; // e.g. { role: ['user', 'admin'] }
}

const isTextareaField = (key: string) =>
  ["description", "content", "bio"].includes(key.toLowerCase());

const isImageField = (key: string) =>
  ["avatar", "image", "cover", "cover_image"].includes(key.toLowerCase());

const EditForm: React.FC<EditFormProps> = ({ data, onSubmit, selectOptions = {} }) => {
  const [formData, setFormData] = useState<Record<string, any>>(data);

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImageChange = (key: string, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      handleChange(key, reader.result);
    };
    reader.readAsDataURL(file); // convert to base64 preview
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 capitalize">
            {key.replace(/_/g, " ")}
          </label>

          {typeof value === "boolean" ? (
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleChange(key, e.target.checked)}
              className="h-4 w-4"
            />
          ) : selectOptions[key] ? (
            <select
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              className="px-3 py-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
            >
              {selectOptions[key].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : isTextareaField(key) ? (
            <textarea
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              className="px-3 py-2 border rounded bg-white dark:bg-gray-800 dark:text-white min-h-[100px]"
            />
          ) : isImageField(key) ? (
            <>
              {value && (
                <img
                  src={value}
                  alt="preview"
                  className="w-32 h-32 object-cover rounded mb-2"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageChange(key, e.target.files ? e.target.files[0] : null)
                }
              />
            </>
          ) : (
            <input
              type={typeof value === "number" ? "number" : "text"}
              value={value}
              onChange={(e) =>
                handleChange(
                  key,
                  typeof value === "number" ? +e.target.value : e.target.value
                )
              }
              className="px-3 py-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Lưu
      </button>
    </form>
  );
};

export default EditForm;
