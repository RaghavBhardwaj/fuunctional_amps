<html>
 <body>
<script type="text/javascript">
function checkLoc(){
var loc=window.location.href;
var loc1=window.location.href;
var str = loc1.substring(loc1.indexOf("documentlibrary"));

var substr1=loc.split("/");
var substr3=substr1.slice(5);

 
window.open('http://107.178.209.30:8080/share/proxy/alfresco/getChildren?foldername='+substr3[1]+'&'+str,'servicepage','titlebar=0,toolbar=0,menubar=0,status=1,scrollbars=no,resizable=no,width=400,height=350');


  
}

</script>
<button onclick="checkLoc()">UPLOAD OCR</button>
</body>     
</html>