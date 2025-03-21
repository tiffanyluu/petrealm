import HungerBar from './HungerBar.js';
import PetImage from './PetImage.js';

export default function PetCard({ name, type, hunger, onClick }) {
    return (
        <div 
            className="flex flex-col items-center justify-center p-4 border-4 border-black-300 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer bg-white"
            onClick={onClick}
        >
            <PetImage type={type} />
            <p className="text-gray-600 mt-2">{type}</p>
            <h2 className="text-xl font-bold mt-2">{name}</h2>
            <div className="mt-2 w-full text-center">
                <p className="text-gray-600">Hunger: {hunger}%</p>
                <HungerBar hunger={hunger} />
            </div>
        </div>
    );
}

