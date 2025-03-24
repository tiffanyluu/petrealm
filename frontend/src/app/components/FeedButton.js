// Button component to feed pet.

export default function FeedButton({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
      >
        Feed
      </button>
    );
  }
  