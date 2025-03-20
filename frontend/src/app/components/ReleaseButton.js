export default function ReleaseButton ({ petId, onRelease }) {
    const handleRelease = async () => {
        const response = await fetch(`https://4mmbm863x4.execute-api.us-east-2.amazonaws.com/dev/pets/${petId}`, {
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