const projectsDoc = document.querySelector('.github-projects');

fetch('https://api.github.com/users/alighamdan/repos')
    .then(response => response.json())
    .then(data => {
        data.filter(e=>!e.fork).sort((a,b)=>{
            let createdAtB = new Date(b.created_at).getTime()
            let createdAtA = new Date(a.created_at).getTime()
            return createdAtB - createdAtA
        }).sort((a,b) => {
            let license1 = a.license;
            let license2 = b.license;
            if(!license1) license1 = 0;
            else license1 = 1;
            if(!license2) license2 = 0;
            else license2 = 1;
            return license2 - license1
        }).sort((a,b) => {
            let homepage1 = a.homepage;
            let homepage2 = b.homepage;
            if(!homepage1) homepage1 = 0;
            else homepage1 = 1;
            if(!homepage2) homepage2 = 0;
            else homepage2 = 1;
            return homepage2 - homepage1
        }).forEach((project, index) => {
            projectsDoc.innerHTML +=`<div class="project">
                <div class="project-title">
                    <h4>${index+1}-</h4><h4><b>name:</b></h4> <h3>${project.name}</h3>
                </div>
                ${project.description ? 
                `<div class="project-description">
                <p>${project.description}</p>
            </div>`:""}
                ${
                    project.allow_forking ?
                    `<div class="project-fork">
                    <p>You Can Fork using: <b>git clone ${project.clone_url}</b></p>
                    </div>`:""
                }
                
                <div class="project-links">
                    <a href="${project.html_url}" target="_blank">Github</a>
                    ${project.homepage ? `<a href="${project.homepage}" target="_blank">Website</a>` : ''}
                    ${project.license ? `<a href="${project.license.url}" target="_blank">${project.license.name}</a>` : ''}
                </div>
            </div><hr>`
        });
    }).catch((e) => {
        projectsDoc.innerHTML = `<h2>I Can't Find Any Project please Go <a href="https://github.com/alighamdan">Here</a> to see all repositories</h2>`;
    })
