async function loadPosts() {
    const postsContainer = document.getElementById('posts');
    const converter = new showdown.Converter();
    
    // Fetch the list of posts from the JSON file
    const response = await fetch('data/posts.json');
    const data = await response.json();
    
    // Sort posts by date and version extracted from the filename
    const posts = data.posts.sort((a, b) => {
        const dateVersionA = a.match(/(\d{4}-\d{2}-\d{2})(?:-(\d+))?/);
        const dateVersionB = b.match(/(\d{4}-\d{2}-\d{2})(?:-(\d+))?/);
        
        if (dateVersionA && dateVersionB) {
            const dateA = new Date(dateVersionA[1]);
            const dateB = new Date(dateVersionB[1]);
            
            // Compare dates first
            if (dateA.getTime() !== dateB.getTime()) {
                return dateB - dateA; // Sort descending by date
            }
            
            // If dates are the same, compare version numbers
            const versionA = dateVersionA[2] ? parseInt(dateVersionA[2], 10) : 0;
            const versionB = dateVersionB[2] ? parseInt(dateVersionB[2], 10) : 0;
            return versionB - versionA; // Sort descending by version
        }
        
        return 0; // If dates are not found, keep original order
    });
    
    for (let post of posts) {
        const response = await fetch(post);
        const text = await response.text();
        const htmlContent = converter.makeHtml(text);
        
        // Extract the title from the first line (level 1 header)
        const titleMatch = text.match(/^# (.+)$/m);
        const title = titleMatch ? titleMatch[1] : 'Untitled';
        
        // Create elements for each post
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        const titleDiv = document.createElement('div');
        titleDiv.className = 'post-title';
        titleDiv.textContent = title;
        const contentDiv = document.createElement('div');
        contentDiv.className = 'post-content';
        contentDiv.innerHTML = htmlContent;
        contentDiv.style.display = 'none'; // Initially hide content
        
        // Toggle display on click
        titleDiv.onclick = () => {
            contentDiv.style.display = contentDiv.style.display === 'none' ? 'block' : 'none';
        };
        
        postDiv.appendChild(titleDiv);
        postDiv.appendChild(contentDiv);
        postsContainer.appendChild(postDiv);
    }

    // Check for hash in URL and expand the corresponding post
    const hash = window.location.hash;
    if (hash) {
        const postDate = hash.substring(1); // Remove the '#' character
        console.log(`Looking for post with date: ${postDate}`);
        
        // Find the post that matches the date in the filename
        const postToExpand = Array.from(postsContainer.getElementsByClassName('post-title')).find((titleDiv, index) => {
            const postFilename = posts[index]; // Get the corresponding post filename
            return postFilename.includes(postDate); // Check if the filename contains the date
        });
        
        if (postToExpand) {
            console.log(`Expanding post: ${postToExpand.textContent}`);
            postToExpand.click(); // Simulate a click to expand the post
        } else {
            console.error(`No post found for date: ${postDate}`);
        }
    }
}

loadPosts();
