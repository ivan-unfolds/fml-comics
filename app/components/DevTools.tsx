'use client';

const DevTools = () => {
  const seedData = async () => {
    try {
      const response = await fetch('/api/seedProphecies');
      const data = await response.json();
      console.log('Seeding result:', data);
    } catch (error) {
      console.error('Seeding failed:', error);
    }
  };

  const deleteProphecies = async () => {
    try {
      const response = await fetch('/api/deleteProphecies');
      const data = await response.json();
      console.log('Delete result:', data);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  // Only render in development
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-50 space-y-2">
      <button
        onClick={seedData}
        className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
      >
        Seed Data
      </button>
      <button
        onClick={deleteProphecies}
        className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 rounded"
      >
        Delete Prophecies
      </button>
    </div>
  );
};

export default DevTools; 