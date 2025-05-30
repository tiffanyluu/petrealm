/**
 * This file defines the HomePage component, the main page of PetRealm.
 * It fetches all pets from the backend when the page loads and displays them in a grid.
 * Each pet is shown using the PetCard component, and clicking a pet takes you to its profile page.
 * There’s also a button to adopt a new pet that links to the adoption page.
 */

"use client"

import { useEffect, useState } from 'react';
import PetCard from "./components/PetCard.js";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const [pets, setPets] = useState([]);
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchPets = async () => {
            const response = await fetch(`${apiUrl}/pets`);
            console.log("API URL:", apiUrl);
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
        <div className="min-h-screen bg-gradient-to-br from-[#B39DDB] to-[#AEEEEE] p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-black drop-shadow-[0_0_6px_rgba(138,43,226,0.3)]">PetRealm</h1>
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
