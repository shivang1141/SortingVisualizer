var heapSize;

// Function to calculate the left child index of a node
function left(i) {
    return 2 * i + 1;
}

// Function to calculate the right child index of a node
function right(i) {
    return 2 * i + 2;
}

// Function to maintain the max-heap property
async function maxHeapify(i) {
    var l = left(i); // Get the index of the left child
    var r = right(i); // Get the index of the right child
    var largest, temp;

    setColor(i, COMPARE); // Highlight the current node being compared
    if(l < heapSize)
        setColor(l, LEFT); // Highlight the left child if it exists
    if(r < heapSize)
        setColor(r, RIGHT); // Highlight the right child if it exists

    await sleep(delay); // Delay after highlighting the nodes

    // Find the largest among the current node and its children
    if(l < heapSize && arr[l] > arr[i])
        largest = l;
    else
        largest = i;

    if(r < heapSize && arr[r] > arr[largest])
        largest = r;

    if(l < heapSize)
        setColor(l, UNSORTED); // Reset the color of the left child
    if(r < heapSize)
        setColor(r, UNSORTED); // Reset the color of the right child
    setColor(largest, SELECTED); // Highlight the largest node

    await sleep(delay); // Delay after identifying the largest node

    if(largest != i) {
        swap(i, largest); // Swap the current node with the largest node
        setColor(largest, COMPARE); // Highlight the largest node after swapping
        setColor(i, SELECTED); // Highlight the current node after swapping
        await sleep(delay); // Delay after swapping and highlighting

        setColor(largest, UNSORTED); // Reset the color of the largest node
        setColor(i, UNSORTED); // Reset the color of the current node

        await maxHeapify(largest); // Recursively heapify the affected subtree
    }
    else
        setColor(i, UNSORTED); // Reset the color of the current node if no swaps were made
}

// Function to build a max-heap from an array
async function buildMaxHeap() {
    heapSize = size; // Set the heap size to the array size

    for(var i = Math.floor(size / 2) - 1; i >= 0; i--)
        await maxHeapify(i); // Heapify each subtree in reverse order
}

// Function to perform heapsort
async function heapsort() {
    await sleep(delay); // Delay before starting the sorting process

    await buildMaxHeap(); // Build a max-heap from the array

    for(var i = size - 1; i > 0; i--) {
        setColor(0, SELECTED); // Highlight the root node
        setColor(i, COMPARE); // Highlight the last unsorted element
        await sleep(delay); // Delay after highlighting the nodes

        setColor(0, COMPARE); // Reset the color of the root node
        setColor(i, SELECTED); // Reset the color of the last unsorted element
        swap(0, i); // Swap the root node with the last unsorted element
        heapSize--; // Reduce the heap size
        await sleep(delay); // Delay after swapping

        setColor(i, SORTED); // Mark the last unsorted element as sorted

        await maxHeapify(0); // Heapify the root node to restore the max-heap property
    }

    setColor(0, SORTED); // Mark the root node as sorted
}
