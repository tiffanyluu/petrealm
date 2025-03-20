const pool = require('../config');

exports.getPetById = async (id) => {
    if (!id) throw new Error("Pet ID is required");

    try {
        const { rows } = await pool.query('SELECT * FROM public.pet_profiles WHERE id = $1', [id]);
        return rows[0] || null;
    } catch (error) {
        console.error(`Error fetching pet with ID ${id}:`, error);
        throw new Error("Failed to fetch pet by ID");
    }
};