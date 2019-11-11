var x, k = 0; // Start Point
var pictures = [];
var authors = [];


function getImages() {
    function getRandomIndex() {
        var random = Math.random();
        return Math.floor(random * jsonResult.length);
    }
    var jsonResult;
    var imagesElements = "";

    $.get('https://picsum.photos/list').done(function (data) {
        jsonResult = data;
    }).then(function () {
        for (let i = 0; i < 10; i++) {
            let randomIndex = getRandomIndex();
            // getting json from request
            let randomImage = jsonResult[randomIndex];
            // getting image URL with random id
            let randomImageUrl = `https://picsum.photos/200/300?image=${randomImage.id}`;
            // getting the author name
            let fgCaption = `by ${randomImage.author}`;

            // let imageElement = `<img class="slide-${i}" src="${randomImageUrl}" alt="${fgCaption}">`;
            let imageElement = `<figure class="slide-${i}"> <div id="text">${fgCaption}</div> <img name="slide" src="${randomImageUrl}" alt="${fgCaption}"></figure>`;

            //adds each imageElement to imagesElements array of characters
            imagesElements += imageElement;
        }
        $(".slider-container").append(imagesElements);

        loadImages();
        changeImg();
    });

    function loadImages() {
        var slides = document.getElementsByTagName("img");
        var len = slides.length;

        for (x = 0; x < len; x++) {
            pictures.push(slides[x].src);
            authors.push(slides[x].alt);
        }
    }
}
// Change Image
function changeImg() {
    if (k < pictures.length - 1) { // Check If Index Is Under Max
        k++; // Add 1 to Index
        document.getElementById('targetImage').src = pictures[k];
        document.getElementById('targetImage').alt = authors[k];
        $("h3").text(authors[k]);
        $('#counter').text(k + " / 10");
    } else {
        k = 0; // Reset Back To O
    }
    setTimeout("changeImg()", 1000); // Run function every x seconds
}

getImages();
