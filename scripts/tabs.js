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
    // console.log('=== Tab Debug Info ===');
    // console.log(`Event:`, evt);
    // console.log(`Parent Section: ${parentSection}`);
    // console.log(`Sub Section Name: ${subSectionName}`);

    // // Log all sub-tabcontent elements found
    // var allSubTabContents = document.querySelectorAll('.sub-tabcontent');
    // console.log(`Total sub-tabcontent elements found: ${allSubTabContents.length}`);
    // allSubTabContents.forEach(content => {
    //     console.log(`Found sub-tabcontent with ID: ${content.id}`);
    // });

    // Hide all sub-tab contents within the parent section
    var subTabContents = document.querySelectorAll(`#${parentSection} .sub-tabcontent`);
    // console.log(`Found ${subTabContents.length} sub-tabcontents in parent section ${parentSection}`);
    subTabContents.forEach(content => {
        content.style.display = "none";
        // console.log(`Hidden sub-tabcontent: ${content.id}`);
    });

    // Show the selected sub-tab content
    var selectedSubTabContent = document.getElementById(`${parentSection}-${subSectionName}`);
    if (selectedSubTabContent) {
        selectedSubTabContent.style.display = "block";
        // console.log(`Successfully showed sub-tab content: ${selectedSubTabContent.id}`);
    } else {
        // console.error(`Failed to find sub-tab content with ID: ${parentSection}-${subSectionName}`);
        // // Log all IDs in the document for debugging
        // const allElements = document.querySelectorAll('[id]');
        // console.log('All element IDs in document:');
        // allElements.forEach(el => console.log(el.id));
    }

    // Set the clicked button as active
    var subTabLinks = document.querySelectorAll(`#${parentSection} .sub-tablinks`);
    // console.log(`Found ${subTabLinks.length} sub-tablinks in parent section ${parentSection}`);
    subTabLinks.forEach(link => {
        link.classList.remove('active');
        // console.log(`Removed active class from button: ${link.textContent}`);
    });
    evt.currentTarget.classList.add('active');
    // console.log(`Added active class to clicked button: ${evt.currentTarget.textContent}`);

    // Update Masonry layout for the active section
    var containerClass = subSectionName.toLowerCase() + '-container';
    var elem = document.querySelector(`#${parentSection}-${subSectionName} .${containerClass}`);
    if (elem) {
        // console.log(`Found Masonry container: ${containerClass}`);
        imagesLoaded(elem, function() {
            var msnry = new Masonry(elem, {
                itemSelector: '.product-info',
                columnWidth: '.product-info',
                percentPosition: true,
                gutter: 20,
                horizontalOrder: true
            });
            msnry.layout();
            // console.log('Masonry layout updated');
        });
    } else {
        // console.log(`No Masonry container found for: ${containerClass}`);
    }

    // console.log('=== End Debug Info ===');

    // console.log(`Attempting to open: ${parentSection}-${subSectionName}`);
}

// Set default open tab
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('.tablinks').click();
});