export default function ReleaseButton ({ petId, onRelease }) {
    const handleRelease = async () => {
        const response = await fetch(`http://localhost:3001/dev/pets/${petId}`, {
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