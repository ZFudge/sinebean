const canvas = document.getElementById('canv');
const context = canvas.getContext('2d');

const board = {
  colors:['#F0F','#09F','#0F0'],
  //colors:['white','#09F','white'],
  speed: 10,
  active: true,
  draw: function() {
    context.fillStyle = this.colors[0];
    context.fillRect(0,0,canvas.width,canvas.height/2);
    context.fillStyle = this.colors[2];
    context.fillRect(0,canvas.height/2,canvas.width,canvas.height);
  }
};

const dots = {
  partial: canvas.height * 0.86,
  size: canvas.height/2,
  y: canvas.height/2,
  adjust: function() {
    this.dots.forEach(function(cur,ind,arr) {
      cur.x -= 2;
      if (cur.x <= -dots.partial/2) cur.x += (canvas.width + dots.partial);
      context.fillStyle = cur.color;
      context.beginPath();
      context.arc(cur.x, cur.y, dots.size, 0, Math.PI*2);
      context.fill();
    });
  }
};
dots.dots = [
  {color:board.colors[0],x:0,y:canvas.height/2 - canvas.height*0.25},
  {color:board.colors[2],x:dots.partial,y:canvas.height - canvas.height*0.25},
  {color:board.colors[0],x:dots.partial * 2,y:canvas.height/2 - canvas.height*0.25},
  {color:board.colors[2],x:dots.partial * 3,y:canvas.height - canvas.height*0.25}
];

const lines = {
  y: canvas.height/2,
  draw: function() {
    dots.dots.forEach(function(cur,ind,arr) {
      
      const bendy = (cur.y === canvas.height/2-canvas.height*0.25)? cur.y + dots.partial * 0.9 : cur.y - dots.partial * 0.9; //cur.y - 86/2
      
      context.strokeStyle = board.colors[1];
      context.lineWidth = 5;
      context.beginPath();
      context.moveTo(cur.x-dots.partial/2,lines.y);
      context.quadraticCurveTo(cur.x, bendy, cur.x + dots.partial/2, lines.y);
      context.stroke();
    });
  }
};

function main() {
  board.draw();
  dots.adjust();
  lines.draw();
}

let loop = setInterval(main, board.speed);

document.addEventListener('keydown',keyPushed);

function keyPushed(btn) {
	if (btn.keyCode === 32) {
		board.active = !board.active;
		(board.active) ? loop = setInterval(main, board.speed) : clearInterval(loop);
	}
}

setTimeout(function(){canvas.style.transform = 'rotate(5turn)';},1);
