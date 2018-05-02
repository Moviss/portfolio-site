import $ from 'jquery';

class Modal {
    constructor() {
        this.openModalButton = $(".open-modal");
        this.modal = $(".modal");
        this.closeModalButton = $(".modal__close");
        this.events();
        this.contactForm();
    }

    events(){
        // clicking the open modal button
        this.openModalButton.click(this.openModal.bind(this));

        // clicking the x close modal button
        this.closeModalButton.click(this.closeModal.bind(this));

        // pushes any key
        $(document).keyup(this.keyPressHandler.bind(this));
    }

    keyPressHandler(e) {
        if (e.keyCode == 27) {
            this.closeModal();
        }
    }
    
    openModal() {
        this.modal.addClass("modal--is-visible");
        return false;
    }

    closeModal() {
        this.modal.removeClass("modal--is-visible");
    }

    contactForm() {
            $("html").on("submit","#contact_form",function(e){
              e.preventDefault();
              $("#send_form_status").html('').hide();
              var data=$("#contact_form").serialize();
              $.post("/send_form.php",data,function(res){
                $("#send_form_status").html(res.msg).show();
                if(res.status==1){ 
                  $("#contact_form")[0].reset();
                } 
              });
            });
    }
}

export default Modal;