class FlashMessage {
    constructor({type, message}){
        this.message = message;
        //type will be used to determine background color
        //color will be red if it's an error type, blue if it's not
        this.color = type == "error" ? 'bg-red-200' : 'bg-blue-100';
        this.render();
    }
    //when it's a static message it can only be call on the Class itself, not an instance of a class
    static container() {
        return this.c ||= document.querySelector('#flash')
    }
    render() {
        // debugger
        this.toggleMessage();
        //error function here makes sure that when this function gets executed, the context will be the same. So we'll still have access to the message and color. 
        window.setTimeout(() => this.toggleMessage(), 5000);
    }
    toggleMessage() {
        // console.log(this);
        FlashMessage.container().textContent = this.message; 
        FlashMessage.container().classList.toggle(this.color);
        FlashMessage.container().classList.toggle('opacity-0');
    }
}
