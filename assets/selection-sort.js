async function selectionSort() {
    var i, j, min_idx;

    for(i = 0; i < size - 1; i++) {
        await sleep(delay); // Delay before processing the next element

        min_idx = i; // Assume the current element is the minimum
        setColor(min_idx, SELECTED); // Highlight the assumed minimum element

        for(j = i + 1; j < size; j++) {
            await sleep(delay); // Delay before comparing elements

            setColor(j, COMPARE); // Highlight the element being compared

            await sleep(delay); // Delay after highlighting the element

            if(arr[j] < arr[min_idx]) {
                setColor(min_idx, UNSORTED); // Reset the color of the previous minimum element
                min_idx = j; // Update the index of the new minimum element
                setColor(min_idx, SELECTED); // Highlight the new minimum element
                await sleep(delay); // Delay after updating the minimum element
            }
            else
                setColor(j, UNSORTED); // Reset the color of the compared element if it is not the new minimum
        }

        await sleep(delay); // Delay after finding the minimum element

        if(min_idx != i) {
            setColor(i, COMPARE); // Highlight the current element for swapping
            await sleep(delay); // Delay after highlighting the element

            setColor(min_idx, COMPARE); // Highlight the minimum element for swapping
            setColor(i, SELECTED); // Highlight the current element after swapping
            swap(min_idx, i); // Swap the minimum element with the current element
            await sleep(delay); // Delay after swapping the elements
        }

        setColor(min_idx, UNSORTED); // Reset the color of the minimum element
        setColor(i, SORTED); // Mark the current element as sorted
    }

    setColor(size - 1, SORTED); // Mark the last element as sorted
}
