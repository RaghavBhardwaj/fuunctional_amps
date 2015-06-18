<html><body><script language="JavaScript" type="text/JavaScript"> 


var ghtml="${sessionTicket}"
var newlink=window.location.href;
var rmlink=newlink.substring("param=");
window.location='http://173.255.118.110:8080/alfresco/service/javadir?alf_ticket='+ghtml+'#'+newlink;



</script>
</body>

</html>