const primaryColor = "#014955";
const secondaryColor = "#39A6A3";
const finalColor = "#FFE268";
const resetColor = "#FFC93C";
const container = document.querySelector(".data-container");
const ham = document.querySelector("#ham");
const dropUL = document.querySelector("#navMenu");
ham.addEventListener("click", () => {
  ham.classList.toggle("active");
  dropUL.classList.toggle("active");
});

function generatebars(num = 20) {
  for (let i = 0; i < num; i += 1) {
    const value = Math.floor(Math.random() * 100) + 1;
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value * 3}px`;
    bar.style.transform = `translateX(${i * 30}px)`;
    const barLabel = document.createElement("label");
    barLabel.classList.add("bar__id");
    barLabel.innerHTML = value;
    bar.appendChild(barLabel);
    container.appendChild(bar);
  }
 
}
document.addEventListener("DOMContentLoaded", function () {
  let algorithm = location.hash.substring(1);
  document.getElementById("algorithmSelect").value = algorithm;
  window.addEventListener("hashchange", changeAlgorithm());
  
  function validateArrayInput(input) {
    try {
      if (!input.trim()) {
        throw new Error("Input is empty.");
      }

      const array = JSON.parse(input);

      if (!Array.isArray(array)) {
        throw new Error("Input is not a valid array.");
      }

      return array;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }
  function generateBarsFromArray(array) {
    const container = document.querySelector(".data-container");
    container.innerHTML = "";

    array.forEach((value, i) => {
      const bar = document.createElement("div");
      bar.classList.add("bar");
      bar.style.height = `${value * 3}px`;
      bar.style.transform = `translateX(${i * 30}px)`;
      const barLabel = document.createElement("label");
      barLabel.classList.add("bar__id");
      barLabel.innerHTML = value;
      bar.appendChild(barLabel);
      container.appendChild(bar);
    });
  }

  function generateBarsFromInput() {
    const userInput = document.getElementById("userInput").value;
    const validatedArray = validateArrayInput(userInput);

    if (validatedArray) {
      generateBarsFromArray(validatedArray);
    }
    localStorage.setItem("userArray", validatedArray);
  }

  document
    .getElementById("btnUser")
    .addEventListener("click", generateBarsFromInput);
});

generatebars();

function generate() {
  window.location.reload();
}

function disable() {
  setTimeout(() => {
    document.getElementById("Button1").disabled = true;
    document.getElementById("Button1").style.backgroundColor = "#B2AB8C;";

    document.getElementById("start").disabled = true;
    document.getElementById("start").style.backgroundColor = "#B2AB8C";
  }, 100);
}

function enable() {
  document.getElementById("Button1").disabled = false;
  document.getElementById("Button1").style.backgroundColor = finalColor;
  document.getElementById("Button1").style.font = "#black";

  document.getElementById("start").disabled = false;
  document.getElementById("start").style.backgroundColor = finalColor;
  document.getElementById("Button1").style.font = "#black";
}

async function ShellSort(delay = 300) {
  let bars = document.querySelectorAll(".bar");
  let comparisons = 0;
  let swaps = 0;

  for (
    let gap = Math.floor(bars.length / 2);
    gap > 0;
    gap = Math.floor(gap / 2)
  ) {
    await new Promise((resolve) => setTimeout(resolve, delay));

    for (let i = gap; i < bars.length; i++) {
      let tempValue = parseInt(bars[i].childNodes[0].innerHTML);
      let tempHeight = bars[i].style.height;
      let tempText = bars[i].childNodes[0].innerText;
      let j;

      for (
        j = i;
        j >= gap && parseInt(bars[j - gap].childNodes[0].innerHTML) > tempValue;
        j -= gap
      ) {
        comparisons += 1;
        swaps += 1;

        bars[j].style.height = bars[j - gap].style.height;
        bars[j].childNodes[0].innerText = bars[j - gap].childNodes[0].innerText;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      comparisons += 1;

      bars[j].style.backgroundColor = secondaryColor;
      bars[j].style.height = tempHeight;
      bars[j].childNodes[0].innerText = tempText;

      await new Promise((resolve) => setTimeout(resolve, delay));

      bars[j].style.backgroundColor = primaryColor;
    }
  }

  for (let x = 0; x < bars.length; x++) {
    bars[x].style.backgroundColor = resetColor;
  }

  enable();

  console.log(`Comparisons: ${comparisons}, Swaps: ${swaps}`);
  const totalTime = delay * (comparisons + swaps);
  console.log(`Total Time Taken: ${totalTime / 1000} seconds`);
  document.getElementById("totalTime").textContent = `Time complexity = ${
    totalTime / 1000
  } seconds`;
}

async function SelectionSort(delay = 200) {
  let comparisons = 0;
  let swaps = 0;
  let bars = document.querySelectorAll(".bar");
  for (var i = 0; i < bars.length; i += 1) {
    let i_outer = i;

    bars[i].style.backgroundColor = primaryColor;
    for (var j = i + 1; j < bars.length; j += 1) {
      bars[j].style.backgroundColor = secondaryColor;
      await new Promise((resolve) => setTimeout(resolve, delay));
      comparisons += 1;
      var val1 = parseInt(bars[j].childNodes[0].innerHTML);
      var val2 = parseInt(bars[i_outer].childNodes[0].innerHTML);

      if (val1 < val2) {
        if (i_outer !== i) bars[i_outer].style.backgroundColor = primaryColor;
        i_outer = j;
      } else bars[j].style.backgroundColor = primaryColor;
    }
    swaps += 1;
    var temp1 = bars[i_outer].style.height; 
    var temp2 = bars[i_outer].childNodes[0].innerText; 
    bars[i_outer].style.height = bars[i].style.height; 
    bars[i].style.height = temp1; 
    bars[i_outer].childNodes[0].innerText = bars[i].childNodes[0].innerText; 
    bars[i].childNodes[0].innerText = temp2; 

    await new Promise((resolve) => setTimeout(resolve, delay));

    bars[i_outer].style.backgroundColor = finalColor;
    bars[i].style.backgroundColor = primaryColor;
  }
  for (var x = 0; x < bars.length; x++)
    bars[x].style.backgroundColor = "#FFC93C";

  enable();
  console.log(`Comparisons: ${comparisons}, Swaps: ${swaps}`);
  const totalTime = delay * (comparisons + swaps);
  console.log(`Total Time Taken: ${totalTime / 1000} seconds`);
  document.getElementById("totalTime").textContent = `Time complexity = ${
    totalTime / 1000
  } seconds`;
}

async function InsertionSort(delay = 100) {
  let bars = document.querySelectorAll(".bar");
  let comparisons = 0;
  let swaps = 0;

  bars[0].style.backgroundColor = primaryColor;

  for (let i = 1; i < bars.length; i += 1) {
    let j = i - 1;
    let key = parseInt(bars[i].childNodes[0].innerHTML);
    let height = bars[i].style.height;

    bars[i].style.backgroundColor = secondaryColor;
    await new Promise((resolve) => setTimeout(resolve, delay));

    while (j >= 0 && parseInt(bars[j].childNodes[0].innerHTML) > key) {
      bars[j].style.backgroundColor = secondaryColor;
      bars[j + 1].style.height = bars[j].style.height;
      bars[j + 1].childNodes[0].innerText = bars[j].childNodes[0].innerText;

      j = j - 1;
      comparisons += 1;
      swaps += 1;

      await new Promise((resolve) => setTimeout(resolve, delay));

      for (let k = i; k >= 0; k--) {
        bars[k].style.backgroundColor = primaryColor;
      }
    }

    bars[j + 1].style.height = height;
    bars[j + 1].childNodes[0].innerHTML = key;

    await new Promise((resolve) => setTimeout(resolve, delay));
    bars[i].style.backgroundColor = finalColor;
  }

  for (let x = 0; x < bars.length; x++) {
    bars[x].style.backgroundColor = resetColor;
  }

  enable();

  console.log(`Comparisons: ${comparisons}, Swaps: ${swaps}`);
  const totalTime = delay * (comparisons + swaps);
  console.log(`Total Time Taken: ${totalTime / 1000} seconds`);
  document.getElementById("totalTime").textContent = `Time complexity = ${
    totalTime / 1000
  } seconds`;
}

function swap(el1, el2) {
  return new Promise((resolve) => {
    var temp = el1.style.transform;
    el1.style.transform = el2.style.transform;
    el2.style.transform = temp;

    window.requestAnimationFrame(function () {
      setTimeout(() => {
        container.insertBefore(el2, el1);
        resolve();
      }, 300);
    });
  });
}

async function BubbleSort(delay = 300) {
  let bars = document.querySelectorAll(".bar");
  // bars[0].style.backgroundColor = primaryColor;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < bars.length; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      comparisons += 1;
      bars[j].style.backgroundColor = secondaryColor;
      bars[j + 1].style.backgroundColor = secondaryColor;
      await new Promise((resolve) => setTimeout(resolve, delay));

      var value1 = Number(bars[j].childNodes[0].innerHTML);
      var value2 = Number(bars[j + 1].childNodes[0].innerHTML);

      if (value1 > value2) {
        await swap(bars[j], bars[j + 1]);
        swaps += 1;
        bars = document.querySelectorAll(".bar");
      }
      bars[j].style.backgroundColor = primaryColor;
      bars[j + 1].style.backgroundColor = primaryColor;
    }

    bars[bars.length - i - 1].style.backgroundColor = finalColor;
  }
  // for (var x = 0; x < 20; x++) enable();

  console.log(`Comparisons: ${comparisons}, Swaps: ${swaps}`);
  // Calculate the total time taken
  const totalTime = delay * (comparisons + swaps);
  console.log(`Total Time Taken: ${totalTime / 1000} seconds`);
  document.getElementById("totalTime").textContent = `Time complexety =${
    totalTime / 1000
  } seconds`;
}

async function Heapify(bars, n, i) {
  var largest = i;
  var l = 2 * i + 1;
  var r = 2 * i + 2;

  if (
    l < n &&
    Number(bars[l].childNodes[0].innerHTML) >
      Number(bars[largest].childNodes[0].innerHTML)
  )
    largest = l;

  if (
    r < n &&
    Number(bars[r].childNodes[0].innerHTML) >
      Number(bars[largest].childNodes[0].innerHTML)
  )
    largest = r;

  if (largest != i) {
    var temp1 = bars[i].style.height;
    var temp2 = bars[i].childNodes[0].innerText;
    bars[i].style.height = bars[largest].style.height;
    bars[i].style.backgroundColor = "#014955";
    bars[largest].style.height = temp1;
    bars[i].childNodes[0].innerText = bars[largest].childNodes[0].innerText;
    bars[largest].childNodes[0].innerText = temp2;

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 250)
    );

    await Heapify(bars, n, largest);
  }
}

async function HeapSort() {
  let bars = document.querySelectorAll(".bar");
  let n = bars.length;

  for (var i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await Heapify(bars, n, i);
  }

  for (var i = n - 1; i > 0; i--) {
    var temp1 = bars[i].style.height;
    var temp2 = bars[i].childNodes[0].innerText;
    bars[i].style.height = bars[0].style.height;
    bars[i].style.backgroundColor = "#FFE268";
    bars[0].style.height = temp1;
    bars[i].childNodes[0].innerText = bars[0].childNodes[0].innerText;
    bars[0].childNodes[0].innerText = temp2;

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 250)
    );

    await Heapify(bars, i, 0);
  }
  document.querySelector("#start").disabled = false;
  document.querySelector("#Button1").disabled = false;
  document.querySelector("#start").style.backgroundColor = "#124d53";
}

let comparisons = 0;
let swaps = 0;
async function lometo_partition(l, r, delay = 100) {
  let bars = document.querySelectorAll(".bar");
  if (l < 0 || r >= bars.length || l >= r) {
    return;
  }

  var pivot = Number(bars[r].childNodes[0].innerHTML);
  var i = l - 1;
  bars[r].style.backgroundColor = "#FFE268";

  for (var j = l; j <= r - 1; j++) {
    bars[j].style.backgroundColor = "#FFE268";
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, delay)
    );

    var value = Number(bars[j].childNodes[0].innerHTML);
    comparisons += 1;
    if (value < pivot) {
      i++;
      await swapBars(bars, i, j, delay);
      swaps += 1;
    } else {
      bars[j].style.backgroundColor = "#39A6A3";
    }
  }

  i++;
  await swapBars(bars, i, r, delay);
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, delay)
  );

  for (var k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "#FFC93C";
  }
  return i;
}

async function QuickSort(l, r, delay = 100, startTime) {
  let bars = document.querySelectorAll(".bar");
  let comparisons = 0;
  let swaps = 0;
  if (l < r) {
    var pivot_idx = await lometo_partition(l, r, delay);
    await QuickSort(l, pivot_idx - 1, delay, startTime);
    await QuickSort(pivot_idx + 1, r, delay, startTime);
  }
  comparisons += document.querySelectorAll(".bar").length - 1;
  swaps += document.querySelectorAll(".bar").length - 1;

  // Calculate total time and display it
  let endTime = new Date().getTime();
  let timeTaken = endTime - startTime;
  console.log(`Comparisons: ${comparisons}, Swaps: ${swaps}`);
  document.getElementById("totalTime").textContent = `Time Taken: ${
    timeTaken / 1000
  } Seconds`;
}

function startQuickSort() {
  disable();
  let bars = document.querySelectorAll(".bar");
  let startTime = new Date().getTime();
  QuickSort(0, bars.length - 1, 100, startTime);
}

async function swapBars(bars, i, j, delay) {
  var temp1 = bars[i].style.height;
  var temp2 = bars[i].childNodes[0].innerText;
  bars[i].style.height = bars[j].style.height;
  bars[j].style.height = temp1;
  bars[i].childNodes[0].innerText = bars[j].childNodes[0].innerText;
  bars[j].childNodes[0].innerText = temp2;
  bars[i].style.backgroundColor = primaryColor;
  if (i != j) bars[j].style.backgroundColor = secondaryColor;

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, delay)
  );
}

function changeAlgorithm() {
  let selected = document.querySelector("#algorithmSelect").value;
  let title = document.querySelector("#title");
  let algorithmDefintion = document.querySelector("#def").textContent;
  let theory = document.querySelector(".theoryDivContainer").innerHTML;
  let start = document.querySelector("#start");
  title.textContent = selected + " sort";

  switch (selected) {
    case "bubble":
      algorithmDefintion =
        "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order. This algorithm is not suitable for large data sets as its average and worst-case time complexity is quite high.   ";
      theory =
        "<div class='theory'><h2>In Bubble Sort algorithm</h2><ul> <li>traverse from left and compare adjacent elements and the higher one is placed at right side.</li> <li>In this way, the largest element is moved to the rightmost end atfirst. </li> <li>This process is then continued to find the second largest and placeit and so on until the data is sorted.</li>  <li>Time complexity of bubble sort : <span style='color: #28a745	' >Best= O(n)</span> , <span style='color: #ffc107;'>average: O(n<sup>2</sup>)</span>  , <span style='color: #Dc3545;'>Worst: O(n<sup>2</sup>)</span> </li></ul><p>for more information about bubble sort Visit<a href='https://www.geeksforgeeks.org/bubble-sort/'>Bubble sort reference</a></p></div>                                     																																																		";
      start.setAttribute("onclick", "BubbleSort(); disable()");
      break;
    case "Quick":
      algorithmDefintion =
        `QuickSort is a sorting algorithm based on the Divide and Conquer algorithm that picks an element as a pivot and partitions the given array around the picked pivot
         by placing the pivot in its correct position in the sorted array.`;

      theory =
        "    <div class='theory'><h2>How does QuickSort work?</h2><ul><li>The key process in quickSort is a partition(). The target of partitionsis to place the pivot (any element can be chosen to be a pivot) at itscorrect position in the sorted array and put all smaller elements to theleft of the pivot, and all greater elements to the right of the pivot.Partition is done recursively on each side of the pivot after the pivotis placed in its correct position and this finally sorts the array.</li><li>Time complexity of Quick sort :<span style='color: #28a745'>Best= O(n log n)</span> ,<span style='color: #ffc107'>average: O(n log n)</span> ,<span style='color: #dc3545'>Worst: O(n<sup>2</sup>)</span></li></ul><p>for more information about bubble sort Visit<ahref='https://www.geeksforgeeks.org/quick-sort/'>Quick sort reference</ahref=></p></div>";
      start.setAttribute("onclick", "startQuickSort(); disable()");

      break;
    case "heap":
      algorithmDefintion =
        `Heap sort is a comparison-based sorting technique based on Binary
         Heap data structure. It is similar to the selection sort where we first find the minimum element and place the minimum element at the 
          beginning. Repeat the same process for the remaining elements,`;

      theory =
        " <div class='theory'><h2>In Heap Sort algorithm</h2><p>First convert the array into heap data structure using heapify, then one by one delete the root node of the Max-heap and replace it with    the last node in the heap and then heapify the root of the heap.Repeat this process until size of heap is greater than 1.  </p> <ul> <li>Build a heap from the given input array.</li> <li> Repeat the following steps until the heap contains only one element: </li> <ul> <li> Swap the root element of the heap (which is the largest element) with the last element of the heap. </li> <li> Remove the last element of the heap (which is now in the correct position). </li> <li>Heapify the remaining elements of the heap.</li> </ul> <li> The sorted array is obtained by reversing the order of the elements in the input array. </li> <li>Time complexity of heap sort :  <span style='color: #28a745	' >Best= O(n log n)</span> , <span style='color: #ffc107;'>average: O(n log n)</span>  , <span style='color: #Dc3545;'>Worst: O(n log n)</span></li>  </ul> <p> for more information about Heap sort Visit <a href='https://www.geeksforgeeks.org/Heap-sort/' >Heap sort reference</a > </p> </div> ";
      start.setAttribute(
        "onclick",
        `HeapSort(${document.querySelectorAll(".bar").length}); disable()`
      );

      break;
    case "Insertion":
      algorithmDefintion =
        `Insertion sort is a simple sorting algorithm that works similar to the way you sort playing cards in your hands.
         The array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct 
         position in the sorted part.`;

      theory =
        ` <div class="theory"><h2>In Insertion Sort algorithm </h2>
        <ul>
        <li>To sort an array of size N in ascending order iterate over the array and compare the current element (key) to its predecessor, if the key element is smaller than its predecessor,
         compare it to the elements before. Move the greater elements one position up to make space for the swapped element.</li>
         <li>Time complexity of Insertion sort : <span style="color: #28a745	" >Best= O(n)</span> , <span style="color: #ffc107;">average: O(n<sup>2</sup>)</span>  , 
         <span style="color: #Dc3545;">Worst: O(n<sup>2</sup>)</span> </li> </ul></ul><p>for more information about Insertion sort Visit <a href="https://www.geeksforgeeks.org/insertion-sort/">Insertion sort reference</a>  </p></div>`;
      start.setAttribute("onclick", "InsertionSort(); disable()");

      break;

    case "Selection":
      algorithmDefintion =
        `Selection sort is a simple and efficient sorting algorithm that works by repeatedly selecting the smallest (or largest) element from the unsorted portion of the list and moving it to the sorted portion of the list.`;

      theory =
        ' <div class="theory"><h2>In Selection Sort algorithm</h2><ul><li>Initialization: The algorithm starts with the entire list considered as unsorted.</li><li>Selection: Find the minimum (or maximum) element in the unsorted portion of the list.</li><li>Swap: Swap the minimum element with the first element in the unsorted portion.</li><li>Partitioning: Move the boundary between the sorted and unsorted portions one element to the right.</li><li>Repeat: Repeat steps 2-4 until the entire list is sorted.</li> <li>Time complexity of Selection sort : <span style="color: #28a745	" >Best= O(n<sup>2</sup>)</span> , <span style="color: #ffc107;">average: O(n<sup>2</sup>)</span>  , <span style="color: #Dc3545;">Worst: O(n<sup>2</sup>)</span> </li> </ul><p>for more information about Insertion sort Visit<a href="https://www.geeksforgeeks.org/selection-sort/">Selection sort reference</a></p></div>';
      start.setAttribute("onclick", "SelectionSort(); disable()");
      break;
    case "shell":
      algorithmDefintion =
        ` Shell sort is mainly a variation of Insertion Sort. In insertion sort, we move elements only one position ahead. When an element has to be moved far ahead, many movements are involved. The idea of ShellSort is to allow the exchange of far items.
         In Shell sort, we make the array h-sorted for a large value of h. We keep reducing the value of h until it becomes 1. An array is said to be h-sorted if all sublists of every h’th element are sorted. `;
      theory =
        ` <div class="theory"><h2>Shell sort steps:</h2><ol class="procedure"> <li>Start</li><li> Selection: Find the minimum (or maximum) element in the unsorted portion of the list.</li><li>    Divide the list into smaller sub-part. Each must have equal intervals to h</li><li>Sort these sub-lists using insertion sort</li><li>Repeat this step 2 until the list is sorted.</li><li>Print a sorted list.</li><li>Stop.</li></ol><ul><li>Time complexity of shell sort :  <span style="color: #28a745	" >Best= O(n log n)</span> , <span style="color: #ffc107;">average: O(n<sup>2</sup>)</span>  , <span style="color: #Dc3545;">Worst: O(n<sup>2</sup>)</span></li></ul>
        <p>for more information about Insertion sort Visit<a href="https://www.geeksforgeeks.org/shellsort" target="_blank">Shell sort reference</a> </p>`;
      start.setAttribute("onclick", "ShellSort(); disable()");

      break;
  }
  document.querySelector("#def").textContent = algorithmDefintion;
  document.querySelector(".theoryDivContainer").innerHTML = theory;
}

document.querySelector("#resetArray").addEventListener("click", () => {
  let userInput = localStorage.getItem("userArray");
  if (userInput) {
    generateBarsFromInput(userInput);
  } else {
    return;
  }
});
document.querySelector("select").addEventListener("change", () => {
  location.hash = "#" + document.querySelector("select").value;
});
