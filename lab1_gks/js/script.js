$(document).ready(function(){
	var operationsList = new Array();
	var objectArray = new Array();
	var countObject;
	var tableArray = new Array();
	var countTable = new Array();
	var groups = new Array;
	
	document.getElementById('addElement').onclick = function() {
	$('<li class="elementOfList"><input type="text" size="50" name="form"></li>').appendTo('#list');	
	}
	
	document.getElementById('process').onclick = function() {
		var countLi = (document.getElementById('list').childNodes.length);
		countLi = countLi - 1;
		countObject = countLi;
		//console.log(countLi);
		for (var q = 0; q < countLi; q++) {
					objectArray[q] = new Array();
			}
		
		operationsList = document.getElementById('list').childNodes[1].childNodes[0].value.split(' ');
		for (var m = 0; m < operationsList.length; m++) {
					objectArray[0][m] = operationsList[m];
			}
		var i = 1;
		q = 0;
		var tempOperationsList;
		do {	
			i++;
			tempOperationsList = document.getElementById('list').childNodes[i].childNodes[0].value.split(' ');
			for (var j = 0 ; j < tempOperationsList.length ; j++){
				objectArray[i-1][j] = tempOperationsList[j];			
				for (var k = 0; k < operationsList.length; k++) {
					if(tempOperationsList[j] == operationsList[k]) break;
					if(k == operationsList.length-1) operationsList.push(tempOperationsList[j])	
				}
			}
			
			//console.log(operationsList,'i:',i,'countLi:',countLi);	
		} while (countLi > i);
				
		for (var k = 0; k < operationsList.length; k++) {
			if(operationsList[k] == '') {
				var lastEl = operationsList.length - 1;
				if (k != lastEl) {operationsList[k] = operationsList[lastEl];
				lastEl--;
				}
				operationsList.splice(lastEl,1);
			};
		}
		
		
		for (var q = 0; q < countObject; q++) {
					tableArray[q] = new Array();
		}
		var myTableDiv = document.getElementById("myDynamicTable"); 
		var table = document.createElement('TABLE');
		table.border='1';
		
		var tableBody = document.createElement('TBODY');
		table.appendChild(tableBody);
		  
		for (var i=0; i < countObject+1; i++){
		   var tr = document.createElement('TR');
		   tableBody.appendChild(tr);
		   
		   var flag;
		   for (var j=0; j<operationsList.length+1; j++){
				var td = document.createElement('TD');
				var rightSide = document.getElementById('right_side').style.width;
				
				td.width = (550)/operationsList.length + 'px';	
				td.align='center';				
				if (i == 0 && j != 0) td.appendChild(document.createTextNode(operationsList[j-1]));
				if (j == 0 && i != 0) td.appendChild(document.createTextNode(i));					
				
				
				
				if ( (j != 0) && (i != 0) ) {
					flag = 0;
					for (var k = 0 ;k <operationsList.length; k++) {
						if (operationsList[j-1] == objectArray[i-1][k]) {
							tableArray[i-1][j-1] = '+';
							td.appendChild(document.createTextNode(tableArray[i-1][j-1]));	
							flag = 1;
							break;
						}
					}
					if (flag == 0) { 
						tableArray[i-1][j-1] = '-';	
						td.appendChild(document.createTextNode(tableArray[i-1][j-1]));												
					}
				}	
				tr.appendChild(td);
		   }
		   
		}
		//console.log(i,j);
		myTableDiv.appendChild(table);
		//2 таблица
		
		for (var q = 0; q < countObject; q++) {
			countTable[q] = new Array();
		}	
				
		var myTableDiv2 = document.getElementById("myDynamicTable2"); 
		var table2 = document.createElement('TABLE');
		table2.border='1';
		var tableBody2 = document.createElement('TBODY');
		table2.appendChild(tableBody2);
		
		for (var i=0; i < countObject+1; i++){
		   var tr = document.createElement('TR');
		   tableBody2.appendChild(tr);
			
			for (var j=0; j < countObject+1; j++){
				var td = document.createElement('TD');
				//var rightSide = document.getElementById('right_side').style.width;
				td.width = (550)/operationsList.length + 'px';	
				td.align='center';				
				if (i == 0 && j != 0) td.appendChild(document.createTextNode(j));
				if (j == 0 && i != 0) td.appendChild(document.createTextNode(i));
				if (j == i && i != 0) {
					countTable[i-1][j-1] = '-';
					td.appendChild(document.createTextNode('-'));
				}
				if (i != j && i!=0 && j!=0) {
					var counter = 0;
					for (var q = 0; q < operationsList.length; q++) {
						if (tableArray[j-1][q] != tableArray[i-1][q]) counter++;
					}
				
				countTable[i-1][j-1] = operationsList.length - counter;
				td.appendChild(document.createTextNode(countTable[i-1][j-1]));		
				}				
				tr.appendChild(td);
		   }
		}
		myTableDiv2.appendChild(table2);		
		//разбивка по группам
				
		function foundMax(mas, amount) {		
			var maxElement = 0;
			var tempI;
			var tempJ;
			for (var i=0; i < amount; i++){
				for (var j=0; j < amount; j++) {
					if (mas[i][j] > maxElement) {
						maxElement = mas[i][j];
						tempI = i;
						tempJ = j;	
					}	
				}
			}
		return maxElement;
		}
		
		
		var maximum = 0;
		var tempCountTable = countTable;
		var tempList;
		var nextElement;
		
		var stek = new Array;

		var numberGroup = 0;
		var flagDone = false;
		
		do {		
			maximum = foundMax(tempCountTable, countObject);
			
			groups[numberGroup] = new Array();			
			
			var foundMaximum = false;
			for (var i = 0; i < countObject; i++) {
				for (var j = 0; j < countObject; j++) {
					if (tempCountTable[i][j] == maximum) {
						stek.push(i);
						stek.push(j);
						
						groups[numberGroup].push(i);
						groups[numberGroup].push(j);
						foundMaximum = true;
						break;
					}			
				}
				if (foundMaximum) break;
			}
			
			while (stek.length > 0) {
				var currentIndex = stek.shift();
				for (var i=0; i < countObject; i++) {
					if (tempCountTable[currentIndex][i] == maximum) {	
						if (jQuery.inArray(i, groups[numberGroup]) == -1) {
							stek.push(i);
							groups[numberGroup].push(i);
						}
					}
					
				}
				

			}
			
			for (i = 0; i < groups[numberGroup].length; i++) {
				var deleteIndex = groups[numberGroup][i];
				for (j = 0; j < countObject; j++) {
					tempCountTable[deleteIndex][j] = '-';
					tempCountTable[j][deleteIndex] = '-';
				}
			
			}

			
			
			if  (maximum == 0) {
				var notFinish = false;
				for (var i = 0; i < countObject; i++) {
					for (var j = 0; j < countObject; j++) {
						if (tempCountTable[i][j] == 0) {
							notFinish = true;
							break;
						}							
					}
					if (notFinish) break;
				}
				if (!notFinish) {
					flagDone = true;									
					var InGroups = false;
					for (var q = 0; q < countObject; q++) {
						InGroups = false;
						var counter = 0;
						for (var m = 0; m < numberGroup; m++) {
							for (var s = 0; s < groups[m].length; s++) {
								
								
								if (groups[m][s] == q) {
									InGroups = true;
									break;
								}
								counter++;
											
							}	
						}
						//if (counter == countObject-1) InGroups = false;
						if (!InGroups) { 
							//numberGroup++;
							//groups[numberGroup] = new Array();
							groups[numberGroup][0] = q;
							numberGroup++;
							break;
						}
					}
					var temp = groups.length - 1;
					console.log(temp);
					//alert 
					if (groups[temp].length == 0) groups.splice(temp,1) ;
						var newGroups = new Array();
						for (var q = 0; q < groups.length; q++) {
							newGroups[q] = new Array();
						}
						for (var m = 0; m < numberGroup; m++) {
							for (var s = 0; s < groups[m].length; s++) {
								var tempElement = groups[m][s];
								tempElement++;
								newGroups[m][s] = tempElement;
							}
							var li = document.createElement('li');
							var p = document.createElement('p');
							var myP = document.getElementById("groups");								
							li.appendChild(document.createTextNode(newGroups[m]));
							p.appendChild(li);
							myP.appendChild(p);
							//li.appendChild(p);
							//myP.appendChild(li);	
							//$('<li class="elementOfList"><input type="text" size="50" name="form"></li>').appendTo('#list');
						}
				}
			}
			
			numberGroup++;
						
		} while (!flagDone)
		//$('<input id="lab2" type="button" value="Уточнити групи"/>').appendTo('#right_side');
	}
	
	
	document.getElementById('delete').onclick = function() {		
		var myDynamicTable2 = document.getElementById('myDynamicTable2');
		var myDynamicTable = document.getElementById('myDynamicTable');
		var deleteGroups = document.getElementById('groups');
		$(myDynamicTable2).empty();
		$(myDynamicTable).empty();
		$(deleteGroups).empty();		
	}
	function collapsElement(id) {
		if ( document.getElementById(id).style.display != "none" ) {
		document.getElementById(id).style.display = 'none';
		}
		else {
		document.getElementById(id).style.display = '';
		}
	}
	/*
	T1 C2 T3 C3 T4 F1
	T2 T5 T4 F1 T2 T3
	T5 T4 T1 C2 T3 
	T5 T1 C2 T3
	T4 F1 T1 C2 T3
	
	*/
});