"use strict";
(() => {
        const repositories = document.getElementById('repositories');
        const userNames = ['benna100', 'olkaa'];

        function getRepo(userName) {
                return new Promise(resolve => {
                        const api = `https://api.github.com/search/repositories?q=user:${userName}`;
                        fetch(api)
                                .then(response => response.json())
                                .then(data => {
                                        const obj = {};
                                        obj[userName] = data;
                                        resolve(JSON.stringify(obj));
                                })
                })
        }

        function renderRepo() {
                Promise.all(userNames.map(user => getRepo(user)))
                        .then(data => {
                                const dataResult = data.map(element => JSON.parse(element));

                                dataResult.forEach(element => {
                                        for (let key in element) {
                                                const reposUserName = document.createElement('li');
                                                reposUserName.innerHTML = `${key}'s repositories`;

                                                for (let key2 in element[key]) {
                                                        if (key2 === 'items') {
                                                                const listOfProjects = document.createElement('ul');
                                                                
                                                                element[key][key2].forEach(element2 => {
                                                                        const project = document.createElement('li');
                                                                        project.innerHTML = `${element2.name}: `;

                                                                        const link = document.createElement('a');
                                                                        link.setAttribute('href', element2.html_url);
                                                                        link.innerHTML = element2.html_url;
                                                                        project.appendChild(link);

                                                                        listOfProjects.appendChild(project);
                                                                })
                                                                reposUserName.appendChild(listOfProjects);
                                                        }
                                                }
                                                repositories.appendChild(reposUserName);
                                        }
                                });
                        })
        }
        renderRepo();
})();


