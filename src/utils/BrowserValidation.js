// utils/BrowserValidation.js
export const browserValidation = (activity, duration) => {
    // Check if the activity is empty or contains only numbers
    if (!activity || /^\d+$/.test(activity)) {
        return 'Activity should not be empty or contain only numbers';
    }

    // Check if the duration is valid (positive number)
    if (!duration || isNaN(duration) || duration <= 0) {
        return 'Please enter a valid duration';
    }

    // Return null or empty string if validation passes
    return '';
};
