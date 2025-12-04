const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('the index.js file', () => {
  it('should use a task class to create new objects for each task in the tasks array', async function() {
    const testTask = await page.evaluate(() => {
      return new Task('test description', 'test status');
    });
      
    expect(testTask.description).toBe('test description');
    expect(testTask.status).toBe('test status');
    
    const tasks = await page.evaluate(() => tasks );

    expect(tasks.length).toBe(8);
    
    const firstTaskIsTask = await page.evaluate(() => {
      return tasks[0] instanceof Task;
    });
    expect(firstTaskIsTask).toBe(true);

    expect(tasks[0].description).toBe('pack spikes for track meet');
    expect(tasks[0].status).toBe('todo');
    
    const secondTaskIsTask = await page.evaluate(() => {
      return tasks[1] instanceof Task;
    });
    expect(secondTaskIsTask).toBe(true);

    expect(tasks[1].description).toBe('make my bed');
    expect(tasks[1].status).toBe('todo');
    
    const thirdTaskIsTask = await page.evaluate(() => {
      return tasks[2] instanceof Task;
    });
    expect(thirdTaskIsTask).toBe(true);
    
    expect(tasks[2].description).toBe('walk the dog');
    expect(tasks[2].status).toBe('todo');

    const fourthTaskIsTask = await page.evaluate(() => {
      return tasks[3] instanceof Task;
    });
    expect(fourthTaskIsTask).toBe(true);
    
    expect(tasks[3].description).toBe('write draft english paper');
    expect(tasks[3].status).toBe('doing');
    
    const fifthTaskIsTask = await page.evaluate(() => {
      return tasks[4] instanceof Task;
    });
    expect(fifthTaskIsTask).toBe(true);
    
    expect(tasks[4].description).toBe('sanding art project');
    expect(tasks[4].status).toBe('doing');
    
    const sixthTaskIsTask = await page.evaluate(() => {
      return tasks[5] instanceof Task;
    });
    expect(sixthTaskIsTask).toBe(true);

    expect(tasks[5].description).toBe('wash the dishes');
    expect(tasks[5].status).toBe('done');
    
    const seventhTaskIsTask = await page.evaluate(() => {
      return tasks[6] instanceof Task;
    });
    expect(seventhTaskIsTask).toBe(true);
 
    expect(tasks[6].description).toBe('finish math homework');
    expect(tasks[6].status).toBe('done');

    const eigthTaskIsTask = await page.evaluate(() => {
      return tasks[7] instanceof Task;
    });
    expect(eigthTaskIsTask).toBe(true);
 
    expect(tasks[7].description).toBe('practice my trumpet');
    expect(tasks[7].status).toBe('done');
  });

  it('should display the same before and after each task is encapsulated in objects', async function() {
    const todoCards = await page.$$eval('#todo-cards > .card', (results) => results );
    expect(todoCards.length).toBe(3);

    const doingCards = await page.$$eval('#doing-cards > .card', (results) => results );
    expect(doingCards.length).toBe(2);
    
    const doneCards = await page.$$eval('#done-cards > .card', (results) => results );
    expect(doneCards.length).toBe(3);
      
    const firstCard = await page.$eval('#task-0', (result) => result.innerHTML );
    const secondCard = await page.$eval('#task-1', (result) => result.innerHTML ); 
    const thirdCard = await page.$eval('#task-2', (result) => result.innerHTML ); 
    const fourthCard = await page.$eval('#task-3', (result) => result.innerHTML ); 
    const fifthCard = await page.$eval('#task-4', (result) => result.innerHTML ); 
    const sixthCard = await page.$eval('#task-5', (result) => result.innerHTML ); 
    const seventhCard = await page.$eval('#task-6', (result) => result.innerHTML ); 
    const eighthCard = await page.$eval('#task-7', (result) => result.innerHTML ); 
      
      
    expect(firstCard).toContain('pack spikes for track meet');
    expect(firstCard).toMatch(/<a href="\/edit\/0">[\s\S]*Edit[\s\S]*<\/a>/);
    expect(firstCard).toMatch(/<a href="\/delete\/0">[\s\S]*Delete[\s\S]*<\/a>/);
    
    expect(secondCard).toContain('make my bed');
    expect(secondCard).toMatch(/<a href="\/edit\/1">[\s\S]*Edit[\s\S]*<\/a>/);
    expect(secondCard).toMatch(/<a href="\/delete\/1">[\s\S]*Delete[\s\S]*<\/a>/);
    
    expect(thirdCard).toContain('walk the dog');
    expect(thirdCard).toMatch(/<a href="\/edit\/2">[\s\S]*Edit[\s\S]*<\/a>/);
    expect(thirdCard).toMatch(/<a href="\/delete\/2">[\s\S]*Delete[\s\S]*<\/a>/);

    expect(fourthCard).toContain('write draft english paper');
    expect(fourthCard).toMatch(/<a href="\/edit\/3">[\s\S]*Edit[\s\S]*<\/a>/);
    expect(fourthCard).toMatch(/<a href="\/delete\/3">[\s\S]*Delete[\s\S]*<\/a>/);
    
    expect(fifthCard).toContain('sanding art project');
    expect(fifthCard).toMatch(/<a href="\/edit\/4">[\s\S]*Edit[\s\S]*<\/a>/);
    expect(fifthCard).toMatch(/<a href="\/delete\/4">[\s\S]*Delete[\s\S]*<\/a>/);
    
    expect(sixthCard).toContain('wash the dishes');
    expect(sixthCard).toMatch(/<a href="\/edit\/5">[\s\S]*Edit[\s\S]*<\/a>/);
    expect(sixthCard).toMatch(/<a href="\/delete\/5">[\s\S]*Delete[\s\S]*<\/a>/);
    
    expect(seventhCard).toContain('finish math homework');
    expect(seventhCard).toMatch(/<a href="\/edit\/6">[\s\S]*Edit[\s\S]*<\/a>/);
    expect(seventhCard).toMatch(/<a href="\/delete\/6">[\s\S]*Delete[\s\S]*<\/a>/);
    
    expect(eighthCard).toContain('practice my trumpet');
    expect(eighthCard).toMatch(/<a href="\/edit\/7">[\s\S]*Edit[\s\S]*<\/a>/);
    expect(eighthCard).toMatch(/<a href="\/delete\/7">[\s\S]*Delete[\s\S]*<\/a>/);
  });
});
