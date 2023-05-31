async function merge(p, q, r) {
    await sleep(delay); // Delay before merging the subarrays

    var i, j;
    var n1 = q - p + 1; // Calculate the size of the left subarray
    var n2 = r - q; // Calculate the size of the right subarray
    var L = []; // Create an empty array for the left subarray
    var R = []; // Create an empty array for the right subarray

    // Copy elements from the original array to the left subarray
    for(i = 0; i < n1; i++) {
        L.push(arr[p + i]); // Push the element to the left subarray
        setColor(p + i, LEFT); // Highlight the element from the left subarray
    }

    // Copy elements from the original array to the right subarray
    for(j = 0; j < n2; j++) {
        R.push(arr[q + j + 1]); // Push the element to the right subarray
        setColor(q + j + 1, RIGHT); // Highlight the element from the right subarray
    }

    L.push(Infinity); // Add a sentinel value to mark the end of the left subarray
    R.push(Infinity); // Add a sentinel value to mark the end of the right subarray

    i = 0; // Initialize the index for the left subarray
    j = 0; // Initialize the index for the right subarray

    for(var k = p; k <= r; k++) {
        await sleep(delay); // Delay before merging each element

        if(L[i] <= R[j]) {
            arr[k] = L[i]; // Take the next element from the left subarray
            i++;
        }
        else {
            arr[k] = R[j]; // Take the next element from the right subarray
            j++;
        }

        setHeight(k, arr[k]); // Update the height of the element
        setColor(k, SELECTED); // Highlight the merged element
    }

    await sleep(delay); // Delay after merging the subarrays

    // Set the color range based on whether the merged subarray is fully sorted or not
    if(p == 0 && r == size - 1)
        setColorRange(p, r, SORTED); // Mark the merged subarray as fully sorted
    else
        setColorRange(p, r, UNSORTED); // Mark the merged subarray as partially sorted
}

async function mergeSort(p, r) {
    if(p < r) {
        var q = Math.floor( (p + r) / 2 ); // Calculate the middle index

        await mergeSort(p, q); // Recursively sort the left subarray

        await mergeSort(q + 1, r); // Recursively sort the right subarray

        await merge(p, q, r); // Merge the two sorted subarrays
    }
}
