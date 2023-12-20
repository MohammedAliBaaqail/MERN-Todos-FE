

export const calculateTimePercentage = (startDate,endDate) => {

    
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        const current = new Date().getTime();
      
        // Total description in milliseconds
        const totalDescription = end - start;
      
        // Remaining description in milliseconds
        const remainingDescription = end - current;
      
        // Calculate the percentage of time remaining
        const percentage = ((totalDescription - remainingDescription) / totalDescription) * 100;
      
        // Ensure the percentage does not exceed 100% or fall below 0%
        const clampedPercentage = Math.min(100, Math.max(0, percentage));
      
        return {clampedPercentage};
    

}


export default calculateTimePercentage