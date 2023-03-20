const addUserBtn= document.getElementById('addUser');
const btnText=addUserBtn.innerText;
const usernameTextField=document.getElementById('username');
const recordDisplay=document.getElementById('record');
let userArray=[];
let edit_id=null;

let objStr=localStorage.getItem('users')
if(objStr != null)  {
   userArray= JSON.parse(objStr)
}  

DisplayInfo();
addUserBtn.onclick= () => {
   let name=null;
     name = usernameTextField.value;
    if(name != null){
        if(edit_id !=null){
            //edit
            userArray.splice(edit_id,1,{'name' : name});
            edit_id=null;
        }else{
            //insert
            userArray.push({'name' : name});
            
        }
        SaveInfo(userArray)
        usernameTextField.value='';
        DisplayInfo();
        addUserBtn.innerHTML=btnText;
        name=null;
    }
}




function SaveInfo(userArray){
    let str=JSON.stringify(userArray);
    localStorage.setItem('users',str);
}

function DisplayInfo(){
    let statement= '';
    userArray.forEach((user , i) =>{

        statement += `<tr>
        <th scope="row"> ${i+1}</th>
        <td>${user.name}</td>
        <td><i class="btn text-white fa fa-edit btn-info mx-3"  onclick='EditInfo(${(i)})'></i> <i class="btn btn-danger text-white fa fa-trash-o" onclick='DeleteInfo(${(i)})'></i> </td>
        </tr>`;   
    });
    recordDisplay.innerHTML=statement;
}

function EditInfo(id){
    edit_id=id;
    usernameTextField.value=userArray[id].name;
    addUserBtn.innerHTML='Save Changes';
 
}
function DeleteInfo(id){
   userArray.splice(id,1);
   SaveInfo(userArray)
   DisplayInfo();
}