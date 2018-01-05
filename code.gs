/*

GDrive Uploader

*/

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('portal.html').setTitle("Google Drive File Upload");
}


function uploadFileToGoogleDrive(data, file, name) {
  
  try {
    
    var dropbox = "Received Files";
    var folder, subFolder, folders = DriveApp.getFoldersByName(dropbox);
    
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(dropbox);
    }
    

    var subFolder = getFolder(folder,name);
    if (subFolder === false){
      subFolder = folder.createFolder(name);
    }
    
    var contentType = data.substring(5,data.indexOf(';')),
        bytes = Utilities.base64Decode(data.substr(data.indexOf('base64,')+7)),
        blob = Utilities.newBlob(bytes, contentType, file),
        file = subFolder.createFile(blob);
    
    return "OK";
    
  } catch (f) {
    return f.toString();
  }
  
}


function getFolder(parent_folder,folder_name){
  try {
    var folders = parent_folder.getFolders();
    while (folders.hasNext()) {
      var folder = folders.next();
      if(folder_name == folder.getName()) {         
        return folder;
      }
    }
    return false;
  } catch(f) {
    return f.toString();
  }
}
