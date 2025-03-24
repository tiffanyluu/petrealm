/**
 * Applies hunger decay to all pets by decreasing their hunger value by 5, with a minimum value of 0.
 * Logs the process and sends metrics to CloudWatch.
 */

const pool = require('../config');
const { logger, sendMetric } = require('../utils');

exports.hungerDecay = async (event) => {
    logger.info('Hunger decay function started');
    try {
        const {rowCount} = await pool.query(
            'UPDATE public.pet_profiles SET hunger = GREATEST(hunger - 5, 0) RETURNING id;'
        );
        logger.info(`Updated hunger for ${rowCount} pets`);
        sendMetric("Hunger decay success", rowCount);
        logger.info('Hunger decay function completed successfully');
        return { message: "Hunger decay applied successfully!" };
    } catch (err) {
        logger.error('Error applying hunger decay:', err);
        sendMetric("Hunger Decay Failure", 1);
    }
}