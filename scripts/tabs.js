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

    // Open first sub-tab by default when switching main tabs
    var firstSubTab = document.querySelector(`#${sectionName} > .sub-tab > .sub-tablinks`);
    if (firstSubTab) {
        firstSubTab.click();
    }
}

function openSubSection(evt, parentSection, subSectionName) {
    // Get the parent section and target content
    var section = document.getElementById(parentSection);
    var targetContent = document.getElementById(parentSection + "-" + subSectionName);
    
    // Find the immediate parent container (could be main tab or sub-tab)
    var immediateParent = evt.currentTarget.closest('.tabcontent, .sub-tabcontent');
    
    // Get only the direct sub-tabcontent elements within the immediate parent
    var subtabcontent = immediateParent.querySelectorAll(':scope > .sub-tabcontent');
    var subtablinks = evt.currentTarget.parentElement.getElementsByClassName("sub-tablinks");
    
    // Hide all sibling sub-tabcontent
    subtabcontent.forEach(function(content) {
        content.style.display = "none";
    });
    
    // Remove active class from sibling sub-tablinks
    Array.from(subtablinks).forEach(function(link) {
        link.className = link.className.replace(" active", "");
    });
    
    // Show current sub-tab and set active class
    if (targetContent) {
        targetContent.style.display = "block";
        evt.currentTarget.className += " active";

        // Open first nested sub-tab by default if it exists
        var firstNestedSubTab = targetContent.querySelector(':scope > .sub-tab > .sub-tablinks');
        if (firstNestedSubTab) {
            firstNestedSubTab.click();
        }
    }

    // Update Masonry layout for the active section
    var containerClass = subSectionName.toLowerCase() + '-container';
    var elem = document.querySelector(`#${parentSection}-${subSectionName} .${containerClass}`);
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