window.onload = () => {
    render();
} 

const render = async() => {

    $("#addMemoryBtn").hide();
    $("#loginBtn").show();
    $("#welcome").empty();
    $("#logoutBtn").hide();

    if(localStorage.getItem("memories-userId")){
        $("#loginBtn").hide();
        $("#addMemoryBtn").show();
        $("#logoutBtn").show();
        $("#welcome").empty();
        $("#welcome").append("ברוך הבא " + localStorage.getItem("memories-fullName"));
    }

    getMemories();
}

const msg = (_content, _style = 'success') => {

    let msg = `
    <div class="alert alert-${_style} alert-dismissible fade show" role="alert">
        ${_content}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;

    $('#msgID').empty();
    $('#msgID').append(msg);
}

const closeModal = (_modalID) => {
    $("#modalID").innerHTML = "";
    let myModalEl = document.getElementById(_modalID);
    let modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
} 

const openModal = (_id, _content) => {

    $("#modalID").empty();
    $("#modalID").append(_content);

    var myModal = new bootstrap.Modal(document.getElementById(_id))
    myModal.show()

}

const memoryCard = (_memory) => {

    let aprove = "";
    if(localStorage.getItem('memories-type') == 'm' && !_memory.aprove){
        aprove = `<button onclick="aproveMemory('${_memory._id}')" class="btn btn-danger">אישור מנהל</button>`;
    }

    let html = `
    <div class="card bg-dark text-white m-3">
        <img src="${_memory.gallery[0]}" class="card-img" alt="...">
        <div class="card-img-overlay">
            <h5 class="card-title">${_memory.title}</h5>
            <p class="card-text">${_memory.date}</p>
            <button onclick="openMemory('${_memory._id}')" class="btn btn-lg btn-dark">צפה בזיכרון</button>
            ${aprove}
        </div>
    </div>
    `;
   
    return html;

}

const getMemories = async() => {

    let url = "https://memories-rnr.herokuapp.com/api/memories/";
    let sending = {};
    if(localStorage.getItem('memories-type') == 'm'){
        url = "https://memories-rnr.herokuapp.com/api/memories/maneger";
        
        sending.headers = {
            autorisation: localStorage.getItem('memories-token')
        };

    }

   
    let data = await fetch(url, sending);
    let json = await data.json();
    
    let html = '<div class="row">';
    for(let x in json) {
        html += '<div class="col-6">';
        html += memoryCard(json[x]);
        html += '</div>';
    }
    html += "</div>";
    

    $("#memoriesID").empty();
    $("#memoriesID").append(html);

}

const openMemory = async(_id) => { 

    console.log(_id);

    let data = await fetch("https://memories-rnr.herokuapp.com/api/memories/"+_id);
    let json = await data.json();

    let modal = `
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">

            <div class="modal-content">

                <div class="modal-header">
                    <h2 class="modal-title" id="exampleModalLabel">${json.title}
                    <br><span style="font-size:50%;">${json.date}</span></h2>
                   
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">

                    <div class="card mb-3">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${json.gallery[0]}" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                
                                <p class="card-text">${json.memory}</p>
                            </div>
                        </div>
                    </div>

                </div>

                   

                <div class="modal-footer">
                    
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">יציאה</button>
                </div>

            </div>

        </div>
    </div>
    `;

    $("#modalID").empty();
    $("#modalID").append(modal);

    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
    myModal.show()

}

const aproveMemory = async(_id) => {

    console.log(_id);

    let data = await fetch(`https://memories-rnr.herokuapp.com/api/memories/aprove/${_id}`, {
        headers:{
            autorisation: localStorage.getItem('memories-token')
        }
    });
    let res = await data.json();

    if(res == true){
        render();
        msg('הזיכרון אושר בהצלחה');
    }else {
        msg('לא אושר', 'danger');
    }
    

}

const login = async(_id) => { 

    let modal = `
    <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">

            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">התחברות/הרשמה</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">

                    <p class="text-danger" id="loginErr"></p>

                    <div class="accordion" id="accordionExample">

                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    התחברות
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div class="accordion-body">

                                    <div class="form-floating mb-3">
                                        <input type="email" class="form-control" id="loginEmail" placeholder="name@example.com">
                                        <label for="loginEmail">כתובת מייל</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="password" class="form-control" id="loginPassword" placeholder="Password">
                                        <label for="loginPassword">סיסמא</label>
                                    </div>

                                    <button type="submit" onclick="checkLogin()" class="btn btn-primary mb-3">התחברות</button>
                                
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                הרשמה
                            </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div class="accordion-body">

                                <div class="form-floating mb-3">
                                    <input type="email" class="form-control" id="registerEmailID" placeholder="name@example.com">
                                    <label for="registerEmailID">כתובת מייל</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="password" class="form-control" id="registerPasswordID" placeholder="Password">
                                    <label for="registerPasswordID">סיסמא</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="registerFullnameID" placeholder="Full Name">
                                    <label for="registerFullnameID">שם מלא</label>
                                </div>
                        

                                <button type="submit" onclick="register()" class="btn btn-primary mb-3">הרשמה</button>
                            
                            </div>
                        </div>
                        </div>

                    </div>

                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ביטול</button>
                </div>

            </div>

        </div>
    </div>
    `;

    $("#modalID").empty();
    $("#modalID").append(modal);

    var myModal = new bootstrap.Modal(document.getElementById('loginModal'))
    myModal.show()

}

const register = async() => {

    _email = document.getElementById('registerEmailID').value;
    _password = document.getElementById('registerPasswordID').value;
    _fullName= document.getElementById('registerFullnameID').value;

    let data = await fetch("https://memories-rnr.herokuapp.com/api/user/", {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },      
        body: JSON.stringify({email: _email, password: _password, full_name: _fullName})
    });

    try {
        let json = await data.json();
        if(json._id){
            document.getElementById('loginEmail').value = json.email;
            document.getElementById('loginPassword').value = _password;
            checkLogin();
            return;
        }       
    } catch (error) {
        console.log(error);
    }

    $("#loginErr").empty().append("שם משתמש או סיסמא לא תקינים נסה שנית");
    $("#registerEmailID").addClass("is-invalid");
    $("#registerPasswordID").addClass("is-invalid");

}

const checkLogin = async() => {

    _email = document.getElementById('loginEmail').value;
    _password = document.getElementById('loginPassword').value;
    
    let data = await fetch("https://memories-rnr.herokuapp.com/login/", {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },      
        body: JSON.stringify({email: _email, password: _password})
    });

    try {
        let json = await data.json();
        if(json.token){

            localStorage.setItem("memories-token", json.token);
            localStorage.setItem("memories-userId", json.id);
            localStorage.setItem("memories-fullName", json.fullName);
            localStorage.setItem("memories-type", json.type);
            
            closeModal("loginModal");
            render();
            return;
        }       
    } catch (error) {
        console.log(error);
    }
    
    $("#loginErr").append("שם משתמש או סיסמא לא נכונים נסה שנית");
    $("#loginEmail").addClass("is-invalid");
    $("#loginPassword").addClass("is-invalid");

}

const addMemoryModal = () => {

    let modal = `
    <div class="modal fade" id="addMemoryModalID" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">

            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">הוספת זיכרון</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">

                    <p class="text-danger" id="memoryErr"></p>

                    <div class="row">

                        <div class="col">

                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="addMemoryTitleID">
                                <label for="addMemoryTitleID">כותרת זיכרון</label>
                            </div>
                        
                        </div>

                        <div class="col">

                            <div class="form-floating mb-3">
                                <input type="date" class="form-control" id="addMemoryDateID">
                                <label for="addMemoryDateID">תאריך</label>
                            </div>
                        
                        </div>  
                    
                    </div>

                    <div class="form-floating mb-3">
                        <textarea class="form-control" placeholder="כתוב את הזיכרון שלך" id="addMemoryMemoryID" style="height: 100px"></textarea>
                        <label for="addMemoryMemoryID">זיכרון</label>
                    </div>

                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="addMemoryPictureID">
                        <label for="addMemoryPictureID">תמונה</label>
                    </div>

                    <button class="btn btn-primary" onclick="addMemory()">הוסף סיפור </button>

                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ביטול</button>
                </div>

            </div>

        </div>
    </div>
    `;

    openModal('addMemoryModalID', modal);
   
}

const addMemory = async() => {

    let err = () => {
        $("#memoryErr").append("משהו חסר או לא מדוייק בנתונים, אנא נסה שנית..");
        $("#addMemoryTitleID").addClass("is-invalid");
        $("#addMemoryDateID").addClass("is-invalid");
        $("#addMemoryMemoryID").addClass("is-invalid");
    }

    if(localStorage.getItem("memories-token")){

        userId = localStorage.getItem("memories-userId");
        title = document.getElementById('addMemoryTitleID').value;
        date = document.getElementById('addMemoryDateID').value;
        memory = document.getElementById('addMemoryMemoryID').value;
        picture = document.getElementById('addMemoryPictureID').value;
    
        let data = await fetch("https://memories-rnr.herokuapp.com/api/memories", {
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'autorisation': localStorage.getItem('memories-token')
            },      
            body: JSON.stringify({userID: userId, title: title, date: date , memory: memory, gallery: [picture]})
        });

        try {
            let json = await data.json();
            if(json.err){
                err();
            }else{
                msg("הזיכרון נוסף בהצלחה");
                closeModal('addMemoryModalID');
                getMemories();
            }  
        } catch (error) {
            console.log(error);
            err();
        }

    }

}


const logout = async() => {

    localStorage.removeItem("memories-token");
    localStorage.removeItem("memories-userId");
    localStorage.removeItem("memories-fullName");
    localStorage.removeItem("memories-type");

    render();
}

