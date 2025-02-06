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
      setUser = (obj) => {
        //return fetch();
      };
  
      updateUser = (id) => {};
    }
  
    return new Init();
  })();
  //Model.getUserById(1).then((data) => console.log(data));
  //Model.getAllUsers().then((data) => console.log(data));

  //View

  const View = (()=>{
    //capture all the inputs
    const userobj = Model.User();
    userobj.firstname = Document.querySelector(".first-name");
    userobj.lastname = Document.querySelector(".last-name");
    userobj.email = Document.querySelector(".email");
    userobj.number = Document.querySelector(".number");
    userobj.password = Document.querySelector(".password");
    const confirmPass = Document.querySelector(".confirm-password");
    //Render success/failure message
    //redirecting to signin page
    //redirecting to register/index page
    //return all the methods

  })();
  