//Model
const Model = (() => {
    class User {
      constructor() {
        this.firstname = "";
        this.lastname = "";
        this.email = "";
        this.number = "";
        this.password = "";
      }
    }
    class Init {
      constructor() {
        this.url = "http://localhost:3000/users";
      }
  
      getAllUsers = () => {
        return fetch(this.url)
          .then((res) => {
            return res.json();
          })
          .catch((err) => {
            console.log("Error fetching all users", err);
          });
      };
  
      getUserById = (id) => {
        return fetch(`${this.url}/${id}`)
          .then((res) => {
            return res.json();
          })
          .catch((err) => {
            console.log(`Couldn't fetch user ${id}`, err);
          });
      };
      setUser = async (obj) => {
        const users = await this.getAllUsers();
        //console.log(users)
        const maxID = users.length > 0 ? Math.max(...users.map(user=>Number(user.id))) : 0;
        //console.log(maxID);
        obj.id = String(maxID+1);//converting to a string because the delete,get,update etc queries only work if the id is string apparently.
        return fetch(this.url,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(obj),
        }).then((res)=>res.json())
        .catch((err)=>{console.log("Error Creating user:",err);});
      };
  
      updateUser = (id, updatedobj) => {
        return fetch(`${this.url}/${id}`,{
          method:'PUT',
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(updatedobj),
        }).then((res)=>res.json())
        .catch((err)=>console.log("Error updating the user",err));
      };

      deleteUser = (id)=>{
        return fetch(`${this.url}/${id}`,{
          method:"DELETE",
          headers:{"Content-Type":"application/json"},
        })
        .then((res)=>res.json())
        .catch(err=>console.log("Error Deleting user",err));
      };
    }
  
    return {api:new Init(),User};
  
  })();
  //Model.getUserById(1).then((data) => console.log(data));
  //Model.getAllUsers().then((data) => console.log(data));

  //View

  const View = (()=>{
    const registerbtn = document.querySelector(".register");
    const signinbtn = document.querySelector(".signin");
    //capture all the inputs
    const getInputValue=(selector)=>{
      const inputs = document.querySelectorAll(selector);

      let confirmPass="";
      //console.log(inputs);
      const userobj = new Model.User();
      inputs.forEach(ele=>{
        if(ele.className === "first-name input")
          userobj.firstname = ele.value;
        if(ele.className === "last-name input" )
          userobj.lastname = ele.value;
        if(ele.className === "number input" )
          userobj.number = ele.value;
        if(ele.className === "email input" )
          userobj.email = ele.value;
        if(ele.className === "password input" )
          userobj.password = ele.value;
        if(ele.className === "confirm-password input" )
          confirmPass = ele.value;

      });
      //console.log(userobj);
      return {userobj,confirmPass};
    }

    //Clear all inputs
    const clearAll=(formid)=>{ // parameter has to be a form id
       document.getElementById(formid).reset();
    }

   
    //Render success/failure message
    const Render = (statuscode)=>{
      //if statuscode == successfull
      alert("Success");
      //else if statuscode == notsuccessfull
      alert("Failure");
    }

    //redirecting to signin page
    //redirecting to register/index page
    //return all the methods
    return{
      getInputValue,clearAll,Render,registerbtn,signinbtn
    }

  })();
  //View.getInputValue(".input");


  //Controller
  const Controller = (()=>{
    //capture inputs, Call post method on clicking register and then render
    
      View.registerbtn.addEventListener("click",
        (event)=>{
          event.preventDefault();
          const {userobj, confirmPass} = View.getInputValue(".input");
          console.log(userobj);
          console.log(confirmPass);
          Model.api.setUser(userobj).then(res=>console.log("User Created",res));

        }
      )
      View.signinbtn.addEventListener("click",
        (event)=>{
          event.preventDefault();
          // const userobj = Model.api.getUserById(1).then(res=>console.log(res));
          // const mergedobj = {...userobj,...{firstname:"Vipul",lastname:"Singh",email:"abc.gmail.com"}}
          // Model.api.updateUser(1,mergedobj).then(res=>console.log("User Updated",res));
          Model.api.deleteUser(9).then((res)=>console.log("Deleted User",res));
        }
      )


    
    //return register();
    //capture inputs, call validate method on clicking signin and then render
  })(Model,View);
  //Controller();
  