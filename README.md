# converttransform
Convert numbers from Excel containing segments with transformation as centre and X,Y,Z axes to format suitable for CloudCompare
Choose between horizontal and vertical orientation
The pasted text has to be something like 
 ks1p1 (110.976,-57.032, 464.970) X:(0.051, -0.1151, -0.522); Y:(-0.504, 0.276, -0.327); Z:(0.593, 0.446, -0.670)
where first column is name of segment (no spaces), then 4 vectors representing centre point, X axis, Y axis, Z axisEach vector has to be surrounded by () and commas between numbers. Other characters (like the X: above) are ignored
[![Deploy to Azure](http://azuredeploy.net/deploybutton.png)](https://azuredeploy.net/)
