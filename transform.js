var transform = angular.module("transform", ['ngclipboard']);

var pattern = /(\w*\b)?[^\(]*\(([\d\.-]+)[^\d-]*([\d\.-]+)[^\d-]*([\d\.-]+)[^\(]*\(([\d\.-]+)[^\d-]*([\d\.-]+)[^\d-]*([\d\.-]+)[^\(]*\(([\d\.-]+)[^\d-]*([\d\.-]+)[^\d-]*([\d\.-]+)[^\(]*\(([\d\.-]+)[^\d-]*([\d\.-]+)[^\d-]*([\d\.-]+)/;

function parseXYZ(matches, start) {  
  return {
    x: parseFloat(matches[start]),
    y: parseFloat(matches[start + 1]),
    z: parseFloat(matches[start + 2])
  };
}

function isBad(xyz) { 
  return isNaN(xyz.x) || isNaN(xyz.y) || isNaN(xyz.z);
}

function pad(q) { 
    if (q < 0)
        return q.toFixed(3) + "    ";
    return " " + q.toFixed(3) + "    ";
}

transform.controller("transformer", function($scope) {
   
  $scope.badString = false; 
  $scope.horizontal = true; 
  $scope.includeCentre = false;
     
  $scope.convert = function() {  
    $scope.badString = false;       
    if (!$scope.excelFormat)
        return null;
      
    var matches = $scope.excelFormat.match(pattern);    
    if (matches == null || matches.length < 13 ||  matches.length > 14) {   
      $scope.badString = true;   
      return null;  
    }  
    var includeName = (matches.length == 14);
    var offset = 1;
    if (includeName) offset = 2;
      
    var centre = parseXYZ(matches, offset);
    if (isBad(centre)) {   
      $scope.badString = true;   
      return null;  
    }
    offset += 3;
      
    var xAxis = parseXYZ(matches, offset);  
    if (isBad(xAxis)) {   
      $scope.badString = true;   
      return null;  
    }    
    offset += 3;

    var yAxis = parseXYZ(matches, offset);  
    if (isBad(yAxis)) {   
      $scope.badString = true;   
      return null;  
    }    
    offset += 3;
    var zAxis = parseXYZ(matches, offset);  
    if (isBad(zAxis)) {   
      $scope.badString = true;   
      return null;  
    }
      
    $scope.xAxis = xAxis;
    $scope.yAxis = yAxis;
    $scope.zAxis = zAxis;
    $scope.centre = centre;
      
    if ($scope.includeCentre)   {   
      if ($scope.horizontal) {    
        var result = pad(xAxis.x) + pad(xAxis.y) + pad(xAxis.z) + "0\n" +
                     pad(yAxis.x) + pad(yAxis.y) + pad(yAxis.z) + "0\n" +
                     pad(zAxis.x) + pad(zAxis.y) + pad(zAxis.z) + "0\n" +
                     pad(centre.x) + pad(centre.y) + pad(centre.z) + "1\n";   
      } else {    
        var result = pad(xAxis.x) + pad(yAxis.x) + pad(zAxis.x) + pad(centre.x) + "\n" +
                     pad(xAxis.y) + pad(yAxis.y) + pad(zAxis.y) + pad(centre.y) + "\n" +
                     pad(xAxis.z) + pad(yAxis.z) + pad(zAxis.z) + pad(centre.z) + "\n" +
                     pad(0) + pad(0) + pad(0) + "1\n";   
      }  
    } else {   
      if ($scope.horizontal) {    
        var result = pad(xAxis.x) + pad(xAxis.y) + pad(xAxis.z) + "0\n" +
                     pad(yAxis.x) + pad(yAxis.y) + pad(yAxis.z) + "0\n" +
                     pad(zAxis.x) + pad(zAxis.y) + pad(zAxis.z) + "0\n" +
                     pad(0) + pad(0) + pad(0) + "1\n";   
      } else {    
        var result = pad(xAxis.x) + pad(yAxis.x) + pad(zAxis.x) + "0\n" +
                     pad(xAxis.y) + pad(yAxis.y) + pad(zAxis.y) + "0\n" +
                     pad(xAxis.z) + pad(yAxis.z) + pad(zAxis.z) + "0\n" +
                     pad(0) + pad(0) + pad(0) + "1\n";   
      }  
    }  
    return result;   
  }
});
