
/**
 * SignOut Function used in sidebar.js
 */
export function signOut (val) {
    window.location.reload();
    if(val === "admin") {
        sessionStorage.removeItem('token');
    }
    else if(val === "user") {
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('userEmail');   
    }
}


export function calculatePercentage(percent, total) {
    var result = (100 * percent  ) / total;
    return Math.round(result);
}

/**
 * This function takes in the paid orders array from dashboard and calculates all the revenue
 * @param {array of paid orders from db} arr 
 * @returns 
 */
export function calculateRevenue(arr) {
    let sum = 0;
    for(var i =0;i < arr.length; i++) {
        sum += parseFloat(arr[i].revenue); 
    }
    return sum || 0;
}
