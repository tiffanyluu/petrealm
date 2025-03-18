"use client";

import { useEffect, useState } from 'react';
import Link from "next/link";

export default function HomePage() {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

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
                        <Link key={pet.id} href={`/pet/${pet.id}`} style={{ display: "block", margin: "10px 0" }}>
                            <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
                                <h2>{pet.name}</h2>
                                <p>Type: {pet.type}</p>
                                <p>Hunger Level: {pet.hunger}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}