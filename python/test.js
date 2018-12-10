const spawn = require("child_process").spawn;
const pythonProcess = spawn('sudo','python',["./test.py"]);

pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  
  pythonProcess.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
  
  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });