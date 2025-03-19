import HungerBar from './HungerBar.js';
import PetImage from './PetImage.js';

export default function PetCard({ name, type, hunger, onClick }) {
    return (
        <div 
            className='flex justify-center p-4 border rounded-lg shadow-md hover:shadow-lg transition cursor-poointer bg-white'
            onClick={onClick}
        >
            <PetImage type={type} />
            <h2 className='text-xl font-bold'>{name}</h2>
            <p className='text-gray-600'>Type: {type}</p>
            <div className='mt-2'>
                <p className="text-gray-600">Hunger: {hunger}%</p>
                <HungerBar hunger={hunger} />
            </div>
        </div>
    );
}