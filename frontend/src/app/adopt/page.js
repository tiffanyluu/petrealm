"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdoptPage() {
    const [name, setName] = useState('');
    const router = useRouter();

    const handleAdopt = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3001/dev/pets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ name }),
        });
        if (response.ok) {
            router.push('/');
        } else {
            alert('Failed to adopt pet');
        }
    };
    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4'>Adopt a New Pet</h1>
            <form onSubmit={handleAdopt} className='space-y-4'>
                <div>
                    <label className='block font-medium'>Pet Name:</label>
                    <input  
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className='w-full border roounded p-2'
                    />
                </div>
                <button 
                    type='submit'
                    className='bg-blue-500 text-white px-4 py-2 rounded hover: bg-blue-600'
                >
                    Adopt
                </button>
            </form>
        </div>
    );
}