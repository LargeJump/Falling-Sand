"use strict";
//assumming sand/element is 2x2 pixels
exports.__esModule = true;
exports.Board = exports.PowderType = void 0;
//types of powders
var PowderType;
(function (PowderType) {
    PowderType[PowderType["ERR"] = -1] = "ERR";
    PowderType[PowderType["EMPTY"] = 0] = "EMPTY";
    PowderType[PowderType["SAND"] = 1] = "SAND";
    PowderType[PowderType["WATER"] = 2] = "WATER";
})(PowderType = exports.PowderType || (exports.PowderType = {}));
var Board = /** @class */ (function () {
    function Board(grid_width, grid_height) {
        if (grid_width % 2 && grid_height % 2)
            console.error("warning: canvas not even on height or width");
        this.width = grid_width;
        this.height = grid_height;
        this.grid = new Array(grid_height);
        for (var i = 0; i < grid_height; i++)
            this.grid[i] = new Array(grid_width);
        //set grid array
        this.reset();
    }
    //reset the board
    Board.prototype.reset = function () {
        var row, col;
        for (row = 0; row < this.grid.length; row++)
            for (col = 0; col < this.grid[0].length; col++)
                this.grid[row][col] = { type_of: PowderType.EMPTY, has_moved: false, is_static: false };
    };
    //update the state of the board
    Board.prototype.updateBoard = function () {
        var tmp_powder;
        for (var i = 0; i < this.height; i++) {
            for (var j = 0; j < this.width; j++) {
                tmp_powder = this.grid[i][j];
                if (tmp_powder.type_of != PowderType.EMPTY && !tmp_powder.has_moved && !tmp_powder.is_static) {
                    this.powderMove(j, i);
                }
            }
            // reset row above to has not moved
            if (i > 0) {
                for (var j = 0; j < this.width; j++) {
                    this.grid[i - 1][j].has_moved = false;
                }
            }
        }
    };
    //move powder at xy down 1 grid unit - return true if success
    Board.prototype.powderMove = function (x, y) {
        var powder_type = this.checkPowderType(x, y);
        switch (powder_type) {
            case PowderType.EMPTY: {
                return false;
            }
            case PowderType.SAND: { //type of powder is sand ->check for moves
                switch (PowderType.EMPTY) {
                    case this.checkPowderType(x, y + 1): { //check down
                        this.removePowder(x, y);
                        this.addPowder(powder_type, x, y + 1);
                        this.grid[y + 1][x].has_moved = true;
                        return true;
                    }
                    case this.checkPowderType(x + 1, y + 1): { //check right down
                        this.removePowder(x, y);
                        this.addPowder(powder_type, x + 1, y + 1);
                        this.grid[y + 1][x + 1].has_moved = true;
                        return true;
                    }
                    case this.checkPowderType(x - 1, y + 1): { //check left down
                        this.removePowder(x, y);
                        this.addPowder(powder_type, x - 1, y + 1);
                        this.grid[y + 1][x - 1].has_moved = true;
                        return true;
                    }
                }
                switch (PowderType.WATER) {
                    case this.checkPowderType(x, y + 1): { //check down
                        this.removePowder(x, y);
                        this.removePowder(x, y + 1);
                        this.addPowder(PowderType.WATER, x, y);
                        this.addPowder(powder_type, x, y + 1);
                        this.grid[y + 1][x].has_moved = true;
                        return true;
                    }
                    case this.checkPowderType(x + 1, y + 1): { //check right down
                        this.removePowder(x, y);
                        this.removePowder(x + 1, y + 1);
                        this.addPowder(PowderType.WATER, x, y);
                        this.addPowder(powder_type, x + 1, y + 1);
                        this.grid[y + 1][x + 1].has_moved = true;
                        return true;
                    }
                    case this.checkPowderType(x - 1, y + 1): { //check left down
                        this.removePowder(x, y);
                        this.removePowder(x - 1, y + 1);
                        this.addPowder(PowderType.WATER, x, y);
                        this.addPowder(powder_type, x - 1, y + 1);
                        this.grid[y + 1][x - 1].has_moved = true;
                        return true;
                    }
                }
                return true;
            }
            case PowderType.WATER: {
                //convert to switch
                if (this.checkPowderType(x, y + 1) == PowderType.EMPTY) { //check down
                    this.removePowder(x, y);
                    this.addPowder(powder_type, x, y + 1);
                    this.grid[y + 1][x].has_moved = true;
                }
                else if (this.checkPowderType(x + 1, y + 1) == PowderType.EMPTY) { //check right down
                    this.removePowder(x, y);
                    this.addPowder(powder_type, x + 1, y + 1);
                    this.grid[y + 1][x + 1].has_moved = true;
                }
                else if (this.checkPowderType(x - 1, y + 1) == PowderType.EMPTY) { //check left down
                    this.removePowder(x, y);
                    this.addPowder(powder_type, x - 1, y + 1);
                    this.grid[y + 1][x - 1].has_moved = true;
                }
                else if (this.checkPowderType(x + 1, y) == PowderType.EMPTY) { //check right
                    this.removePowder(x, y);
                    this.addPowder(powder_type, x + 1, y);
                    this.grid[y][x + 1].has_moved = true;
                }
                else if (this.checkPowderType(x - 1, y) == PowderType.EMPTY) { //check left
                    this.removePowder(x, y);
                    this.addPowder(powder_type, x - 1, y);
                    this.grid[y][x - 1].has_moved = true;
                }
                return true;
            }
        }
        return false;
    };
    //check a position (x,y) for a type of powder and return it
    Board.prototype.checkPowderType = function (x, y) {
        if ((x < 0 || x >= this.width) || (y < 0 || y >= this.height)) {
            return PowderType.ERR;
        }
        return this.grid[y][x].type_of;
    };
    //add a powder to position (x,y)
    //if position(x,y) is empty then powder will be added
    Board.prototype.addPowder = function (p_type, x, y) {
        if (this.grid[y][x].type_of == PowderType.EMPTY) {
            this.grid[y][x].type_of = p_type;
            // console.log(this.grid[y][x].type_of)
            return true;
        }
        return false;
    };
    //create empty powder place at (x,y) if not Powder.ERR
    //return true if operation success
    Board.prototype.removePowder = function (x, y) {
        if (this.grid[y][x].type_of != PowderType.ERR) {
            this.grid[y][x].type_of = PowderType.EMPTY;
            return true;
        }
        return false;
    };
    // findIndex(x:number, y:number): number{
    //     if((x >= this.width || x < 0) || y >= this.height ) 
    //         return -1;//does not exist
    //     return x + (this.width*y)
    // }
    Board.prototype.toString = function () {
        var str = "\n";
        for (var row = 0; row < this.height; row++) {
            for (var col = 0; col < this.width; col++) {
                str += this.grid[row][col].type_of + " ";
            }
            str += "\n";
        }
        return str;
    };
    return Board;
}());
exports.Board = Board;
