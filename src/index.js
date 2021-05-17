import * as PIXI from "./pixi.min.js";
import { Powder, Board, PowderType } from "./Board";

const canvas_width = 500;
const canvas_height = 500;

const board_width = 50;
const board_height = 50;

const powder_width = 10;
const powder_height = 10;

var board = new Board(board_width, board_height);


// Autodetect, create and append the renderer to the body element
var renderer = PIXI.autoDetectRenderer(canvas_width, canvas_height, { backgroundColor: 0x000000, antialias: false});
document.getElementById("drawArea").appendChild(renderer.view);

// Create the main stage for your display objects
var stage = new PIXI.Container();

// Initialize the pixi Graphics class
var graphics = new PIXI.Graphics();


function createRect(x,y,l,w, color){
    // Set the fill color
    graphics.beginFill(color); // Red
    // Draw a rectangle
    graphics.drawRect(x,y,l,w); // drawRect(x, y, width, height)

    graphics.endFill();
    
    stage.addChild(graphics);
}
// Start animating
function animate() {
    //Render the stage
    renderer.render(stage);
}

let i = 0;
setInterval(()=>{
    if(i % 5 == 0){
        board.addPowder(PowderType.SAND,1,1)
        board.addPowder(PowderType.SAND,40,1)
    }
    if(i%7 == 0){

        board.addPowder(PowderType.WATER,25,4)
    }
    board.updateBoard();
    graphics.clear();
    for(let y=0; y<board_height;y++) {
        for(let x=0; x<board_width; x++){
            let powder_type = board.checkPowderType(x,y);
            if(powder_type == PowderType.SAND){
                createRect((x*powder_width), (y*powder_height), powder_width,powder_height, 0xDBA00A);
            }
            if(powder_type == PowderType.WATER){

                createRect((x*powder_width), (y*powder_height), powder_width,powder_height, 0x0A8FDB);
            }
            
        }
    }
    animate();
    console.log("board Update : " + i) 

    if(i == 100) i=0;
    i++;
},50);