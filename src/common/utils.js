export function getSubDir(folderData) {
    let subDir = [];
    if(folderData && folderData.children) {
        let objects = Object.entries(folderData.children);
        for(let i=0; i<objects.length; i++){
            const element = objects[i];
            if(element[1].type === "folder") {
                subDir.push(element[1]);
            }
        }
    }
    return subDir;
}

export function getPathText(path="") {
    if(path === "/") return ["", "root"];
    let elements = path.split("/");
    const mainPathStr = elements.pop();
    elements.shift();
    elements.unshift("root");
    const subPathStr = elements.join(" / ");
    return [subPathStr, mainPathStr];
}

export function getObjectFromPath(path, root) {
    if(path === "/") return root;
    let folders = path.split("/");
    folders.shift();
    let currentDirObj = root;
    folders.forEach(dir => { currentDirObj = currentDirObj.children[dir]; });
    return currentDirObj;
}

function generateNewFolder(path,obj) {
    return {
        "path": path+"/"+obj.name,
        "name": obj.name,
        "type": "folder",
        "children": null,
        "metadata": {
            "createdBy": obj.createdby,
            "size": obj.size,
            "createdDate": obj.createdAt
        }
    }
}

function generateNewFile(path,obj) {
    return {
        "path": path+"/"+obj.name,
        "name": obj.name,
        "type": "file",
        "metadata": {
            "createdBy": obj.createdBy,
            "size": obj.size,
            "createdDate": obj.createdAt
        }
    }
}

export function createNewFolderFile(path,object,root) {
    let currDir = getObjectFromPath(path,root);
    if(!currDir.children) currDir.children = {};
    currDir.children[object.name] = object.type === "folder" ? generateNewFolder(path,object) : generateNewFile(path,object);
    return root;
}

export function deleteFileFolder(path,name,root) {
    let currDir = getObjectFromPath(path,root);
    delete currDir.children[name];
    return root;
}

export function DFSSearch(dirChildren, searchString) {
    console.log(dirChildren)
    if(!dirChildren || Object.keys(dirChildren).length === 0) return [];
    let searchResult = [];
    Object.entries(dirChildren).forEach(item => {
        if(item[0].toLowerCase().includes(searchString.toLowerCase())) searchResult.push(item);
        searchResult = [...searchResult, ...DFSSearch(item[1].children,searchString)];
    });
    return searchResult;
}

export function validateFilename(name) {
    if(!name || name.length === 0) return false;
    return /^[0-9a-zA-Z ... ]+$/.test(name);
} 