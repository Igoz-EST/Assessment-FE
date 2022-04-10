    const btn = document.querySelector('button');
    const container = document.querySelector('.container');
    const fragment = document.createDocumentFragment();
        function getRequest(cb){
        const requestURL = 'https://my.api.mockaroo.com/shipments.json?key=5e0b62d0';
    //making a XHR request
        const xhr = new XMLHttpRequest();
        xhr.open('GET', requestURL);
       
        xhr.onload = () => {
          if (xhr.status !== 200) {
          
            console.log(`Error ${xhr.status}: ${xhr.statusText}`);
            return;
          }
    //parse the data from the server to array
          const response = JSON.parse(xhr.responseText);
          cb(response);
          
        };
        
        xhr.onerror = () => { 
          console.log(`Error while executing request`);
        };
        xhr.send();
    }

    //making a table and fill it with data from server
    btn.addEventListener('click', e =>{
        
        const tbody = document.createElement('tbody');
        const table = document.createElement('table');    
table.classList.add('table');
const thead = document.createElement('thead');
const tr = document.createElement('tr');
const orderNO = document.createElement('th');
orderNO.textContent = 'OrderNO';
const deliveryDate = document.createElement('th');
deliveryDate.textContent = 'DeliveryDate';
const customer = document.createElement('th');
customer.textContent = 'Customer';
const trackingNO = document.createElement('th');
trackingNO.textContent = 'TrackingNO';
const statusth = document.createElement('th');
statusth.textContent = 'Status';
const consignee = document.createElement('th');
consignee.textContent = 'Consignee';
const col = document.createElement('th');

tr.appendChild(orderNO);
tr.appendChild(deliveryDate);
tr.appendChild(customer);
tr.appendChild(trackingNO);
tr.appendChild(statusth);
tr.appendChild(consignee);
tr.appendChild(col);

thead.appendChild(tr);
table.appendChild(thead);
console.log(table);
    getRequest((response) => { 

        response.forEach(element => {
        
        const tr = document.createElement('tr');
        const orderNO = document.createElement('td');
        orderNO.textContent = element.orderNo;
        const deliveryDate = document.createElement('td');
        deliveryDate.textContent = element.date;
        const customer = document.createElement('td');
        customer.textContent = element.customer;
        const trackingNo = document.createElement('td');
        trackingNo.textContent = element.trackingNo;
        const statusth = document.createElement('td');
        statusth.textContent = element.status;
        const consignee = document.createElement('td');
        consignee.textContent = element.consignee;
        const button = document.createElement('button');
        button.textContent = "delete";
          button.classList.add('btn-danger');
        tr.appendChild(orderNO);
        tr.appendChild(deliveryDate);
        tr.appendChild(customer);
        tr.appendChild(trackingNo);
        tr.appendChild(statusth);
        tr.appendChild(consignee);
          tr.appendChild(button);
          tr.setAttribute('data-id', orderNO.textContent);
         tbody.appendChild(tr);

        }); 
        
        table.classList.add('table');
        table.classList.add('table-dark');
        table.classList.add('table-striped');
        table.appendChild(tbody);
        fragment.appendChild(table);
     //   console.log(response);
    });
    
 setTimeout(() => {
   container.appendChild(fragment);
 }, 1500);
 
    
    });


    container.addEventListener('click', onDeleteHandler);


    //deleting the element
    function deleteRow(parent){
      const isConfirm = confirm('Are you sure you want to delete the row?');
        if(!isConfirm) return;
          parent.remove();
    }

    //define the the element to delete
    function onDeleteHandler({target}) {
      if(target.classList.contains('btn-danger')){
      
      const parent = target.closest('[data-id]');
      const id = parent.dataset.id;

      deleteRow(parent);
     }
    }
