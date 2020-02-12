var fs = require('fs');
var fileToSave = 'images.json';
var userModel = {};
var userCollection = [];

function writeToFile(){
  var serializedJSON = JSON.stringify(userCollection);
  fs.writeFileSync(fileToSave, serializedJSON, { encoding: 'utf8' } );
  return true;
}
function openFile(){
  try{
  var serializedJSON = fs.readFileSync(fileToSave,{encoding:'utf8'});
  userCollection = JSON.parse(serializedJSON);
  } catch(e){
    console.log(e);
  }
}

var userTemplate = {
  userTitle:"",
  userURL:"",
  userAlbum:"",
  userID:'',
  userThumbnailURL: ""
}

openFile();

userModel.getAll = ()=>{
  return userCollection;
}

userModel.getById = (id)=>{
  var filteredUsers = userCollection.filter(
    (o)=>{
      return o.userID === id;
    }
  );
  if(filteredUsers.length){
    return filteredUsers[0];
  }else{
    return null
  }
}

userModel.addNew = ({ usertitle, userurl, useralbum, userthumbnailurl }  )=>{
  var newUser = Object.assign(
    {},
    userTemplate,
    {
        userTitle: usertitle,
        userURL: userurl,
        userAlbum: useralbum,
        userThumbnailURL: userthumbnailurl
    }
  );
  newUser.userID = userCollection.length + 1;

  userCollection.push(newUser);
  writeToFile();
  return newUser;
}

userModel.update = (id, { usertitle, userurl, useralbum, userthumbnailurl })=>{
 var updatingUser = userCollection.filter(
   (o, i)=>{
     return o.userID === id;
   }
 );
 if(updatingUser && updatingUser.length>0){
   updatingUser = updatingUser[0];
 } else {
   return null;
 }
 var updateUser = {};
 var newUpdatedCollection = userCollection.map(
   (o, i)=>{
     if(o.userID === id){
       updateUser = Object.assign({},
          o,
          { userTitle: usertitle, userURL:userurl,
            userAlbum: useralbum, userThumbnailURL: userthumbnailurl}
       );
       return updateUser;
     }else{
       return o;
     }
   }
 );
  userCollection = newUpdatedCollection;
  writeToFile();
  return updateUser;
}

userModel.deleteByCode = (id)=>{
  var newCollection = [];
  newCollection = userCollection.filter(
    (o)=>{
      return o.userID !== id;
    }
  );
  userCollection = newCollection;
  writeToFile();
  return true;
}


 userCollection.push(
   Object.assign(
     {},
     userTemplate,
     {
       userTitle:"A ferret!",
       userURL: "https://unsplash.com/photos/PzN5QTx59O0",
       userAlbum: "Ferrets",
       userID: 1,
       userThumbnailURL: "https://unsplash.com/s/photos/ferret"
     }
   )
 );

// userCollection.push(
//   Object.assign(
//     {},
//     userTemplate,
//     {
//       userEmail: "fulanodetal@uncorre.com",
//       userPswd: "noti5678",
//       userCompleteName: "Fulanito de Tal Menganito",
//       userID: 2,
//       userDateCreated: new Date().getTime()
//     }
//   )
// );
//  // new Date(timestamp)


module.exports = userModel;
