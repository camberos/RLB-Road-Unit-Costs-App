/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('myApp', []).controller('userCtrl', function($scope, $http) {

$scope.roadDirectUnitCost = '0';

$scope.earthWorksTotal = '0';
$scope.retainingWallsTotal = '0';
$scope.drainageTotal = '0';
$scope.bridgesTotal = '0';
$scope.intersectionsTotal = '0';

$scope.totalDirectCosts = '0';
$scope.projectBaseCost = '0';

$scope.totalProjectBaseDirectCost = '0';

$scope.earthWorks = [
    {id:1, definition:'EO Excavation', surface:'m3', rate:'12'},
    {id:2, definition:'EO Excavation in rock', surface:'m3', rate:'175'},
    {id:3, definition:'EO spoil disposal off site', surface:'m3', rate:'150'},
    {id:4, definition:'EO Contamination', surface:'m3', rate:'250'},
    {id:5, definition:'Fill from cut ', surface:'m3', rate:''},
    {id:6, definition:'Imported Fill', surface:'m3', rate:'200'}
];

$scope.retainingWalls = [
    {id:1, definition:'R/F earth & soil nails', surface:'m3', rate:'250' },
    {id:2, definition:'Retaining walls up to 3.5m', surface:'m3', rate:'150' },
    {id:3, definition:'Retaining walls up to 3.5m - 7.0m', surface:'m3', rate:'250' },
    {id:4, definition:'Retaining walls above 7.0m', surface:'m3', rate:'350' }
];

$scope.drainage = [
    {id:1, definition:'Major box culvert', surface:'m', rate:'520' }

];

$scope.bridges = [
    {id:1, definition:'Bridges up to 25m span', surface:'m2', rate:'3200' },
    {id:2, definition:'Viaduct up to 25m span', surface:'m2', rate:'1450' }

];

$scope.intersections = [
    {id:1, definition:'Class 1 Rural', surface:'no', rate:'4500000' },
    {id:2, definition:'Class 2 Rural', surface:'no', rate:'650000' },
    {id:3, definition:'Class 5 Rural', surface:'no', rate:'280000' },
    {id:4, definition:'Class 6 Urban', surface:'no', rate:'5800000' }

];

$scope.indirectItems = [
    {id:1, definition:'Utilities', surface:'%',  rate:'5.0%' },
    {id:2, definition:'Design', surface:'%',  rate:'5.0%' },
    {id:3, definition:'Traffic Management', surface:'%', rate:'2.0%' },
    {id:4, definition:'Preliminaries', surface:'%', rate:'13.5%' },
    {id:4, definition:'Builders Margin', surface:'%', rate:'4.0%' }
];

$scope.clientDirectCosts = [
    {id:1, definition:'Land Costs ($m)', unit:'$',  totalQuantity:"1"},
    {id:2, definition:'Client Cost including Project Management  ($m)', unit:'%',  totalQuantity:"" }
];

$scope.RoadDirectUnitCost = function(region,roadClassification,roadType,roadLanes) {
    RoadDirectUnitCost=parseInt(region)+parseInt(roadClassification)+parseInt(roadType)+parseInt(roadLanes);
    if (isNaN(RoadDirectUnitCost))
        RoadDirectUnitCost=0;
    $scope.roadDirectUnitCost  = parseInt(RoadDirectUnitCost);
    return RoadDirectUnitCost;  
};

$scope.ProjectBaseCost = function (RoadDirectUnitCost,lengthProjectRoad) {
    ProjectBaseCost=parseInt(RoadDirectUnitCost)*parseInt(lengthProjectRoad);
    if (isNaN(ProjectBaseCost))
        ProjectBaseCost=0;
    $scope.projectBaseCost = parseInt(ProjectBaseCost);
    return ProjectBaseCost;
};

$scope.totalAdditionalCost = function (rate,totalQuantity) {
    totalAdditionalCost = parseInt(rate)*parseInt(totalQuantity);
    if (isNaN(totalAdditionalCost))
        totalAdditionalCost = 0;
    return numberWithCommas(totalAdditionalCost); 
};

$scope.TotalProjectBaseDirectCost = function(){
    var total = 0;
    total =   parseInt($scope.projectBaseCost) + parseInt($scope.totalDirectCosts);
    if (isNaN(total))
        total = 0;
    return numberWithCommas(total);
    };


$scope.getTotalEarthWorks = function(){
    var total = 0;
    // Calculates the sum of the column Total additional cost 
    for(var i = 0; i < $scope.earthWorks.length; i++){
        total += $scope.earthWorks[i].rate*$scope.earthWorks[i].totalQty;
        // Saves total Additional cost to JSON
        $scope.earthWorks[i].totalAdditionalCosts = $scope.earthWorks[i].rate*$scope.earthWorks[i].totalQty;
    }
    // Adds total to variable
    $scope.earthWorksTotal = total;
    // Validate if total is NaN
    if (isNaN(total))
        total = 0;
    return numberWithCommas(total); 
};

$scope.getTotalRetainingWalls = function(){
    var total = 0;
    // Calculates the sum of the column Total additional cost 
    for(var i = 0; i < $scope.retainingWalls.length; i++){
        total += $scope.retainingWalls[i].rate*$scope.retainingWalls[i].totalQty;
        // Saves total Additional cost to JSON
        $scope.retainingWalls[i].totalAdditionalCosts = $scope.retainingWalls[i].rate*$scope.retainingWalls[i].totalQty;
    }
    // Adds total to total variable
    $scope.retainingWallsTotal = total;
    // Validate if total is NaN
    if (isNaN(total))
        total = 0;
    return numberWithCommas(total); 
};

$scope.getTotalDrainage = function(){
    var total = 0;
    // Calculates the sum of the column Total additional cost 
    for(var i = 0; i < $scope.drainage.length; i++){
        total += $scope.drainage[i].rate*$scope.drainage[i].totalQty;
        // Saves total Additional cost to JSON
        $scope.drainage[i].totalAdditionalCosts = $scope.drainage[i].rate*$scope.drainage[i].totalQty;
    }
    // Adds total to total variable
    $scope.drainageTotal = total;
    // Validate if total is NaN
    if (isNaN(total))
        total = 0;
    return numberWithCommas(total); 
};

$scope.getTotalBridges = function(){
    var total = 0;
    // Calculates the sum of the column Total additional cost 
    for(var i = 0; i < $scope.bridges.length; i++){
        total += $scope.bridges[i].rate*$scope.bridges[i].totalQty;
        // Saves total Additional cost to JSON
        $scope.bridges[i].totalAdditionalCosts = $scope.bridges[i].rate*$scope.bridges[i].totalQty;
    }
    // Adds total to total variable
    $scope.bridgesTotal = total;
    // Validate if total is NaN
    if (isNaN(total))
        total = 0;
    return numberWithCommas(total); 
};

$scope.getTotalIntersections = function(){
    var total = 0;
    // Calculates the sum of the column Total additional cost 
    for(var i = 0; i < $scope.intersections.length; i++){
        total += $scope.intersections[i].rate*$scope.intersections[i].totalQty;
        // Saves total Additional cost to JSON
        $scope.intersections[i].totalAdditionalCosts = $scope.intersections[i].rate*$scope.intersections[i].totalQty;
    }
    // Adds total to total variable
    $scope.intersectionsTotal = total;
    // Validate if total is NaN
    if (isNaN(total))
        total = 0;
    return numberWithCommas(total); 
};


$scope.totalDirectCost = function(){
    var total=0;
    $scope.totalDirectCosts = parseInt($scope.earthWorksTotal) + parseInt($scope.retainingWallsTotal) + parseInt($scope.drainageTotal) + parseInt($scope.bridgesTotal) + parseInt($scope.intersectionsTotal);
    total = parseInt($scope.totalDirectCosts);
    if (isNaN(total))
        total = 0;
    return numberWithCommas(total);
};




$scope.saveReport = function() {
    alert("Saved!");
};

$scope.printReport = function() {
    alert("Printing...");
};

$scope.exportPDF = function() {
    alert("Export PDF...");
};

$scope.exportCSV = function() {
    alert("Export CSV...");
};

$scope.resetForm = function() {
     
};

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}



// Data JSON

  // Drodown data Region  
  $http.get('http://rlbroadcost.dev.ddsn.net/Javascript/Ajax/command.aspx?c=getregions')
       .then(function(res){
          $scope.regions = res.data;                
        });
  // Drodown data Road Classification      
  $http.get('http://rlbroadcost.dev.ddsn.net/Javascript/Ajax/command.aspx?c=getroadclassifications')
       .then(function(res){
          $scope.roadClassifications = res.data;                
        });        
  
  // Drodown data Road Type
  $http.get('http://rlbroadcost.dev.ddsn.net/Javascript/Ajax/command.aspx?c=getprojecttypes')
       .then(function(res){
          $scope.roadTypes = res.data;                
        });      
  
  // Drodown data Road Lanes
  $http.get('http://rlbroadcost.dev.ddsn.net/Javascript/Ajax/command.aspx?c=getroadlanes')
       .then(function(res){
          $scope.roadLanes = res.data;                
        });  

});