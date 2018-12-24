
document.querySelector(".add").disabled = this.value ? false : true
document.querySelector(".formInput").onkeyup = function(){
	document.querySelector(".add").disabled = this.value ? false : true
}