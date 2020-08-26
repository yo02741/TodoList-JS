var event_el = document.querySelector('#event');
var add_el = document.querySelector('#add');
var list_el = document.querySelector('#list');
var undone_el = document.querySelector('#undone');
var clear_el = document.querySelector('#clear');

var deletebtn_nodelist = document.querySelectorAll('.del');
var donebtn_nodelist = document.querySelectorAll('.donebtn');

var str = '';
var arr = [];
var eventCount = 0;
var undoneCount = 0;

window.onload = event_el.focus();


add_el.addEventListener('click',addData)
function addData(){ 
   if(event_el.value !== ""){
    arr.push({
      eventId : eventCount + 1,
      eventName : event_el.value,
      eventStatus : ""
    });
    eventCount++;
    render();
    setListener();
  }else{
    alert('Please enter event !');
  }
}

event_el.addEventListener('keyup',function(event){
    if (event.keyCode === 13){
        addData();
    }
});

clear_el.addEventListener('click',clearData)
function clearData(){
  arr = [];
  eventCount = 0;
  undoneCount = 0;
  render();
}

function deleteData(e){
  let result = arr.map(item=>{
    return item.eventId; ;
  }).indexOf(parseInt(e.target.id));
  
  arr.splice(result ,1);
  
  render();
}

function setListener(){
  deletebtn_nodelist = document.querySelectorAll('.del');
  deletebtn_nodelist.forEach( (delbtn,key) => {
      delbtn.addEventListener('click', deleteData)
    })

  
  donebtn_nodelist = document.querySelectorAll('.donebtn');
  donebtn_nodelist.forEach( (donebtn,key) => {
      donebtn.addEventListener('change', changeStatus)
    })
}

function changeStatus(e){
  let result = arr.map(item=>{
    return item.eventId; ;
  }).indexOf(parseInt(e.target.id.replace('id','')));
  
  arr[result].eventStatus == "" ? arr[result].eventStatus = "checked" : arr[result].eventStatus = "";
  
  render();
}

function checkUndone(){
  undoneCount = 0;
  arr.forEach( item =>{
    if(item .eventStatus == '') undoneCount++;
  })
}


function render(){
  str = "";
  
  arr.forEach( item =>{
    str += `<li class="d-flex justify-content-between align-items-center">
              <input type="checkbox" class="donebtn" id="${ 'id'+item.eventId }" ${item.eventStatus}>
              <label for="${ 'id'+item.eventId }" class="mb-0">${ item.eventName }</label>
              <a href="#" class="del" id="${ item.eventId }">X</a>
          </li>`;
  })
  
  event_el.value = '';
  list_el.innerHTML = str;
  setListener();
  
  checkUndone();
  undone_el.innerText = undoneCount;
}