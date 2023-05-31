const MIN_SIZE = 4;
const MAX_SIZE = 64;
const DEFAULT_SIZE = 32;

const MIN_SPEED = 1;
const MAX_SPEED = 4;
const DEFAULT_SPEED = 3;

const MIN = 20;
const MAX = 300;

const WAITING_TIME = 100;

const UNSORTED = 'deepskyblue';
const SORTED = 'mediumspringgreen';
const COMPARE = 'crimson';
const SELECTED = 'blueviolet';
const LEFT = 'gold';
const RIGHT = 'orangered';

var size;
var delay;

var arr = [];

var array_container_width;
var element_width;
var element_width_max;
var margin_element;

var algo_selected;

// Update the values used for calculating element widths
function updateValues() {
    array_container_width = Math.floor($("#array-container").width());
    element_width_max = Math.floor(array_container_width / 20);

    margin_element = 2;
    if (parseInt($(window).width()) < 1200)
        margin_element = 1;
}

// Calculate the width of each element in the array
function findElementWidth() {
    element_width = Math.floor(array_container_width / size);
    element_width -= 2 * margin_element;

    if (element_width > element_width_max)
        element_width = element_width_max;
}

// Create a new random array
function createArray() {
    arr = [];
    $("#array").html('');

    for (var i = 0; i < size; i++) {
        var n = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
        arr.push(n);

        var $element = $('<div>');
        $element.attr('id', "e" + i);
        $element.attr('class', "element");
        $element.css('background-color', UNSORTED);
        $element.css('width', element_width.toString() + 'px');
        $element.css('height', n.toString() + 'px');
        $element.css('margin-left', margin_element + 'px');
        $element.css('margin-right', margin_element + 'px');
        $element.appendTo("#array");
    }
}

// Set the height of an element in the array
function setHeight(id, height) {
    $("#e" + id).css('height', height);
}

// Set the color of an element in the array
function setColor(id, color) {
    $("#e" + id).css('background-color', color);
}

// Set the color of a range of elements in the array
function setColorRange(p, r, color) {
    for (var i = p; i <= r; i++)
        $("#e" + i).css('background-color', color);
}

// Swap two elements in the array and update their heights
function swap(a, b) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;

    var h1 = $("#e" + a).css('height');
    var h2 = $("#e" + b).css('height');

    setHeight(a, h2);
    setHeight(b, h1);
}

// Disable buttons while sorting is in progress
function disableOthers() {
    $("#sort").prop('disabled', true);
    $("#randomize").prop('disabled', true);
    $("#size-slider").prop('disabled', true);
}

// Enable buttons after sorting is finished
function enableOthers() {
    $("#sort").prop('disabled', false);
    $("#randomize").prop('disabled', false);
    $("#size-slider").prop('disabled', false);
}

// Sleep function to introduce delays in sorting
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

$(document).ready(function () {
    // Set the size slider attributes
    $("#size-slider").attr('min', MIN_SIZE);
    $("#size-slider").attr('max', MAX_SIZE);
    $("#size-slider").attr('value', DEFAULT_SIZE);

    // Set the speed slider attributes
    $("#speed-slider").attr('min', MIN_SPEED);
    $("#speed-slider").attr('max', MAX_SPEED);
    $("#speed-slider").attr('value', DEFAULT_SPEED);

    size = DEFAULT_SIZE;
    delay = WAITING_TIME * Math.pow(2, MAX_SPEED - DEFAULT_SPEED);

    updateValues();

    findElementWidth();
    createArray();

    // Randomize the array on button click
    $("#randomize").click(
        function () {
            createArray();
        }
    );

    // Select the sorting algorithm on button click
    $(".algo-btn").click(
        function () {
            algo_selected = $(this).html();

            $(".algo-btn-active").removeClass('algo-btn-active');
            $(this).addClass('algo-btn-active');

            $("#no-algo-warning").removeClass('display-flex');
            $("#no-algo-warning").addClass('display-none');
        }
    );

    // Sort the array on button click
    $("#sort").click(
        async function () {
            disableOthers();

            setColorRange(0, size - 1, UNSORTED);

            if (algo_selected == "Bubble Sort")
                await bubbleSort();
            else if (algo_selected == "Selection Sort")
                await selectionSort();
            else if (algo_selected == "Insertion Sort")
                await insertionSort();
            else if (algo_selected == "Merge Sort")
                await mergeSort(0, size - 1);
            else if (algo_selected == "Quicksort")
                await quicksort(0, size - 1);
            else if (algo_selected == "Heapsort")
                await heapsort();
            else {
                $("#no-algo-warning").removeClass('display-none');
                $("#no-algo-warning").addClass('display-flex');
            }

            enableOthers();
        }
    );

    // Update the array size on slider input
    $("#size-slider").on('input', function () {
        size = $(this).val();

        findElementWidth();
        createArray();
    });

    // Update the sorting speed on slider input
    $("#speed-slider").on('input', function () {
        delay = WAITING_TIME * Math.pow(2, MAX_SPEED - $(this).val());
    });

    // Update values and element widths on window resize
    $(window).resize(function () {
        if (array_container_width != Math.floor($("#array-container").width())) {
            updateValues();

            findElementWidth();

            for (var i = 0; i < size; i++) {
                $("#e" + i).css('width', element_width.toString() + 'px');
                $("#e" + i).css('margin-left', margin_element + 'px');
                $("#e" + i).css('margin-right', margin_element + 'px');
            }
        }
    });
});
