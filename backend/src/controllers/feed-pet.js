const pool = require('../config');

exports.feedPet = async (id) => {
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