// components/EditNoteModal.tsx
import { useForm } from "react-hook-form";

interface EditNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTitle: string;
  initialContent: string;
  onSubmit: (data: { title: string; content: string }) => void;
  isSubmitting: boolean;
}

export function EditNoteModal({
  isOpen,
  onClose,
  initialTitle,
  initialContent,
  onSubmit,
  isSubmitting
}: EditNoteModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: initialTitle,
      content: initialContent
    }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 className="text-lg font-bold mb-4">Edit Note</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className={`w-full p-2 border rounded ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              {...register("content", { required: "Content is required" })}
              className={`w-full p-2 border rounded ${
                errors.content ? "border-red-500" : "border-gray-300"
              }`}
              rows={4}
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
            )}
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}