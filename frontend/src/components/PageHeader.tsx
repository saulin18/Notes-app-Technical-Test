interface PageHeaderProps {
    onOpenCreateNote: () => void;
  }
  
  export const PageHeader = ({ onOpenCreateNote }: PageHeaderProps) => (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800">My Notes</h1>
      <button
        onClick={onOpenCreateNote}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Create New Note
      </button>
    </div>
  );