/**
 * This page is a dynamic route, where the pet ID is extracted from the URL to fetch and display details for each unique pet.
 * It handles actions like feeding and releasing the pet, ensuring the UI updates accordingly.
 */

"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import FeedButton from "../../components/FeedButton.jsx";
import PetImage from "../../components/PetImage.jsx";
import ReleaseButton from "../../components/ReleaseButton.jsx";
import HungerBar from "../../components/HungerBar.jsx";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function feedPet(id) {
  const res = await fetch(`${apiUrl}/pets/${id}/feed`, {
    method: "POST",
  });
  if (!res.ok) {
    alert("Failed to feed the pet!");
    return;
  }
  const updatedPet = await res.json();
  return updatedPet;
}

export default function PetPage() {
  const params = useParams(); // Unwrap params with useParams
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBouncing, setIsBouncing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchPet() {
      try {
        const res = await fetch(`${apiUrl}/pets/${params.id}`);
        if (!res.ok)
          throw new Error(`Failed to fetch pet with ID ${params.id}`);
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
    <div className="min-h-screen bg-gradient-to-br from-[#B39DDB] to-[#AEEEEE] p-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-black-700 mb-4">{pet.name}</h1>
      <div className="bg-white border-4 border-black-300 rounded-2xl shadow-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center">
          <PetImage type={pet.type} isBouncing={isBouncing} />
          <p className="text-lg text-gray-600">Type: {pet.type}</p>
        </div>
        <div className="mt-4">
          <p className="text-lg text-gray-600">Hunger: {pet.hunger}%</p>
          <HungerBar hunger={pet.hunger} />
        </div>
        <div className="flex justify-between mt-6">
          <FeedButton petId={pet.id} onClick={handleFeedClick} />
          <ReleaseButton
            petId={pet.id}
            onRelease={() => (window.location.href = "/")}
          />
        </div>
        <button
          onClick={() => router.push("/")}
          className="mt-4 w-full bg-purple-400 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition"
        >
          Home
        </button>
      </div>
    </div>
  );
}
