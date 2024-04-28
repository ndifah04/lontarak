let nama = document.querySelector('.name');
let title = document.querySelector('.title');
let desc = document.querySelector('.desc');
let linkeIn = document.querySelector('.linked');
let gitHub = document.querySelector('.github');
let ig = document.querySelector('.ig');

export function useJSON(index){
    return fetch('team.json')
    .then(response => response.json())
    .then(data => {
        let selectData = data.list_desc[index];
    
        nama.textContent = selectData["Full Name"];
        title.textContent = selectData.Role;
        desc.textContent = selectData["About me"];
        linkeIn.setAttribute("href", selectData.Link.LinkedIn);
        gitHub.setAttribute("href", selectData.Link.Github);
        ig.setAttribute("href", selectData.Link.Instagram);
    })
    .catch(error => {
        console.log(error);
    })
}
