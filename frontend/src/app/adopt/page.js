"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdoptPage() {
    const [name, setName] = useState('');
    const router = useRouter();

    const handleAdopt = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            alert('Please enter a name for your new pet.');
            return;
        }
        const response = await fetch('https://4mmbm863x4.execute-api.us-east-2.amazonaws.com/dev/pets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        });
        if (response.ok) {
            alert('Pet adopted!');
            router.push('/')
        } else {
            alert('Failed to adopt pet');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#B39DDB] to-[#AEEEEE] p-4">
            <form 
                onSubmit={handleAdopt} 
                className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm border border-gray-200"
            >
                <h1 className="text-2xl font-bold text-black-700 mb-4 text-center">Adopt a Pet</h1>
                <div className="mb-4">
                    <label htmlFor="petName" className="block text-sm font-medium text-gray-700">Pet Name</label>
                    <input 
                        id="petName"
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" 
                        placeholder="Enter pet name..." 
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition"
                >
                    Adopt
                </button>
            </form>
        </div>
    );
}
