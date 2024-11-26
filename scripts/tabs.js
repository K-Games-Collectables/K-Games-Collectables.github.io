function openSection(evt, sectionName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(sectionName).style.display = "block";
    evt.currentTarget.className += " active";

    // Trigger Masonry layout update for the active section
    var containerClass = sectionName.toLowerCase() + '-container';
    var elem = document.querySelector('.' + containerClass);
    if (elem) {
        imagesLoaded(elem, function() {
            var msnry = new Masonry(elem, {
                itemSelector: '.product-info',
                columnWidth: '.product-info',
                percentPosition: true,
                gutter: 20,
                horizontalOrder: true
            });
            msnry.layout();
        });
    }
}

// Set default open tab
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('.tablinks').click();
});