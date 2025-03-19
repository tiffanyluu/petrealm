"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from "next/navigation";
import FeedButton from '../../components/FeedButton.js';
import PetImage from '../../components/PetImage.js';
import ReleaseButton from '../../components/ReleaseButton.js';
import HungerBar from '../../components/HungerBar.js';

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
    const [isBouncing, setIsBouncing] = useState(false);
    const router = useRouter();
  
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
        setIsBouncing(true);
        setTimeout(() => setIsBouncing(false), 1000); 
    }
  
    if (loading) return <p>Loading...</p>;
    if (!pet) return <p>Pet not found</p>;
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-4 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-purple-700 mb-4">{pet.name}</h1>
          <div className="bg-white border-4 border-purple-300 rounded-2xl shadow-lg p-6 w-full max-w-md">
              <div className="flex flex-col items-center">
                  <PetImage type={pet.type} isBouncing={isBouncing} />
                  <p className="text-lg text-gray-600">Type: {pet.type}</p>
              </div>
              <div className="mt-4">
                  <p className="text-lg text-gray-600">Hunger: {pet.hunger}%</p>
                  <HungerBar hunger={pet.hunger} />
              </div>
              <div className="flex justify-between mt-6">
                  <FeedButton petId={pet.id} onFeed={handleFeedClick} />
                  <ReleaseButton petId={pet.id} onRelease={() => window.location.href = '/'} />
              </div>
              <button
                  onClick={() => router.push('/')}
                  className="mt-4 w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition"
              >
                  Home
              </button>
          </div>
      </div>
  );
}