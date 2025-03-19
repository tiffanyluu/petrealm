"use client"

import { useEffect, useState } from 'react';
import PetCard from "./components/PetCard.js";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const [pets, setPets] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchPets = async () => {
            const response = await fetch('http://localhost:3001/dev/pets');
            if (response.ok) {
                const data = await response.json();
                setPets(data);
            } else {
                console.error("Failed to fetch pets");
            }
        };
        fetchPets();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-black-700">PetRealm</h1>
                <Link href="/adopt">
                    <button className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition">Adopt a Pet</button>
                </Link>
            </div>
            {pets.length === 0 ? (
                <p className="text-center text-gray-600">No pets found</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pets.map((pet) => (
                        <PetCard key={pet.id} name={pet.name} type={pet.type} hunger={pet.hunger} onClick={() => router.push(`/pet/${pet.id}`)} />
                    ))}
                </div>
            )}
        </div>
    );
}
