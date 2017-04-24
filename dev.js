var Setup = function () {

  import System.IO;

  this.filePath = "./testWrite.txt";
  this.gridSize = 10;
  this.pageWidth = 101;
  this.pageLength = 10001;
  this.xSegments = int(this.pageWidth / this.gridSize) + 1;
  this.ySegments = int(this.pageLength / this.gridSize) + 1;
  this.grid = {}

  this.init = function() {
    this.initializeGrid();
  };
   
  this.writeFile = function(lines) {
      var sw : StreamWriter = new StreamWriter(this.filepath);
      for (var index = 0; index <= lines.length; index++) {
        line = lines[index];
        sw.WriteLine(line);
      };
      sw.Flush();
      sw.Close();
  }
   
  this.readFile = function() {
      sr = new File.OpenText(this.filepath);
   
      lines = [];
      while (true) {
          input = sr.ReadLine();
          if (input == null) { break; }
          console.log(input);
          lines.push(input);
      };

      sr.Close();

      return lines;
  }

  this.addLineToFile = function(line) {
      existingLines = this.readFile();
      existingLines.push(line);
      this.writeFile(existingLines);
  }

  this.trigger = function(xValue, yValue, sentimentValues) {
    line = xValue.toString() + ";" + yValue.toString()
    for (var index = 0; index <= sentimentValues.length; index++) {
      sentiment = sentimentValues[index];
      line = line + ";" + sentiment.toString();
    }
    this.addLineToFile(line);
  }

  this.parseFile = function(lines) {
      dataPoints = {};
      for (var index = 0; index <= lines.length; index++) {
          line = lines[index];
          lineArray = line.split(";")
          xValue = lineArray[0].toString();
          yValue = lineArray[1].toString();
          sentimentValues = lineArray.slice(2, lineArray.length);
          dataPoints[xValue + ";" + yValue] = sentimentValues;
      };
      return dataPoints;
  }

  this.initializeGrid = function() {
    for (var x = 0; x <= this.xSegments; x++) {
      for (var y = 0; y <= this.ySegments; y++) {
        this.grid[x.toString() + ";" + y.toString()] = [];
      }
    }
  }

  this.gridDataPoints = function(dataPoints) {
    for (var dataPoint in dataPoints) {
      splitKey = dataPoint.split(";");
      x = int(splitKey[0] / this.xSegments);
      y = int(splitKey[1] / this.ySegments);
      this.grid[x.toString() + ";" + y.toString()] = dataPoints[dataPoint];
    }
  }


  
}




