const pool = require('../config');
const petTypes = ["Dragon", "Unicorn", "Phoenix", "Griffin", "Pegasus"];

// Get all pets
const getAllPets = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM public.pet_profiles');
        return rows;
    } catch (error) {
        console.error("Error fetching all pets:", error);
        throw new Error("Failed to fetch pets");
    }
};

// Get pet by ID
const getPetById = async (id) => {
    if (!id) throw new Error("Pet ID is required");

    try {
        const { rows } = await pool.query('SELECT * FROM public.pet_profiles WHERE id = $1', [id]);
        return rows[0] || null;
    } catch (error) {
        console.error(`Error fetching pet with ID ${id}:`, error);
        throw new Error("Failed to fetch pet by ID");
    }
};

// Add a new pet
const addPet = async (name) => {
    if (!name) throw new Error("Pet name is required");
    const randomType = petTypes[Math.floor(Math.random() * petTypes.length)];
    try {
        const { rows } = await pool.query(
            'INSERT INTO public.pet_profiles (name, type, hunger, last_fed_at) VALUES ($1, $2, 100, NOW()) RETURNING *',
            [name, randomType]
        );
        return rows[0];
    } catch (error) {
        console.error("Error adding new pet:", error);
        throw new Error("Failed to add new pet");
    }
};


// Feed a pet (update hunger level)
const feedPet = async (id) => {
    if (!id) throw new Error("Pet ID is required");

    try {
        const now = new Date().toISOString();
        const { rows } = await pool.query(
            'UPDATE public.pet_profiles SET hunger = LEAST(hunger + 10, 100), last_fed_at = $1 WHERE id = $2 RETURNING *',
            [now, id]
        );
        return rows[0] || null;
    } catch (error) {
        console.error(`Error feeding pet with ID ${id}:`, error);
        throw new Error("Failed to feed pet");
    }
};

const releasePet = async (id) => {
    if (!id) throw new Error("Pet ID is required");

    try {
        const { rows } = await pool.query(
            'DELETE FROM public.pet_profiles WHERE id= $1 RETURNING *',
            [id]
        );
        return rows[0] || null;
    } catch (error) {
        console.error(`Error releasing pet with ID ${id}:`, error);
        throw new Error("Failed to release pet");
    }
}

module.exports = {
    getAllPets,
    getPetById,
    addPet,
    feedPet,
    releasePet
};
