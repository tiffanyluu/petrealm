export default function ReleaseButton ({ petId, onRelease }) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const handleRelease = async () => {
        const response = await fetch(`${apiUrl}/pets/${petId}`, {
            method: "DELETE",      
        });
        if (response.ok) {
            alert("Pet released!");
            onRelease();
        } else {
            alert("Failed to release pet");
        }
    };
    return (
        <button 
            onClick={handleRelease} 
            className='bg-red-500 text-white p-2 rounded-lg shadow-md hover:scale-105 transition-transform'
        >
            Release
        </button>
    );
};