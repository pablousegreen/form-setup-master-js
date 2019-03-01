 (function(){
    document.addEventListener('DOMContentLoaded', function(){
        //console.log("---------YO HAVE A  GOOD DAY-------");
        const display = new Display();
        display.checkFields();
        display.hideSubmit();
    });

    document.getElementById('customer-form').addEventListener('submit', (event) =>{
        event.preventDefault();
        //console.log("***S U B M I T ****");
        const name = document.querySelector('.name');
        const course = document.querySelector('.course');
        const author = document.querySelector('.author');

        const customer = new Customer(name.value, course.value, author.value);
        console.log(customer);
        const display = new Display();

        display.feedback (customer);
        display.clearFields();
    });


    function Display (){
        this.name = document.getElementById('name');
        this.course = document.getElementById('course');
        this.author = document.getElementById('author');
        this.custumers = document.querySelector('.customer-list');
    }

    //checkfields
    Display.prototype.checkFields = function(){
        //console.log("000 : ", this );
        this.name.addEventListener('blur', this.validateFields);
        this.course.addEventListener('blur', this.validateFields);
        this.author.addEventListener('blur', this.validateFields);
    };

    //validate EachField
    Display.prototype.validateFields = function(){
        //console.log("001 : ", this );
        if(this.value === ""){
            this.classList.remove("complete");
            this.classList.add("fail");
        }else{
            this.classList.remove("fail");
            this.classList.add("complete");
        }
        const complete = document.querySelectorAll(".complete");
        //console.log("complete elems: ", complete.length);
        if(complete.length === 3){
            document.querySelector(".submitBtn").disabled = false;
        }else{
            document.querySelector(".submitBtn").disabled = true;
        }
    };

    //disable submit button
    Display.prototype.hideSubmit = function(){
        const btn = document.querySelector(".submitBtn");
        btn.disabled = true;
    };

    Display.prototype.feedback = function(customer){
        const feedback = document.querySelector(".feedback");
        const loading = document.querySelector(".loading");

        feedback.classList.add("showItem", "alert", "alert-success");
        loading.classList.add("showItem");

        const self = this;
        self.hideSubmit();
        setTimeout(()=>{
            feedback.classList.remove("showItem", "alert", "alert-success");
            loading.classList.remove("showItem");
            self.addCustomer(customer);
        }, 3000);
    };

    Display.prototype.addCustomer = function(customer){
        const random = this.getRandom();
        console.log("SAVE: ",customer);
        const div = document.createElement('div');
        div.classList.add('col-11', 'mx-auto', 'col-md-6', 'my-3', 'col-lg-4');
        div.innerHTML = `<div class="card text-left">
        <img src="img/cust-${random}.jpg" class="card-img-top" alt="">
        <div class="card-body">
         <!-- customer name -->
         <h6 class="text-capitalize "><span class="badge badge-warning mr-2">name :</span><span
          id="customer-name"> ${customer.name}</span></h6>
         <!-- end of customer name -->
         <!-- customer name -->
         <h6 class="text-capitalize my-3"><span class="badge badge-success mr-2">course :</span><span
          id="customer-course">
           ${customer.course}
          </span></h6>
         <!-- end of customer name -->
         <!-- customer name -->
         <h6 class="text-capitalize"><span class="badge badge-danger mr-2">author :</span><span
          id="course-author"> ${customer.author}</span></h6>
         <!-- end of customer name -->
        </div>
       </div>`;
       this.custumers.appendChild(div);
    };

    Display.prototype.getRandom = function(){
        let random = Math.floor(Math.random()*5+1);
        return random;
    }

    Display.prototype.clearFields = function(){
        this.name.value = '';
        this.course.value= '';
        this.author.value = '';

        this.name.classList.remove('complete','fail');
        this.course.classList.remove('complete','fail');
        this.author.classList.remove('complete','fail');
    };


    function Customer(name, course, author){
        this.name = name;
        this.course = course;
        this.author = author;
    }
 })();


 