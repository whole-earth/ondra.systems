setTimeout(function(){
    document.querySelector(".bio-toggle-btn").classList.remove("invisible")
}, 3000);

let replacementCopy;

let n;

function chooseDirection(){
    let probability = Math.random();
    n = Math.floor(Math.random()*8);

    if (probability < 0.5){
        n=7
    } else if (probability < 0.65){
        n=4
    } else if (probability < 0.8){
        n=5
    }
    

    if (n==5){
        document.querySelector(".bio").classList.add("upsideDown")
    } else {
        document.querySelector(".bio").classList.remove("upsideDown")
    }
    if (n==5 || n == 7 || n==6){
        document.querySelector(".bio").classList.add("transition")
    } else {
        document.querySelector(".bio").classList.remove("transition")
    }
}


function reset(){
    for (let i of letters.listAll()){
        i.classList.remove("n7");
        i.classList.remove("on");
        i.classList.remove("animated");
        i.classList.remove("upsideDown");
        i.removeAttribute('style');
    }
    for (let c of document.querySelectorAll(".clone")){
        c.remove();
    }
}

// chooseDirection()

document.querySelector(".bio").addEventListener("mousedown", function(){
    document.querySelector(".bio-toggle-btn").classList.add("invisible");
    document.querySelector(".bio .bio-h1:last-of-type").classList.add("clicked"); // makes :after opacity = 0
    reset();
    SWITCH(Math.floor(Math.random()*8));
})

// this is for direction 2
let headerBounds = document.querySelector(".bio-h1").getBoundingClientRect();
window.addEventListener("resize", function(){
    headerBounds = document.querySelector(".bio-h1").getBoundingClientRect();
})

var letters = new Letterize({
    targets: ".bio-h1",
    wrapper: "i"
});

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

for (let i of letters.listAll()){
    i.innerHTML = i.innerHTML.replace(/&nbsp;/g, " ");
    replacementCopy = document.querySelector(".bio").innerHTML;
    if (n == 5){
        i.style.transition = 'transform 200ms';
    } else {
        i.style.transition = 'none'
    }
    if (n==7){
        i.classList.add("n7");
    } else {
        i.classList.remove("n7");
    }
    i.addEventListener("mouseenter", function(){
        // console.log(i.parentElement);
        if (n == 1){
            i.classList.add("on")
        }
        if (n==3){
            let cln = i.cloneNode(true);
            cln.classList.add("clone");
            insertAfter(cln, i);
        }
        if (n==5){
            // i.style.transform = "scaleY(-1)";
            i.classList.add('upsideDown');
            setTimeout(function(){
                i.classList.remove('upsideDown')
                // i.style.transform = "scaleY(1)";
            }, 1000)
        }
        if (n==7){
            i.style.left = -30 + Math.random() * 60 + "px";
            i.style.top = -30 + Math.random() * 60 + "px";
            i.style.color = palette2[Math.floor(Math.random()*palette2.length)];
            setTimeout(function(){
                i.removeAttribute('style')
            }, 1000)
        }
    })
}

// let palette = ["#4fff8a", "#1476ff", "#ff9214", "#ff3030"];
let palette = ["#4251D6", "#FFD37D", "#FF4E4E", "#62D282"];
let palette2 = ["#FF9900", "#FF4E4E", "#FF7DBC", "#7DA2FF", "#FFD37D", "#62D282", "#4251D6"];
let h = document.querySelector("h1");

hHover = true;
for (let container of document.querySelectorAll(".d3container")){
    container.addEventListener("mousemove", function(e){
        container.classList.add("mouseover")
    })
    container.addEventListener("mouseout", function(e){
        container.classList.remove("mouseover")
    })
}

let spanArray = [];

lettersInView();

document.addEventListener("scroll", function(){
    lettersInView();
})

let boundsArr = [];

for (let i=0;i<spanArray.length;i++){
    let s = spanArray[i];
    boundsArr.push(s.getBoundingClientRect());
}

document.addEventListener("mousemove", function(e){
    
    for (let i=0;i<spanArray.length;i++){
        let s = spanArray[i];
        let bounds = boundsArr[i];
        // let bounds = s.getBoundingClientRect();
        let dist = distance(e.clientX, e.clientY, bounds.left+bounds.width/2, bounds.top+bounds.height/2);
        let ancestor = findAncestor(s, "d3container");
        // if(n==0 || ancestor.classList.contains("mouseover")){
            if (dist < 300){
                if (n==4){
                    s.style.display = 'inline-block';
                    s.style.transform = `scaleX(${map(dist, 0, 300, -1, 1)})`
                }
                if (dist < 200){
                    if (n==0){
                        s.style.top = map(dist, 0, 200, -2, 0) + "em";
                    }
                    if (n==2){
                        if(e.clientX < headerBounds.right){
                            s.style.color = palette[Math.floor(Math.random() * palette.length)];
                        } else {
                            s.style.color = 'white';
                        }
                    }
                } else {
                    if (n == 0){
                        s.style.top = "0px";
                    }
                    if (n==2){
                        if(e.clientX < headerBounds.right){
                            s.style.color = '#1c1c1c';
                        } else {
                            s.style.color = 'white';
                        }
                    }
                }
            } else {
                if (n == 0){
                    s.style.top = "0px";
                }
                if (n == 2){
                    if(e.clientX < headerBounds.right){
                        s.style.color = '#1c1c1c';
                    } else {
                        s.style.color = 'white';
                    }
                }
                
                if (n==4){
                    s.style.display = 'inline';
                    s.style.transform = 'scaleX(1)';
                }
            }
        // } else {
        //     if (n == 2){
        //         s.removeAttribute("style")
        //     }
        // }
        if (n==6){
            if(bounds.x <= e.clientX){
                s.classList.add("animated")
            } else {
                s.classList.remove("animated")
            }
        }
    }
})

function lettersInView(){
    if (n==0){
        spanArray = [];
        for (let i of letters.listAll()){
            if (isScrolledIntoView(i)){spanArray.push(i);}
        }
    } else {
        spanArray = letters.listAll()
    }
}

function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function distance(x1, y1, x2, y2){
    return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
}

function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;
  
    isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}

function SWITCH(x){
    n = x;
    hHover = false;
    for (i of letters.listAll()){
        i.classList.remove("on");
        i.removeAttribute('style');
    }
    if (x==0 || x==1){
        for (c of document.querySelectorAll(".clone")){
            c.remove();
        }
    }
    if (n==5 || n == 7 || n==6){
        document.querySelector(".bio").classList.add("transition")
    } else {
        document.querySelector(".bio").classList.remove("transition")
    }
}

function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

 
function scrollUpDown(){
    window.scrollTo(0, window.innerHeight - 30);
}
