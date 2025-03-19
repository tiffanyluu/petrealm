"use client";

import { useEffect, useState } from 'react';
import PetCard from "./components/PetCard.js";
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function HomePage() {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // fetch pets from backend
    useEffect(() => {
        async function fetchPets() {
            try {
                const response = await fetch('http://localhost:3001/dev/pets');
                const data = await response.json();
                setPets(data);
            } catch (err) {
                throw new Error("Failed to fetch pets: " + err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchPets();
    }, []);
    
    //loading state
    if (loading) return <p>Loading pets...</p>;
    

    //render pets
    return (
        <div>
            <h1>PetRealm</h1>
            {pets.length === 0 ? (
                <p>No pets found.</p>
            ) : (
                <div>
                    {pets.map((pet) => (
                        <PetCard
                            key={pet.id}
                            name={pet.name}
                            type={pet.type}
                            hunger={pet.hunger}
                            onClick={() => router.push(`/pet/${pet.id}`)}
                        />
                    ))}
                </div>
            )}
            <Link href="/adopt">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Adopt a Pet</button>
            </Link>
        </div>
    );
}