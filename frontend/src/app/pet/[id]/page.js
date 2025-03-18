"use client";
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";

async function feedPet(id) {
    const res = await fetch(`http://localhost:3001/dev/pets/${id}/feed`, {
        method: "POST"
    });
    if (!res.ok) {
        alert("Failed to feed the pet!");
        return;
    }
    const updatedPet = await res.json();
    return updatedPet;
}

export default function PetPage() {
    const params = useParams();  // Unwrap params with useParams
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function fetchPet() {
        try {
          const res = await fetch(`http://localhost:3001/dev/pets/${params.id}`);
          if (!res.ok) throw new Error(`Failed to fetch pet with ID ${params.id}`);
          const data = await res.json();
          setPet(data);
        } catch (err) {
          throw new Error("Failed to fetch pet: " + err.message);
        } finally {
          setLoading(false);
        }
      }
  
      if (params.id) {
        fetchPet();
      }
    }, [params.id]);

    async function handleFeedClick() {
        const updatedPet = await feedPet(params.id);
        if (updatedPet) {
            setPet(updatedPet);
        }
    }
  
    if (loading) return <p>Loading...</p>;
    if (!pet) return <p>Pet not found</p>;
    return (
        <div>
            <h1>Pet Profile</h1>
            <div>
                <h2>{pet.name}</h2>
                <p>Type: {pet.type}</p>
                <p>Hunger Level: {pet.hunger}</p>
                <button onClick={handleFeedClick}>Feed</button>
            </div>
        </div>
    );
}