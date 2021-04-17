
const bubbleSortDescription = "Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. Time Complexity: Worst O(n^2), Best O(n). Space Complexity: O(1).";
const insertionSortDescription = "Insertion sort moves one element from the input elements in each iteration to find its correct position i.e, the position to which it belongs in a sorted array. This is done by shifting all the elements, which are larger than the current element, in the sorted array to one position ahead. Time Complexity: Worst O(n^2), Best O(n). Space Complexity: O(1).";
const selectionSortDescription = "Selection sort algorithm divides the list into two parts: sorted sublist at the left end and unsorted sublist at the right end, and in each iteration brings the smallest element of unsorted sublist to the leftmost of it, and makes it rightmost element of increased sorted sublist. Time Complexity: Worst O(n^2), Best O(n^2). Space Complexity: O(1).";
const quickSortDescription = "Quick sort, based on divide-and-conquer algorithm, keeps dividing the sublist in two parts recursively based on corresponding pivot elements, and arranges them so that elements on the left of pivot are smaller and on the right of pivot are greater than the pivot. Time Complexity: Worst O(n^2), Best O(n*logn). Space Complexity: Worst O(n), Best O(logn).";
const mergeSortDescription = "Merge sort is a divide-and-conquer algorithm based on the idea of breaking down a list into several sub-lists until each sublist consists of a single element and merging those sublists in a manner that results into a sorted list. Time Complexity: Worst O(n*logn), Best O(n*logn). Space Complexity: O(n).";

const sortingAlgorithms = [bubbleSortDescription, insertionSortDescription, selectionSortDescription, quickSortDescription, mergeSortDescription];

const button_start_new = document.getElementById('button_start_new');
const button_play = document.getElementById('button_play');
const button_pause = document.getElementById('button_pause');

const button_sorting_algorithm = document.getElementById('button_sorting_algorithm');
const button_elements_no = document.getElementById('button_elements_no');

const elementsNo = document.querySelectorAll('.elements-no');
const sortingAlgo = document.querySelectorAll('.sorting-algo');

const html_sortingAlgoDescription = document.getElementById('sorting-algo'); 

let drawx;
let drawy;
const canvasWidth = 1000;
const canvasHeight = 500;

let unitx = canvasWidth / 20;
let unity = 3;

let aArray = [];
let oArray = [];
let pArray = [];
let aArraySize = 20;
let algorithm = '';

let pass=0;         
let requestID = "";

const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

canvas.height = 500;
canvas.width = 1000;
canvas.style.backgroundColor = '#F2F4F3';

const Block = function(index, value, x, y){
    this.index = index;
    this.value = value;
    this.x = x;
    this.y = y;
    this.width = unitx;
    this.height = unity * this.value;
}
Block.prototype.drawBlock = function(flag=0){
    c.beginPath();
    if (flag==0)
        c.fillStyle = '#F46036';
    else if (flag==1)
        c.fillStyle = '#ed111f';
    else if (flag==2)
    c.fillStyle = '#fff700';
    c.fillRect(this.x, this.y, this.width, this.height);
    c.strokestyle = '#DF2935';
    c.strokeRect(this.x, this.y, this.width, this.height);
} 

const drawAnimation = function (l=-1, r=-1, m=-1){
    c.clearRect(0, 0, canvas.width , canvas.height);
    for (let i=0; i<aArraySize ; i++){
        if (algorithm == 'Bubble Sort'){
            if (i==r || i>aArraySize-l-1 || i==1 && l==aArraySize-2)
                oArray[i].drawBlock(1);
            else
                oArray[i].drawBlock();
        }
        else if (algorithm == 'Insertion Sort'){
            if (i==l || i==r || r==aArraySize-1 && i<=r)
                oArray[i].drawBlock(1);
            else 
                oArray[i].drawBlock();
        }
        else if (algorithm == 'Selection Sort'){
            if (i<l || i==r)
                oArray[i].drawBlock(1);
            else if (i==m)
                oArray[i].drawBlock(2);
            else
                oArray[i].drawBlock();
        }
        else if (algorithm == 'Quick Sort'){
            if (i==l || i==r)
                oArray[i].drawBlock(2);
            else if (i>l && i<=m)
                oArray[i].drawBlock(1);
            else
                oArray[i].drawBlock();
        }
        else if (algorithm == 'Merge Sort'){
            if (i==l || i==r)
                oArray[i].drawBlock(2);
            else if (i>l && i<=m)
                oArray[i].drawBlock(1);
            else
                oArray[i].drawBlock();
        }
    }
}

const startAnimation = function() {
    requestID = requestAnimationFrame(startAnimation);
    if (pass < pArray.length){
        aArray = pArray[pass].arr;
        setObjectArray();
        if (algorithm == 'Insertion Sort' || algorithm == 'Bubble Sort')
            drawAnimation(pArray[pass].l, pArray[pass].r);
        else if (algorithm == 'Selection Sort' || algorithm == 'Merge Sort' || algorithm == 'Quick Sort')
            drawAnimation(pArray[pass].l, pArray[pass].r, pArray[pass].m);
        pass++;
    }
    else{
        pauseA();
    }
}

const swapInArray = function(a,b){
    let temp = aArray[a];
    aArray[a] = aArray[b];
    aArray[b] = temp;
}

const bubbleSortAlgorithm = function(){
    for (let i=0; i<aArraySize-1; i++){
        for (let j=0; j<aArraySize-i-1; j++){
            if (aArray[j]>aArray[j+1]){
                swapInArray(j, j+1)
            }
            let newframe = {
                arr: [...aArray],
                l: i,
                r: j
            }
            pArray.push(newframe);
        }
    }
}

const insertionSortAlgorithm = function(){
    for (let i=1; i<aArraySize ; i++){
        let key = aArray[i];
        let j = i-1;

        while (j>=0 && aArray[j]>key){
            aArray[j+1] = aArray[j];
            j--;

            let newframe = {
                arr: [...aArray],
                l: j,
                r: i
            }
            pArray.push(newframe);
        }
        aArray[j+1] = key;
    }
}

const selectionSortAlgorithm = function(){
    for (let i=0; i<aArraySize ; i++){
        let minKey = i;
        for (let j=i; j<aArraySize; j++){
            if (aArray[j]<aArray[minKey]){
                minKey = j;
            }
            let newframe = {
                arr: [...aArray],
                l: i,
                r: j,
                m: minKey
            }
            pArray.push(newframe);
        }
        swapInArray(i, minKey);
    }
}

const partition = function(low, high){
    let pivot = aArray[high];
    let i = low-1;
    let j;
    for (j=low; j < high; j++){
        if (aArray[j] < pivot) {
            i++;
            swapInArray(i, j);
        }
        let newframe ={
            arr: [...aArray],
            l: low,
            r: high,
            m: j,
        }
        pArray.push(newframe);
    }
    swapInArray(i+1, high);
    return i+1;
}
const quickSort = async function(low, high){
    if (low < high){
        let pi = partition(low, high);
        quickSort(low, pi-1);
        quickSort(pi+1, high);
    }
}
const quickSortAlgorithm = async function(){
    await quickSort(0, aArraySize-1);
    let newframe ={
        arr: [...aArray],
        l: -1,
        r: -1,
        m: 201
    };
    pArray.push(newframe);
}

const merge = function(l, m, r)
{
    let n1 = m-l+1;
    let n2 = r-m;

    let leftArr = [], rightArr = [];
    for (let i=0; i<n1; i++)
        leftArr.push(aArray[l+i]);
    for (let j=0; j<n2; j++)
        rightArr.push(aArray[m+1+j]);
    
    let i=0, j=0, k=l;

    while (i<n1 && j<n2){
        if (leftArr[i] <= rightArr[j]){
            aArray[k] = leftArr[i];
            i++;
        }
        else{
            aArray[k] = rightArr[j];
            j++;
        }
        let newFrame = {
            arr: [...aArray],
            l: l,
            r: r,
            m: k
        };
        pArray.push(newFrame);
        k++;
    }
    while (i < n1){
        aArray[k] = leftArr[i];
        i++;
        let newFrame = {
            arr: [...aArray],
            l: l,
            r: r,
            m: k
        };
        pArray.push(newFrame);
        k++;
    }
    while (j < n2){
        aArray[k] = rightArr[j];
        j++;
        let newFrame = {
            arr: [...aArray],
            l: l,
            r: r,
            m: k
        };
        pArray.push(newFrame);
        k++;
    }
}
const mergeSort = function(l, r) {
    if (l<r){
        let m = Math.floor(l+(r-l)/2);
        mergeSort(l, m);
        mergeSort(m+1, r);
        merge(l,m,r);
    }
}
const mergeSortAlgorithm = function(){
    mergeSort(0, aArraySize-1);
    let newFrame = {
        arr: [...aArray],
        l: -1,
        r: 201,
        m: 201
    };
    pArray.push(newFrame);
}
const startnewfunction = function(){
    cancelAnimationFrame(requestID);
    aArray = [];
    oArray = [];
    pArray = [];
    unitx = canvasWidth / aArraySize;

    pass = 0;
    cIndex = 0;
    counter = 0;

    setArray();
    if (algorithm == 'Bubble Sort')
        bubbleSortAlgorithm();
    else if (algorithm == 'Insertion Sort')
        insertionSortAlgorithm();
    else if (algorithm == 'Selection Sort')
        selectionSortAlgorithm();
    else if (algorithm == 'Quick Sort'){
        console.log(aArray);
        quickSortAlgorithm();
        console.log(aArray);
    }
    else if (algorithm == 'Merge Sort'){
        console.log(aArray);
        mergeSortAlgorithm();
        console.log(aArray);
    }
}

const setArray = function(){
    aArray = [];
    for (let i=0; i<aArraySize; i++){
        aArray.push(Math.ceil(Math.random()*150));
    }
    setObjectArray();
    drawObjectArray(); 
}

const setObjectArray = function(){
    oArray = [];
    for(var i = 0 ; i < aArraySize ; i++){
        oArray.push(new Block(i , aArray[i] , (i*unitx) , 500-(aArray[i]*unity) ));
    }
}

const drawObjectArray = function(){
    c.clearRect(0,0,canvas.width, canvas.height);
    for (let i=0; i<aArraySize; i++){
        oArray[i].drawBlock();
    }
}

startnewfunction();

const pauseA = function(){
    cancelAnimationFrame(requestID);
}


const button_play_clicked = function(){
    startAnimation();
}

button_play.addEventListener( 'click', button_play_clicked);
button_start_new.addEventListener( 'click', startnewfunction);
button_pause.addEventListener( 'click', pauseA);

for (let i=0; i<4; i++){
    elementsNo[i].addEventListener('click', () => {
        pauseA();
        let temp = elementsNo[i].innerText;
        button_elements_no.innerText = temp;
        unitx = canvasWidth / temp;
        aArraySize = temp;
        startnewfunction();
    })
}

for (let i=0; i<5; i++){
    sortingAlgo[i].addEventListener('click', () => {
        pauseA();
        html_sortingAlgoDescription.textContent = sortingAlgorithms[i];
        let temp = sortingAlgo[i].innerText;
        button_sorting_algorithm.innerText = temp;
        algorithm = temp;
        startnewfunction();
    })
}