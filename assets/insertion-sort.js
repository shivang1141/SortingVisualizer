async function insertionSort() {
    var i, j, key;
    await sleep(delay); // Delay before starting the sorting process

    setColor(0, SELECTED); // Highlight the first element
    await sleep(delay); // Delay after highlighting the element

    setColor(0, SORTED); // Mark the first element as sorted

    for(i = 1; i < size; i++) {
        await sleep(delay); // Delay before processing the next element

        setColor(i, SELECTED); // Highlight the current element
        await sleep(delay); // Delay after highlighting the element

        j = i - 1; // Initialize the index for comparison
        key = arr[i]; // Store the value of the current element

        while(j >= 0 && arr[j] > key) {
            setColor(j, COMPARE); // Highlight the element being compared
            await sleep(delay); // Delay after highlighting the element

            swap(j, j + 1); // Swap the elements if the previous element is greater
            setColor(j, SELECTED); // Highlight the current element after swapping
            setColor(j + 1, COMPARE); // Highlight the next element being compared
            await sleep(delay); // Delay after swapping and highlighting

            setColor(j + 1, SORTED); // Mark the next element as sorted
            await sleep(delay); // Delay after marking the element as sorted

            j--; // Move to the previous element for comparison
        }

        setColor(j + 1, SORTED); // Mark the current element as sorted
    }
}
