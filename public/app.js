//on load, get all the versions, sort by dateCreated

const getVersions = async (query = '') => {
    return await fetch(`/versions?${query}`).then(d => d.json());
}
const createVersionListItem = (version) => {
    const li = document.createElement('li');
    li.id = 'version-item-' + version._id;
    li.innerHTML = `
        <p>
            <a href=${version.url}>${version.name} ${version.version}</a> 
            - <b>Created: </b>${new Date(version.createdAt).toLocaleString()}
            <span>${version.description || ''}</span>
        </p>
    `;
    return li;
}

const createVersionList = (versions) => {
    return versions.map(createVersionListItem);
}
const renderVersionList = (versions) => {
    const list = document.getElementById('version-list');
    createVersionList(versions).forEach(v => list.appendChild(v))
}

const handleLoad = async () => {
    const versions = await getVersions();
    renderVersionList(versions);
}

window.onload = handleLoad;