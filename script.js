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

const getMemories = async() => {

    let url = "http://localhost:3006/api/memories/";
    let sending = {};
    if(localStorage.getItem('memories-type') == 'm'){
        url = "http://localhost:3006/api/memories/maneger";
        
        sending.headers = {
            autorisation: localStorage.getItem('memories-token')
        };

    }

   
    let data = await fetch(url, sending);
    let json = await data.json();
    
    let html = "<ul>";
    for(let x in json) {
        
        html += '<li>';
        html += `<span onclick="openMemory('${json[x]._id}')">${json[x].title}</span>`;
        if(localStorage.getItem('memories-type') == 'm' && !json[x].aprove){
            html += `<button onclick="aproveMemory('${json[x]._id}')">aprove</button>`;
        }
        html += '</li>';
    }
    html += "</ul>";

    $("#memoriesID").empty();
    $("#memoriesID").append(html);

}

const openMemory = async(_id) => { 

    console.log(_id);

    let data = await fetch("http://localhost:3006/api/memories/"+_id);
    let json = await data.json();

    let modal = `
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">

            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${json.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    ${json.memory}
                </div>

                <div class="modal-footer">
                    ${json.date}
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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

    let data = await fetch(`http://localhost:3006/api/memories/aprove/${_id}`, {
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
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">

                    <p class="text-danger" id="loginErr"></p>

                    <div class="accordion" id="accordionExample">

                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Login
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div class="accordion-body">

                                    <div class="form-floating mb-3">
                                        <input type="email" class="form-control" id="loginEmail" placeholder="name@example.com">
                                        <label for="loginEmail">Email address</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="password" class="form-control" id="loginPassword" placeholder="Password">
                                        <label for="loginPassword">Password</label>
                                    </div>

                                    <button type="submit" onclick="checkLogin()" class="btn btn-primary mb-3">Login</button>
                                
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Singup
                            </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div class="accordion-body">

                                <div class="form-floating mb-3">
                                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                                    <label for="floatingInput">Email address</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                                    <label for="floatingPassword">Password</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingInput" placeholder="Full Name">
                                    <label for="floatingInput">Full Name</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="tel" class="form-control" id="floatingPassword" placeholder="Phone">
                                    <label for="floatingPassword">Phone</label>
                                </div>

                                <button type="submit" class="btn btn-primary mb-3">singup</button>
                            
                            </div>
                        </div>
                        </div>

                    </div>

                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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

const checkLogin = async() => {

    _email = document.getElementById('loginEmail').value;
    _password = document.getElementById('loginPassword').value;
    
    let data = await fetch("http://localhost:3006/login/", {
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
        
    
        let data = await fetch("http://localhost:3006/api/memories", {
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },      
            body: JSON.stringify({userID: userId, title: title, date: date , memory: memory})
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

