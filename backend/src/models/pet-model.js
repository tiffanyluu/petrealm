const pool = require('../config/db');

// Get all pets
const getAllPets = async () => {
    const { rows } = await pool.query('SELECT * FROM public.pet_profiles');
    return rows;
};

// Get pet by ID
const getPetById = async (id) => {
    const { rows } = await pool.query('SELECT * FROM public.pet_profiles WHERE id = $1', [id]);
    return rows[0] || null;
};

// Add a new pet
const addPet = async (name) => {
    const { rows } = await pool.query(
        'INSERT INTO public.pet_profiles (name, hunger, last_fed) VALUES ($1, 100, NOW()) RETURNING *',
        [name]
    );
    return rows[0];
};

// Feed a pet (update hunger level)
const feedPet = async (id) => {
    const now = new Date().toISOString();
    const { rows } = await pool.query(
        'UPDATE public.pet_profiles SET hunger = LEAST(hunger + 20, 100), last_fed = $1 WHERE id = $2 RETURNING *',
        [now, id]
    );
    return rows[0] || null;
};

module.exports = {
    getAllPets,
    getPetById,
    addPet,
    feedPet
};
