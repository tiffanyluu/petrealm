// Fetches all pet profiles from the database.

const pool = require('../config');

exports.getAllPets = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM public.pet_profiles');
        return rows;
    } catch (error) {
        console.error("Error fetching all pets:", error);
        throw new Error("Failed to fetch pets");
    }
};