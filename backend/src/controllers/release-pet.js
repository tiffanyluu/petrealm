// Releases a pet by removing its record from the database.

const pool = require('../config');

exports.releasePet = async (id) => {
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