async function bubbleSort() {
    var i, j;
    await sleep(delay); // Delay before starting the sorting process

    for(i = 0; i < size - 1; i++) {
        for(j = 0; j < size - i - 1; j++) {
            await sleep(delay); // Delay before comparing the elements

            setColor(j, COMPARE); // Highlight the current element being compared
            setColor(j + 1, COMPARE); // Highlight the next element being compared
            await sleep(delay); // Delay after highlighting the elements

            if(arr[j] > arr[j + 1]) {
                swap(j, j + 1); // Swap the elements if they are in the wrong order
                await sleep(delay); // Delay after swapping the elements
            }

            setColor(j, UNSORTED); // Reset the color of the compared elements
            setColor(j + 1, UNSORTED); // Reset the color of the compared elements
        }

        await sleep(delay); // Delay after completing one pass of inner loop

        setColor(j, SORTED); // Mark the last element of the pass as sorted
    }

    setColor(0, SORTED); // Mark the first element as sorted
}
