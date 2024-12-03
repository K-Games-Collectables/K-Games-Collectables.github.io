function openTabSection(evt, sectionName) {
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

function openTabSubSection(evt, parentSection, subSectionName) {
    console.log(`Opening sub-section: ${subSectionName}`);

    // Hide all sub-tab contents
    var subTabContents = document.querySelectorAll(`#${parentSection} .sub-tabcontent`);
    subTabContents.forEach(content => {
        console.log(`Hiding content: ${content.id}`);
        content.style.display = "none";
    });

    // Show the selected sub-tab content
    var selectedSubTabContent = document.getElementById(`${parentSection}-${subSectionName}`);
    if (selectedSubTabContent) {
        console.log(`Showing sub-tab content: ${selectedSubTabContent.id}`);
        selectedSubTabContent.style.display = "block";
    }

    // Hide all sub-sub-tab contents within the selected sub-tab
    var subSubTabContents = document.querySelectorAll(`#${parentSection}-${subSectionName} .sub-tabcontent`);
    subSubTabContents.forEach(content => {
        console.log(`Hiding sub-sub-tab content: ${content.id}`);
        content.style.display = "none"; // Hide all sub-sub-tabs
    });

    // Show the selected sub-sub-tab content
    var selectedSubSubTabContent = document.getElementById(`${subSectionName}-${subSubSectionName}`);
    if (selectedSubSubTabContent) {
        console.log(`Showing sub-sub-tab content: ${selectedSubSubTabContent.id}`);
        selectedSubSubTabContent.style.display = "block"; // Show the selected one
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

    // Handle hash for hyperlinking
    const hash = window.location.hash;
    if (hash) {
        const subSubSectionName = hash.substring(1); // Remove the '#' character
        const subSubTabToOpen = document.getElementById(`${subSectionName}-${subSubSectionName}`);
        if (subSubTabToOpen) {
            subSubTabToOpen.style.display = "block"; // Show the sub-sub-tab if it matches the hash
        }
    }
}

// Set default open tab
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('.tablinks').click();
});