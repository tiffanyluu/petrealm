/**
 * Provides utility functions for logging and metrics.  
 * - Sets up a Winston logger with CloudWatch integration for tracking pet actions.  
 * - Includes sendMetric to publish custom metrics to AWS CloudWatch.  
 */

const { createLogger, format, transports } = require('winston');
const WinstonCloudWatch = require('winston-aws-cloudwatch');
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_REGION || 'us-east-2'
});


// Initialize CloudWatch Metrics
const cloudwatch = new AWS.CloudWatch({ region: 'us-east-2' });

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [new transports.Console()]
});

// Add CloudWatch Logging
logger.add(new WinstonCloudWatch({
    logGroupName: 'PetRealmAPI',
    logStreamName: 'pet-actions',
    awsRegion: 'us-east-2',
    jsonMessage: true
}));

// Function to send custom metrics
const sendMetric = async (metricName, value) => {
    const params = {
        Namespace: 'PetRealmMetrics',
        MetricData: [{
            MetricName: metricName,
            Unit: 'Count',
            Value: value
        }]
    };

    try {
        await cloudwatch.putMetricData(params).promise();
        console.log(`Metric sent: ${metricName} = ${value}`);
    } catch (error) {
        console.error("CloudWatch Metric Error:", error);
    }
};

module.exports = { logger, sendMetric };
