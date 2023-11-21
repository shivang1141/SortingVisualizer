async function partition(p, r) {
    await sleep(delay); // Delay before partitioning the subarray

    var i = p - 1; // Initialize the index for the smaller element
    setColor(r, SELECTED); // Highlight the pivot element

    for(var j = p; j < r; j++) {
        await sleep(delay); // Delay before comparing elements

        if(arr[j] <= arr[r]) {
            i++;
            swap(i, j); // Swap elements if the current element is smaller than or equal to the pivot
            setColor(j, RIGHT); // Highlight the element that is greater than the pivot
            setColor(i, LEFT); // Highlight the element that is smaller than or equal to the pivot
        }
        else
            setColor(j, RIGHT); // Highlight the element that is greater than the pivot
    }

    if(i + 1 < r) {
        await sleep(delay); // Delay before swapping the pivot to its correct position

        swap(i + 1, r); // Swap the pivot element with the element at its correct position
        setColor(r, RIGHT); // Highlight the pivot element after swapping
        setColor(i + 1, SELECTED); // Highlight the element at the pivot's correct position
    }

    await sleep(delay); // Delay after partitioning the subarray

    setColorRange(p, r, UNSORTED); // Mark the partitioned subarray as partially sorted

    return i + 1; // Return the index of the pivot element
}

async function quicksort(p, r) {
    if(p < r) {
        var q = await partition(p, r); // Partition the array and get the index of the pivot

        await quicksort(p, q - 1); // Recursively sort the left subarray

        setColorRange(p, q, SORTED); // Mark the left subarray as sorted

        await quicksort(q + 1, r); // Recursively sort the right subarray

        setColorRange(q + 1, r, SORTED); // Mark the right subarray as sorted
    }

    if(p == 0 && r == size - 1)
        await sleep(delay); // Delay after sorting the entire array
}
