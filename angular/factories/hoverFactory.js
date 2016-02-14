angular.module('app')
	.factory('hoverFactory', [function() {
		var ActiveCell = (function () {

			function ActiveCellConstructor (activeCell) {
				this.activeCell = activeCell
			}
			ActiveCellConstructor.prototype.getActive = function () {
				return this.activeCell
			}
			ActiveCellConstructor.prototype.setActive = function (activeCell) {
				this.activeCell = activeCell;
			}
			ActiveCellConstructor.prototype.resetActive = function () {
				this.activeCell = null;
			}
			ActiveCellConstructor.prototype.testActive = function (cell) {
				// console.log(cell === this.activeCell)
				return cell === this.activeCell
			}
			ActiveCellConstructor.prototype.getTitle = function () {
				return this.activeCell === null ? null : this.activeCell.title;
			}
			ActiveCellConstructor.prototype.getDesc = function () {
				return this.activeCell === null ? null : this.activeCell.desc;
			}


			return ActiveCellConstructor
		})()
		activeCell = new ActiveCell(null)
	
		return {
			activeCell : activeCell
		}
	}])