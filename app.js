//Create a book
class  Book {
constructor(title,author,isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;

}
//show all books
  static showbooks(){

  let  allbooks=Storage.getbooks();

  allbooks.forEach((book)=>{
    Book.addbook(book);
})
    }
//add a book
 static addbook(book) {
    const table=document.querySelector('.table');

    const tr= document.createElement('tr');

    const td=`<td>${book.title}</td>
               <td>${book.author}</td>
               <td>${book.isbn}</td>
               <td><a class="btn btn-danger text-white">X</a></td>`;


    tr.innerHTML=td;

    table.append(tr);

}
//clear all fields function
static clearfields(){

   document.querySelector('#title').value='';
    document.querySelector('#author').value='';
    document.querySelector('#isbn').value='';

}

//remove book function

static removebook(etarget){
    


const btn=etarget;
const td=btn.parentElement.parentElement;

td.remove();
this.showeralert('bremoved');

}


//show alert function
static showeralert(type){


const msg =document.createElement('p');
const container=document.querySelector('.container');
const form=document.querySelector('.book-form');

if(type=='badded'){
msg.innerText="Book Added Successfully!";
msg.className='alert alert-success';
}
else if(type=='berror'){
    msg.innerText="Fill out all the fields!";
    msg.className='alert alert-danger';
}
else if(type=='bremoved'){
    msg.innerText="Book Remove Successfully!";
    msg.className='alert alert-warning';

}
container.insertBefore(msg,form);

setTimeout(() => {
    container.removeChild(msg);
}, 3500);

}



}//closing of the book class





class Storage{

    static getbooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }
        else{
            books=JSON.parse(localStorage.getItem('books'))
            
        }
        return books;
    }


    static addbook(book){
        const books=Storage.getbooks();
    
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));

    }

    static removebook(etarget){

        const btn =etarget;
        const parent=btn.parentElement;
        const isbn =parent.previousElementSibling.innerText;

        let allbooks =Storage.getbooks();
       
        allbooks.forEach((book,index)=>{

            if(book['isbn']==isbn){
                console.log(index);
                allbooks.splice(index,1);
            }

            
        });
            
        const newbookslist =JSON.stringify(allbooks)
        localStorage.setItem('books',newbookslist);
    }
}





















document.addEventListener('DOMContentLoaded',()=>{
Book.showbooks();

    //Add Book
const add=document.querySelector('#add');

add.addEventListener('click',(e)=>{
e.preventDefault();

    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value;
    book= new Book(title,author,isbn);


    if(title=='' || author==''|| isbn==''){
        Book.showeralert('berror');
    }
    else{
        
    Book.addbook(book);
    Book.clearfields();
    Book.showeralert('badded');
    Storage.addbook(book);
}
});


//delete book

const booklist=document.querySelector('.table');

booklist.addEventListener('click',(e)=>{

    if(e.target.className=="btn btn-danger text-white"){
        Book.removebook(e.target);
        Storage.removebook(e.target);

        }

});




});





//Remove Book