const pool = require('../config/db.js');

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
const addPet = async (name, type) => {
    if (!name || !type) throw new Error("Pet name and type are required");
    try {
        const { rows } = await pool.query(
            'INSERT INTO public.pet_profiles (name, type, hunger, last_fed_at) VALUES ($1, $2, 100, NOW()) RETURNING *',
            [name, type]
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

module.exports = {
    getAllPets,
    getPetById,
    addPet,
    feedPet
};
